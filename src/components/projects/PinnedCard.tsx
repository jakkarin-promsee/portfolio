import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import { RepoIcon } from "../icons/RepoIcon";

export function PinnedCard({ project }: { project: Project }) {
  return (
    <article className="pinned-card">
      <div className="pinned-top">
        <RepoIcon />
        <Link to={`/repositories/${project.slug}`}>{project.title}</Link>
        <span className="public-pill">Public</span>
      </div>
      <p>{project.description}</p>
      <div className="pinned-bottom">
        <span className="language-dot" style={{ background: project.color }} />
        {project.language}
        <span className="pinned-category">{project.category}</span>
      </div>
    </article>
  );
}
