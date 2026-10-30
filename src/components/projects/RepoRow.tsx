import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import type { Project } from "../../data/projects";
import { githubRepositoryAbout } from "../../data/githubRepositoryAbout";

export function RepoRow({ project }: { project: Project }) {
  const { topics } = githubRepositoryAbout(project.slug);
  return (
    <article className="repo-row">
      <div className="repo-row-main">
        <div className="repo-title-line">
          <Link to={`/repositories/${project.slug}`}>{project.title}</Link>
          <span className="public-pill">Public</span>
        </div>
        <p className="repo-description">{project.description}</p>
        <div className="topics">
          {topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
        <div className="repo-meta">
          {project.language && <span>
            <i className="language-dot" style={{ background: project.color }} />
            {project.language}
          </span>}
          {project.license && <span>
            <FileText size={14} />
            {project.license}
          </span>}
          {project.sourceSnapshot && <span>Source snapshot: {project.sourceSnapshot}</span>}
        </div>
      </div>
    </article>
  );
}
