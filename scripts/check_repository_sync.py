"""Audit repository inventory, local clones, and Markdown metadata snapshots."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
LIST = ROOT / "config" / "list.json"
DETAIL = ROOT / "config" / "list-detail.md"
CLONES = ROOT / "project"
METADATA = ROOT / "src" / "markdown-metadata"
URL_LINE = re.compile(r"^\s*-\s+(https://github\.com/([^/\s]+)/([^/\s]+))\s*$", re.I)
URL = re.compile(r"https://github\.com/([a-z\d-]+)/([a-z\d._-]+)", re.I)
SHA = re.compile(r"^[0-9a-f]{40}$", re.I)
GROUPS = ("complete", "profile", "incomplete")


def read_inventory() -> dict[str, list[tuple[str, str]]]:
    raw = json.loads(LIST.read_text(encoding="utf-8"))
    if not isinstance(raw, dict) or set(raw) != set(GROUPS):
        raise ValueError(f"{LIST} must contain exactly: {', '.join(GROUPS)}")
    inventory: dict[str, list[tuple[str, str]]] = {key: [] for key in GROUPS}
    seen: set[str] = set()
    for group in GROUPS:
        urls = raw[group]
        if not isinstance(urls, list):
            raise ValueError(f"{group} must be an array of GitHub repository URLs")
        for url in urls:
            match = URL.fullmatch(url) if isinstance(url, str) else None
            if not match:
                raise ValueError(f"Invalid URL in {group}: {url!r}")
            name = match.group(2)
            if url.lower() in seen:
                raise ValueError(f"Duplicate repository link: {url}")
            seen.add(url.lower())
            inventory[group].append((name, url))
    if not inventory["complete"] or len(inventory["profile"]) != 1:
        raise ValueError("Inventory needs complete projects and exactly one profile repo")
    return inventory


def field(markdown: str, name: str) -> str | None:
    match = re.search(rf"^{re.escape(name)}:\s*['\"]?([^'\"\r\n]+)['\"]?\s*$", markdown, re.M)
    return match.group(1) if match else None


def git(directory: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(directory), *args],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    return result.stdout.strip()


def inspect_local(name: str) -> tuple[str | None, list[str]]:
    issues: list[str] = []
    clone = CLONES / name
    metadata = METADATA / name
    if not clone.is_dir():
        issues.append("clone missing")
        return None, issues
    try:
        head = git(clone, "rev-parse", "HEAD")
        if git(clone, "status", "--porcelain", "--", "README.md"):
            issues.append("clone README has uncommitted changes")
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as error:
        issues.append(f"cannot read clone Git state: {error}")
        return None, issues
    if not metadata.is_dir():
        issues.append("metadata folder missing")
        return head, issues
    source = metadata / "source.md"
    readme = metadata / "README.md"
    if not source.is_file():
        issues.append("metadata source.md missing")
        return head, issues
    source_text = source.read_text(encoding="utf-8")
    recorded = field(source_text, "source_commit")
    if not recorded or not SHA.fullmatch(recorded):
        issues.append("source_commit missing or invalid")
    elif recorded.lower() != head.lower():
        issues.append(f"source_commit {recorded[:12]} != clone HEAD {head[:12]}")
        issues.append(f"review: git -C project/{name} diff --stat {recorded}..HEAD")
    if field(source_text, "source_path") != f"project/{name}":
        issues.append("source_path does not match inventory")
    if not field(source_text, "captured_at"):
        issues.append("captured_at missing")
    if not readme.is_file():
        issues.append("metadata README.md missing")
    else:
        digest = hashlib.sha256(readme.read_bytes()).hexdigest()
        if field(source_text, "readme_sha256") != digest:
            issues.append("metadata README hash differs from source.md")
        clone_readme = clone / "README.md"
        if not clone_readme.is_file():
            issues.append("clone README.md missing")
        elif readme.read_bytes() != clone_readme.read_bytes():
            issues.append("metadata README differs from clone README")
    return head, issues


def remote_head(url: str) -> str:
    result = subprocess.run(
        ["git", "ls-remote", url, "HEAD"],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    match = re.match(r"([0-9a-f]{40})\s+HEAD", result.stdout.strip(), re.I)
    if not match:
        raise ValueError(f"No remote HEAD for {url}")
    return match.group(1)


def github_inventory(owner: str) -> set[str]:
    repos: set[str] = set()
    page = 1
    while True:
        request = Request(
            f"https://api.github.com/users/{owner}/repos?per_page=100&page={page}",
            headers={"Accept": "application/vnd.github+json", "User-Agent": "portfolio-sync-audit"},
        )
        with urlopen(request, timeout=30) as response:
            data = json.load(response)
        if not isinstance(data, list):
            raise ValueError("GitHub inventory response was not a list")
        repos.update(item["name"].lower() for item in data)
        if len(data) < 100:
            break
        page += 1
    return repos


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--remote", action="store_true", help="also compare GitHub HEADs and public repo inventory (needs network)")
    args = parser.parse_args()
    try:
        inventory = read_inventory()
        complete = inventory["complete"]
        profile = inventory["profile"]
        tracked = complete + profile
        listed = {name.lower() for group in inventory.values() for name, _ in group}
        detail_urls = {
            match.group(1).lower()
            for line in DETAIL.read_text(encoding="utf-8").splitlines()
            if (match := URL_LINE.fullmatch(line))
        }
    except (OSError, ValueError) as error:
        print(f"Inventory error: {error}", file=sys.stderr)
        return 2

    print(f"Inventory: {len(complete)} complete, {len(profile)} profile, {len(inventory['incomplete'])} incomplete")
    problems: dict[str, list[str]] = {}
    complete_urls = {url.lower() for _, url in complete}
    for missing in sorted(complete_urls - detail_urls):
        problems.setdefault("config/list-detail.md", []).append(f"missing detail: {missing}")
    for extra in sorted(detail_urls - complete_urls):
        problems.setdefault("config/list-detail.md", []).append(f"detail not in complete list: {extra}")
    for folder, root in (("project", CLONES), ("metadata", METADATA)):
        if root.is_dir():
            for child in root.iterdir():
                if child.is_dir() and child.name.lower() not in {name.lower() for name, _ in tracked}:
                    problems.setdefault(f"{folder}/{child.name}", []).append("not listed as complete or profile")

    local_heads: dict[str, str | None] = {}
    for name, _ in tracked:
        local_heads[name], issues = inspect_local(name)
        if issues:
            problems.setdefault(name, []).extend(issues)

    if args.remote:
        owner = profile[0][1].split("/")[3]
        try:
            remote_repos = github_inventory(owner)
            for name in sorted(remote_repos - listed):
                problems.setdefault("GitHub inventory", []).append(f"public repo missing from config/list.json: {name}")
            for name in sorted(listed - remote_repos):
                problems.setdefault("GitHub inventory", []).append(f"listed repo not found in public profile: {name}")
        except Exception as error:
            problems.setdefault("GitHub inventory", []).append(f"remote inventory unavailable: {error}")
        with ThreadPoolExecutor(max_workers=6) as pool:
            futures = {pool.submit(remote_head, url): name for name, url in tracked}
            for future in as_completed(futures):
                name = futures[future]
                try:
                    remote = future.result()
                    local = local_heads[name]
                    if local and remote.lower() != local.lower():
                        problems.setdefault(name, []).append(f"GitHub HEAD {remote[:12]} != clone HEAD {local[:12]} (update clone first)")
                    source = METADATA / name / "source.md"
                    if source.is_file():
                        recorded = field(source.read_text(encoding="utf-8"), "source_commit")
                        if recorded and remote.lower() != recorded.lower():
                            problems.setdefault(name, []).append(f"GitHub HEAD {remote[:12]} != source_commit {recorded[:12]}")
                except Exception as error:
                    problems.setdefault(name, []).append(f"remote HEAD unavailable: {error}")

    if problems:
        print("\nNeeds review:")
        for name, issues in sorted(problems.items(), key=lambda item: item[0].lower()):
            print(f"- {name}")
            for issue in issues:
                print(f"    {issue}")
    print(f"\nSummary: {len(tracked)} tracked snapshots, {len(problems)} entries need review.")
    if not problems:
        scope = "local clones and GitHub" if args.remote else "local clones"
        print(f"All tracked metadata is in sync with {scope}.")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
