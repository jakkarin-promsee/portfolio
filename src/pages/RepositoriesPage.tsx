import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { ProfileLayout } from "../components/layout/ProfileLayout";
import { RepoRow } from "../components/projects/RepoRow";
import { projects } from "../data/projects";

const categories = [
  {
    name: "Research",
    description: "Experiments in learning, perception, and bio-inspired computing.",
  },
  {
    name: "Hardware",
    description: "Digital designs and interactive systems built close to the circuit.",
  },
  {
    name: "Full stack",
    description: "End-to-end web applications for learning and everyday use.",
  },
  {
    name: "Systems",
    description: "Low-level tools and libraries built for clarity and control.",
  },
] as const;

export function RepositoriesPage() {
  const location = useLocation();
  const initial = new URLSearchParams(location.search).get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recently updated");
  const [view, setView] = useState("List");
  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("q") ?? "");
  }, [location.search]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = projects.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q ||
          [p.title, p.description, ...p.topics]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    );
    if (sort === "Name") rows.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Oldest first") rows.reverse();
    return rows;
  }, [query, category, sort]);
  return (
    <ProfileLayout>
      <div className="repositories-page">
        <div className="repo-toolbar">
          <label className="repo-filter">
            <Search size={16} />
            <input
              aria-label="Find a repository"
              placeholder="Find a repository..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select-wrap">
            <span>Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              {["All", ...categories.map(({ name }) => name)].map(
                (x) => (
                  <option key={x}>{x}</option>
                ),
              )}
            </select>
            <ChevronDown size={14} />
          </label>
          <label className="select-wrap">
            <span>Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort repositories"
            >
              {["Recently updated", "Oldest first", "Name"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </label>
          <div className="view-switch" aria-label="Repository view">
            <button
              type="button"
              className={view === "List" ? "selected" : ""}
              onClick={() => setView("List")}
            >
              List
            </button>
            <button
              type="button"
              className={view === "Category" ? "selected" : ""}
              onClick={() => setView("Category")}
            >
              By category
            </button>
          </div>
        </div>
        <div className={`repo-list ${view === "Category" ? "repo-list-grouped" : ""}`}>
          {filtered.length ? (
            view === "List" ? (
              filtered.map((project) => (
                <RepoRow key={project.slug} project={project} />
              ))
            ) : (
              categories.map(({ name: group, description }) => {
                const matches = filtered.filter(
                  (project) => project.category === group,
                );
                return matches.length ? (
                  <details className="repo-group" key={group}>
                    <summary className="repo-group-heading">
                      <span className="repo-group-copy">
                        <h2>{group}</h2>
                        <span className="repo-group-description">{description}</span>
                      </span>
                      <span className="repo-group-controls">
                        <span>{matches.length} {matches.length === 1 ? "repository" : "repositories"}</span>
                        <ChevronDown size={16} aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="repo-group-items">
                      {matches.map((project) => (
                        <RepoRow key={project.slug} project={project} />
                      ))}
                    </div>
                  </details>
                ) : null;
              })
            )
          ) : (
            <div className="empty-state">
              <Search size={24} />
              <h2>No repositories found</h2>
              <p>Try another search or category.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
}
