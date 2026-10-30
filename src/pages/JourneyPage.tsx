import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileLayout } from "../components/layout/ProfileLayout";
import { projects } from "../data/projects";
import {
  researchJourney,
  sideQuestGroups,
  type JourneyRepository,
} from "../data/journey";

const catalogSlugs = new Set(projects.map((project) => project.slug));

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

export function JourneyPage() {
  return (
    <ProfileLayout>
      <div className="journey-page">
        <header className="journey-intro">
          <p className="eyebrow">THE QUESTIONS BEHIND THE WORK</p>
          <h1>What changed my mind about learning.</h1>
          <p>
            I began by asking how numerical weights could hold intelligence.
            Building and testing across mathematics, hardware, and models kept
            changing my answer. The other things I built have their own reasons to exist.
          </p>
        </header>

        <nav className="overview-deeper journey-shortcuts" aria-label="Journey sections">
          <div className="overview-deeper-grid">
            <a className="overview-deeper-card" href="#research-journey">
              <span>THE CONNECTED THREAD</span>
              <strong>Research journey <ArrowRight size={17} aria-hidden="true" /></strong>
              <p>Follow the questions and results that changed my direction.</p>
            </a>
            <a className="overview-deeper-card" href="#side-quest-journey">
              <span>THE OTHER THINGS I BUILT</span>
              <strong>Other projects <ArrowRight size={17} aria-hidden="true" /></strong>
              <p>Explore products, tools, games, and experiments built for their own reasons.</p>
            </a>
          </div>
        </nav>

        <section className="journey-section" id="research-journey" aria-labelledby="research-heading">
          <div className="journey-section-heading">
            <div>
              <p className="eyebrow">01 / THE CONNECTED THREAD</p>
              <h2 id="research-heading">Research journey</h2>
              <p>
                From deriving a single weight by hand to testing how an agent
                might learn the rules of an unseen world from limited experience.
              </p>
            </div>
            <span className="journey-count">6 chapters · 7 repositories</span>
          </div>

          <div className="journey-steps">
            {researchJourney.map((step) => (
              <article className="journey-step" key={step.number}>
                <span className="journey-marker" aria-hidden="true" />
                <div className="journey-step-body">
                  <span className="journey-label">{step.number} / {step.title}</span>
                  <h3>{step.question}</h3>
                  <p>{step.story}</p>
                  <p className="journey-turning-point"><GitBranch size={15} aria-hidden="true" /> {step.turningPoint}</p>
                  <div className="journey-repository">
                    {step.repositories.map((repository) => (
                      <RepositoryLink repository={repository} key={repository.slug} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="journey-now">
            <span className="journey-now-label">WHERE I AM NOW</span>
            <p>
              The causal-world project now defines worlds, interventions, an
              exact inference oracle, and action-selection baselines. The next
              question is whether an agent can learn a reusable policy for
              discovering new worlds. What it could pass to another agent
              remains open.
            </p>
          </aside>
        </section>

        <section className="journey-section journey-side-section" id="side-quest-journey" aria-labelledby="side-heading">
          <div className="journey-section-heading">
            <div>
              <p className="eyebrow">02 / THE OTHER THINGS I BUILT</p>
              <h2 id="side-heading">Other projects</h2>
              <p>
                Products, tools, games, and experiments I built to understand
                a mechanism, solve a practical problem, or finish an idea.
                The groups below are for browsing rather than a second timeline.
              </p>
            </div>
            <span className="journey-count">21 repositories</span>
          </div>

          {sideQuestGroups.map((group) => (
            <div className="journey-side-group" key={group.title}>
              <div className="journey-side-group-heading">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className="journey-side-grid">
                {group.quests.map((quest) => (
                  <article
                    className={`journey-side-card${quest.feature ? " journey-side-card-featured" : ""}`}
                    key={quest.title}
                  >
                    {quest.feature && <span className="journey-feature-label">{quest.feature.label}</span>}
                    <div className="journey-side-card-content">
                      <div className="journey-side-card-copy">
                        <h4>{quest.title}</h4>
                        <p>{quest.story}</p>
                      </div>
                      {quest.feature && (
                        <ul className="journey-feature-highlights">
                          {quest.feature.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="journey-side-links">
                      {quest.repositories.map((repository) => (
                        <RepositoryLink repository={repository} key={repository.slug} />
                      ))}
                      {quest.feature?.action && (
                        <a href={quest.feature.action.url} target="_blank" rel="noopener noreferrer">
                          {quest.feature.action.label} <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </ProfileLayout>
  );
}
