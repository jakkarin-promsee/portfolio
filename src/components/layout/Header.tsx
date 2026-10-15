import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Menu, Moon, Search, Sun } from "lucide-react";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { GitHubMark } from "../icons/GitHubMark";

export function Header({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const repositorySlug = location.pathname.match(/^\/repositories\/([^/]+)\/?$/)?.[1];
  const repository = projects.find((project) => project.slug === repositorySlug);
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select") || target?.isContentEditable) return;
      event.preventDefault();
      setSearchOpen(true);
      requestAnimationFrame(() => searchRef.current?.focus());
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(
      `/repositories${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`,
    );
    setSearchOpen(false);
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="header-icon"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={16} strokeWidth={1.5} />
        </button>
        <Link to="/" className="brand-mark" aria-label="Home">
          <GitHubMark />
        </Link>
        <div className={`header-repository-path ${repository ? "has-repository" : ""}`}>
          <Link to="/" className="brand-name">{profile.handle}</Link>
          {repository && (
            <>
              <span aria-hidden="true">/</span>
              <strong>{repository.title}</strong>
            </>
          )}
        </div>
        <div className="header-spacer" />
        <button
          className="header-search-button"
          aria-label="Open search"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search size={16} strokeWidth={1.5} />
        </button>
        <form
          className={`global-search ${searchOpen ? "search-open" : ""} ${query ? "has-query" : ""}`}
          onSubmit={submitSearch}
          onClick={() => searchRef.current?.focus()}
        >
          <Search size={15} strokeWidth={1.5} />
          <input
            ref={searchRef}
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="search-hint" aria-hidden="true">Type <kbd>/</kbd> to search</span>
        </form>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <a
          className="avatar-small"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <img src={profile.avatar} alt={profile.name} />
        </a>
      </div>
      {menuOpen && (
        <div className="mobile-menu-panel">
          <Link onClick={() => setMenuOpen(false)} to="/">
            Overview
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/repositories">
            Repositories
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/journey">
            Journey
          </Link>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub profile <ExternalLink size={14} />
          </a>
        </div>
      )}
    </header>
  );
}
