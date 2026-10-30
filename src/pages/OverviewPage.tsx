import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import { ProfileLayout } from "../components/layout/ProfileLayout";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { otherPins, researchPins, type OverviewPin } from "../data/overview";
import type { JourneyRepository } from "../data/journey";
import profileReadme from "../../docs/profile-readme-draft.md?raw";
import extendedReadme from "../content/profile-readme-extend.md?raw";

const catalogSlugs = new Set(projects.map((project) => project.slug));

function ProfileMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeSlug]}
      components={{
        a: ({ href, children: linkChildren, ...props }) => {
          const destination = href === "PORTFOLIO_URL" ? "#readme-extend" : href ?? "#";
          if (destination.startsWith("/") && !destination.startsWith("//")) {
            return <Link to={destination}>{linkChildren}</Link>;
          }
          return <a href={destination} {...props}>{linkChildren}</a>;
        },
        img: ({ src, alt, ...props }) => (
          <img src={src} alt={alt ?? ""} loading="lazy" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function RepositoryLink({ repository }: { repository: JourneyRepository }) {
  if (catalogSlugs.has(repository.slug)) {
    return (
      <Link to={`/repositories/${repository.slug}`}>
        {repository.title} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a href={repository.repositoryUrl} target="_blank" rel="noopener noreferrer">
      {repository.title} <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

function Pin({ pin }: { pin: OverviewPin }) {
  return (
    <article className="overview-pin">
      <span className="journey-feature-label">{pin.label}</span>
      <div className="overview-pin-content">
        <div>
          <h3>{pin.title}</h3>
          <p>{pin.story}</p>
        </div>
        <ul className="journey-feature-highlights">
          {pin.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </div>
      <div className="overview-pin-links journey-side-links">
        {pin.repositories.map((repository) => (
          <RepositoryLink repository={repository} key={repository.slug} />
        ))}
        {pin.action && (
          <a href={pin.action.url} target="_blank" rel="noopener noreferrer">
            {pin.action.label} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export function OverviewPage() {
  const [readmeExpanded, setReadmeExpanded] = useState(false);

  return (
    <ProfileLayout>
      <div className="overview-page">
        <section className="readme-box overview-readme" aria-label="GitHub profile README">
          <div className="readme-bar">
            <BookOpen size={16} aria-hidden="true" />
            <span>{profile.handle}</span>
            <span className="bar-muted">/ README.md</span>
          </div>
          <div
            className={`overview-readme-preview${readmeExpanded ? " is-expanded" : ""}`}
            id="profile-readme-content"
            onFocusCapture={() => setReadmeExpanded(true)}
          >
            <div className="markdown-body rendered-markdown overview-profile-markdown">
              <ProfileMarkdown>{profileReadme}</ProfileMarkdown>
            </div>
          </div>
          <button
            className="overview-readme-toggle"
            type="button"
            aria-controls="profile-readme-content"
            aria-expanded={readmeExpanded}
            onClick={() => setReadmeExpanded((value) => !value)}
          >
            {readmeExpanded ? "Show less" : "Show more"}
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </section>

        <section className="readme-box overview-extended-readme" id="readme-extend" aria-label="Extended profile README">
          <div className="readme-bar">
            <BookOpen size={16} aria-hidden="true" />
            <span>{profile.handle}</span>
            <span className="bar-muted">/ README-EXTEND.md</span>
          </div>
          <div className="markdown-body rendered-markdown overview-extend-markdown">
            <ProfileMarkdown>{extendedReadme}</ProfileMarkdown>
          </div>
        </section>

        <nav className="overview-deeper" aria-label="Explore more of the portfolio">
          <div className="overview-deeper-grid">
            <Link className="overview-deeper-card" to="/journey">
              <span>THE DECISIONS</span>
              <strong>Follow the journey <ArrowRight size={17} aria-hidden="true" /></strong>
              <p>Read the questions, failed hypotheses, and experiments that changed my direction step by step.</p>
            </Link>
            <Link className="overview-deeper-card" to="/repositories">
              <span>THE PROJECTS</span>
              <strong>Explore repositories <ArrowRight size={17} aria-hidden="true" /></strong>
              <p>Browse all complete repositories for project context, results, and their original READMEs.</p>
            </Link>
          </div>
        </nav>

        <section className="overview-pinned" aria-label="Selected work">
          <p className="eyebrow">SELECTED WORK</p>

          <section className="overview-pin-group" aria-labelledby="overview-research-heading">
            <div className="journey-section-heading">
              <div>
                <h2 id="overview-research-heading">Research path</h2>
                <p>Selected experiments and detours, from recent work back to the first math questions.</p>
              </div>
            </div>
            <div className="overview-pin-list">
              {researchPins.map((pin) => <Pin pin={pin} key={pin.title} />)}
            </div>
          </section>

          <section className="overview-pin-group" aria-labelledby="overview-other-heading">
            <div className="journey-section-heading">
              <div>
                <h2 id="overview-other-heading">What I've done</h2>
                <p>Products, tools, applied ML, and games built for their own reasons.</p>
              </div>
            </div>
            <div className="overview-pin-list">
              {otherPins.map((pin) => <Pin pin={pin} key={pin.title} />)}
            </div>
          </section>
        </section>
      </div>
    </ProfileLayout>
  );
}
