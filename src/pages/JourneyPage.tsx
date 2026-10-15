import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProfileLayout } from "../components/layout/ProfileLayout";
import { projects } from "../data/projects";

export function JourneyPage() {
  return (
    <ProfileLayout>
      <div className="journey-page">
        <div className="journey-intro">
          <p className="eyebrow">THE WORK, IN ORDER</p>
          <h1>From software to systems that learn.</h1>
          <p>
            A short path through the questions behind my projects. Each step
            opens a repository preview.
          </p>
        </div>
        <div className="journey-steps">
          {[
            {
              label: "01 · Build something useful",
              text: "I began with products and tools that made everyday tasks easier.",
              project: projects[2],
            },
            {
              label: "02 · Understand the machine",
              text: "Systems programming and FPGA work pushed me below the software layer.",
              project: projects[3],
            },
            {
              label: "03 · Ask how learning works",
              text: "I moved into experiments on perception, optimization, and continual learning.",
              project: projects[4],
            },
            {
              label: "04 · Make learning physical",
              text: "My current direction joins machine learning with analog computing hardware.",
              project: projects[0],
            },
          ].map((step) => (
            <article className="journey-step" key={step.label}>
              <div className="journey-marker" />
              <div>
                <span className="journey-label">{step.label}</span>
                <p>{step.text}</p>
                <Link to={`/repositories/${step.project.slug}`}>
                  {step.project.title} <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
}
