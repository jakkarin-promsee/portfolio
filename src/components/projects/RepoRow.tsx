import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import type { Project } from "../../data/projects";

export function RepoRow({ project }: { project: Project }) {
  return (
    <article className="repo-row">
      <div className="repo-row-main">
        <div className="repo-title-line">
          <Link to={`/repositories/${project.slug}`}>{project.title}</Link>
          <span className="public-pill">Public</span>
        </div>
        <p className="repo-description">{project.description}</p>
        <div className="topics">
          {project.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
        <div className="repo-meta">
          <span>
            <i className="language-dot" style={{ background: project.color }} />
            {project.language}
          </span>
          <span>
            <FileText size={14} />
            {project.license}
          </span>
          <span>Updated in {project.year}</span>
        </div>
      </div>
    </article>
  );
}
