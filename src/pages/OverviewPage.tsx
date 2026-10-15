import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CircleDot } from "lucide-react";
import { ProfileLayout } from "../components/layout/ProfileLayout";
import { PinnedCard } from "../components/projects/PinnedCard";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

export function OverviewPage() {
  return (
    <ProfileLayout>
      <div className="overview-page">
        <div className="readme-box">
          <div className="readme-bar">
            <BookOpen size={16} />
            <span>{profile.handle}</span>
            <span className="bar-muted">/ README.md</span>
          </div>
          <div className="readme-content">
            <p className="eyebrow">{profile.overview.eyebrow}</p>
            <h2>
              {profile.overview.heading}
              <br />
              <span>{profile.overview.headingEmphasis}</span>
            </h2>
            {profile.overview.paragraphs.map((paragraph) => (
              <p className="intro-copy" key={paragraph}>{paragraph}</p>
            ))}
            <div className="readme-links">
              <Link to="/repositories">
                Explore repositories <ArrowRight size={15} />
              </Link>
              <a href={`mailto:${profile.email}`}>
                Get in touch <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="section-heading">
          <h2>Pinned projects</h2>
          <span>A few places to start</span>
        </div>
        <div className="pinned-grid">
          {projects.slice(0, 4).map((project) => (
            <PinnedCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="interest-box">
          <div className="interest-icon">
            <CircleDot size={18} />
          </div>
          <div>
            <h3>Currently exploring</h3>
            <p>{profile.overview.currentInterest}</p>
          </div>
          <Link to="/repositories">
            See the work <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </ProfileLayout>
  );
}
