import { NavLink } from "react-router-dom";
import { BookOpen, CalendarDays } from "lucide-react";
import { projects } from "../../data/projects";
import { RepoIcon } from "../icons/RepoIcon";

export function ProfileNav() {
  return (
    <div className="profile-nav-wrap">
      <nav className="profile-nav" aria-label="Profile navigation">
        <NavLink
          end
          to="/"
          className={({ isActive }) =>
            `profile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <BookOpen size={16} /> Overview
        </NavLink>
        <NavLink
          to="/repositories"
          className={({ isActive }) =>
            `profile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <RepoIcon /> Repositories{" "}
          <span className="count">{projects.length}</span>
        </NavLink>
        <NavLink
          to="/journey"
          className={({ isActive }) =>
            `profile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <CalendarDays size={16} /> Journey
        </NavLink>
      </nav>
    </div>
  );
}
