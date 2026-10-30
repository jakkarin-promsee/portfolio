import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Github, Globe2, Link2 } from "lucide-react";
import { TopicList } from "../components/projects/TopicList";
import { RepositoryOverview } from "../components/projects/RepositoryOverview";
import { RepositoryReadme } from "../components/projects/RepositoryReadme";
import { githubRepositoryAbout } from "../data/githubRepositoryAbout";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

export function RepositoryDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="missing">
        <h1>Repository not found</h1>
        <Link to="/repositories"><ArrowLeft size={16} aria-hidden="true" /> Back to repositories</Link>
      </main>
    );
  }
  const githubAbout = githubRepositoryAbout(project.slug);

  return (
    <>
      <nav className="repo-nav" aria-label="Repository navigation">
        <div className="repo-nav-inner">
          <a href="#overview" className="repo-nav-active"><BookOpen size={16} aria-hidden="true" /> Overview</a>
          <a href="#readme" className="repo-nav-link"><BookOpen size={16} aria-hidden="true" /> README</a>
          <Link to="/repositories" className="repo-nav-link"><ArrowLeft size={16} aria-hidden="true" /> All repositories</Link>
        </div>
      </nav>

      <div className="repo-title-wrap">
        <div className="repo-heading-line">
          <div className="repo-title-identity">
            <img src={profile.avatar} alt="" />
            <h1>{project.title}</h1>
            <span className="public-pill">Public</span>
          </div>
          <div className="hero-actions">
            {project.demo && (
              <a href={project.demo.url} target="_blank" rel="noopener noreferrer">
                <Globe2 size={16} aria-hidden="true" /> {project.demo.label} <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" /> <span>View on GitHub</span> <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <main className="detail-layout">
        <div className="detail-overview-grid">
          <div className="detail-primary">
            <RepositoryOverview project={project} />
          </div>
          <aside className="detail-sidebar">
            <h2>About</h2>
            <p>{githubAbout.description}</p>
            {project.demo && (
              <a className="sidebar-site-link" href={project.demo.url} target="_blank" rel="noopener noreferrer">
                <Link2 size={16} aria-hidden="true" /> {project.demo.label} <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
            <TopicList topics={githubAbout.topics} />
            <div className="sidebar-rule" />
            <h3>Details</h3>
            <dl>
              <div><dt>Category</dt><dd>{project.category}</dd></div>
              {project.language && <div>
                <dt>Main language</dt>
                <dd><i className="language-dot" style={{ background: project.color }} />{project.language}</dd>
              </div>}
              {project.status && <div><dt>Status</dt><dd>{project.status}</dd></div>}
              {project.license && <div><dt>License</dt><dd>{project.license}</dd></div>}
              {project.sourceSnapshot && <div><dt>Source snapshot</dt><dd>{project.sourceSnapshot}</dd></div>}
            </dl>
            {project.related && (
              <>
                <div className="sidebar-rule" />
                <h3>Related repositories</h3>
                <div className="detail-related-repositories">
                  {project.related.map((related) => (
                    <Link key={related.url} to={`/repositories/${new URL(related.url).pathname.split("/").pop()}`}>
                      {related.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
            <div className="sidebar-rule" />
            <a className="sidebar-github" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Github size={17} aria-hidden="true" /> Open repository <ExternalLink size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
        <RepositoryReadme project={project} />
      </main>
    </>
  );
}
