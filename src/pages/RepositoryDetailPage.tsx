import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, ExternalLink, GitBranch, Github, Globe2, Link2, Sparkles } from "lucide-react";
import { TopicList } from "../components/projects/TopicList";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const RepositoryReadme = lazy(() =>
  import("../components/projects/RepositoryReadme").then((module) => ({ default: module.RepositoryReadme })),
);

export function RepositoryDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project)
    return (
      <main className="missing">
        <h1>Repository not found</h1>
        <Link to="/repositories">
          <ArrowLeft size={16} /> Back to repositories
        </Link>
      </main>
    );
  const isHotPotato = project.slug === "hot-potato";
  return (
    <>
      <nav className="repo-nav" aria-label="Repository navigation">
        <div className="repo-nav-inner">
          <a href="#overview" className="repo-nav-active">
            <BookOpen size={16} /> Overview
          </a>
          <a href="#readme" className="repo-nav-link">
            <BookOpen size={16} /> README
          </a>
          <Link to="/repositories" className="repo-nav-link">
            <ArrowLeft size={16} /> All repositories
          </Link>
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
            {isHotPotato && (
              <a href="https://hot-potato-client.vercel.app/" target="_blank" rel="noreferrer">
                <Globe2 size={16} /> Live project <ExternalLink size={14} />
              </a>
            )}
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              <Github size={16} /> <span>View on GitHub</span> <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
      <main className="detail-layout">
        <div className="detail-overview-grid">
          <div className="detail-primary">
          <section className="readme-box detail-readme" id="overview">
            <div className="readme-bar">
              <BookOpen size={16} />
              <strong>OVERVIEW.md</strong>
            </div>
            <div className="markdown-body">
              {isHotPotato ? (
                <>
                  <div className="readme-title-emoji">🥔</div>
                  <h1>Hot Potato</h1>
                  <p className="lead">
                    Teacher-led learning materials, an AI study companion, and
                    room for every student to think out loud.
                  </p>
                  <div className="markdown-divider" />
                  <p>
                    Many students can read a handout but have no one available
                    to ask <em>why</em>, test an idea with, or continue a
                    conversation after an answer. Hot Potato helps them practice
                    critical thinking through teacher-authored lessons and
                    open-ended discussion with an AI study companion.
                  </p>
                  <div className="readme-callout">
                    <Sparkles size={19} />
                    <div>
                      <strong>Two connected journeys</strong>
                      <p>
                        Teachers author and publish lessons. Students read,
                        answer questions, and explore ideas with a contextual AI
                        tutor.
                      </p>
                    </div>
                  </div>
                  <h2>What it does</h2>
                  <ul>
                    <li>
                      <Check size={16} /> Teacher-controlled lesson content and
                      tutor guidance
                    </li>
                    <li>
                      <Check size={16} /> Phone-first learning experience in
                      Thai and English
                    </li>
                    <li>
                      <Check size={16} /> Open-ended questions that invite
                      reasoning
                    </li>
                    <li>
                      <Check size={16} /> AI-assisted drafting with teacher
                      review
                    </li>
                  </ul>
                  <h2>How it's built</h2>
                  <p>
                    This repository is the system-level integration map for a
                    React client and Express server. The client handles lesson
                    authoring and student interaction; the server handles
                    content, accounts, and AI orchestration.
                  </p>
                  <div className="stack-list">
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>Express</span>
                    <span>MongoDB</span>
                    <span>Google Gemini</span>
                  </div>
                </>
              ) : (
                <>
                  <h1>{project.title}</h1>
                  <p className="lead">{project.description}</p>
                  <div className="markdown-divider" />
                  <h2>Project overview</h2>
                  <p>{project.description}</p>
                  <div className="readme-callout">
                    <GitBranch size={19} />
                    <div>
                      <strong>{project.category}</strong>
                      <p>
                        Built with {project.language}. Explore the source and
                        documentation for the full technical details.
                      </p>
                    </div>
                  </div>
                  <h2>Topics</h2>
                  <TopicList topics={project.topics} />
                </>
              )}
            </div>
          </section>
          </div>
          <aside className="detail-sidebar">
          <h2>About</h2>
          <p>{project.description}</p>
          {isHotPotato && (
            <a
              className="sidebar-site-link"
              href="https://hot-potato-client.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 size={16} /> hot-potato-client.vercel.app
            </a>
          )}
          <TopicList topics={project.topics} />
          <div className="sidebar-rule" />
          <h3>Details</h3>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Main language</dt>
              <dd>
                <i
                  className="language-dot"
                  style={{ background: project.color }}
                />
                {project.language}
              </dd>
            </div>
            <div>
              <dt>License</dt>
              <dd>{project.license}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>
                {project.year} <span className="sample-label">sample</span>
              </dd>
            </div>
          </dl>
          <div className="sidebar-rule" />
          <a
            className="sidebar-github"
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> Open repository <ExternalLink size={14} />
          </a>
          </aside>
        </div>
        <Suspense fallback={<div className="readme-box repository-readme readme-loading">Loading README…</div>}>
          <RepositoryReadme project={project} />
        </Suspense>
      </main>
    </>
  );
}
