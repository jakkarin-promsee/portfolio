import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const clonesRoot = join(root, "project");
const metadataRoot = join(root, "src", "markdown-metadata");
const checkOnly = process.argv.includes("--check");
const git = (directory, ...args) =>
  execFileSync("git", ["-C", directory, ...args], { encoding: "utf8" }).trim();
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

const clones = readdirSync(clonesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

let stale = false;
for (const name of clones) {
  const clone = join(clonesRoot, name);
  const metadata = join(metadataRoot, name);
  const cloneReadme = join(clone, "README.md");
  const metadataReadme = join(metadata, "README.md");
  const sourceFile = join(metadata, "source.md");

  if (!existsSync(cloneReadme)) {
    throw new Error(`Missing README.md in project/${name}`);
  }
  if (git(clone, "status", "--porcelain", "--", "README.md")) {
    throw new Error(`README.md has uncommitted changes in project/${name}`);
  }

  const commit = git(clone, "rev-parse", "HEAD");
  const commitAt = git(clone, "log", "-1", "--format=%cI");
  const readme = readFileSync(cloneReadme);
  const readmeHash = hash(readme);
  const existingReadme = existsSync(metadataReadme) ? readFileSync(metadataReadme) : null;
  const readmeChanged = !existingReadme || !existingReadme.equals(readme);
  const existingSource = existsSync(sourceFile) ? readFileSync(sourceFile, "utf8") : "";
  const sourceCurrent =
    existingSource.includes(`source_commit: ${JSON.stringify(commit)}`) &&
    existingSource.includes(`readme_sha256: ${JSON.stringify(readmeHash)}`);

  if (checkOnly) {
    if (readmeChanged || !sourceCurrent) {
      console.error(`Out of sync: ${name}`);
      stale = true;
    }
    continue;
  }
  if (!readmeChanged && sourceCurrent) continue;

  mkdirSync(metadata, { recursive: true });
  if (readmeChanged) writeFileSync(metadataReadme, readme);
  const capturedAt = new Date().toISOString();
  writeFileSync(sourceFile, [
    "---",
    `source_path: ${JSON.stringify(`project/${name}`)}`,
    `source_commit: ${JSON.stringify(commit)}`,
    `source_commit_at: ${JSON.stringify(commitAt)}`,
    `captured_at: ${JSON.stringify(capturedAt)}`,
    `readme_sha256: ${JSON.stringify(readmeHash)}`,
    "---",
    "",
    `Snapshot of the checked-out clone at \`project/${name}\`. The README.md beside this file was copied verbatim from that clone.`,
    "The cover and description files are separate extracted/context notes; review them when the source commit changes.",
    "",
  ].join("\n"));
  console.log(`Synced ${name} at ${commit.slice(0, 12)}`);
}

if (checkOnly && stale) process.exitCode = 1;
if (checkOnly && !stale) console.log(`All ${clones.length} README snapshots match their clones.`);
