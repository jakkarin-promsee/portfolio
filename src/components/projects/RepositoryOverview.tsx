import { BookOpen, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "../../data/projects";
import { repositoryOverviewMedia, type OverviewMedia } from "../../data/repositoryOverviewMedia";

const overviewFiles = import.meta.glob("../../content/repository-overviews/*/OVERVIEW.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const mediaMarker = "<!-- overview-media -->";

function sourceUrl(project: Project, path: string) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `${project.repositoryUrl}/blob/${project.sourceCommit ?? "HEAD"}/${encodedPath}`;
}

function YouTubeVideo({ media }: { media: Extract<OverviewMedia, { kind: "youtube" }> }) {
  return (
    <div className="repository-overview-video-frame">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${media.videoId}?autoplay=1&mute=1&playsinline=1`}
        title="Rebirth gameplay showcase"
        loading="eager"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function MediaFigure({ project, media }: { project: Project; media: OverviewMedia }) {
  return (
    <figure className={`repository-overview-figure repository-overview-figure-${media.kind}`}>
      {media.kind === "image" ? (
        <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${media.alt}`}>
          <img src={media.src} alt={media.alt} loading="lazy" />
        </a>
      ) : media.kind === "video" ? (
        <div className="repository-overview-video-frame">
          <video src={media.src} poster={media.poster} controls preload="none" playsInline aria-label="ChronoForge FPGA showcase">
            <a href={media.fallbackUrl}>Watch the ChronoForge showcase</a>
          </video>
        </div>
      ) : (
        <YouTubeVideo media={media} />
      )}
      <figcaption>
        <span>{media.caption}</span>
        {media.kind === "youtube" ? (
          <a href={media.fallbackUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalLink size={12} aria-hidden="true" /></a>
        ) : (
          <a href={sourceUrl(project, media.sourcePath)} target="_blank" rel="noopener noreferrer">{media.sourceLabel ?? "View source"} <ExternalLink size={12} aria-hidden="true" /></a>
        )}
      </figcaption>
    </figure>
  );
}

export function RepositoryOverview({ project }: { project: Project }) {
  const overviewFile = `../../content/${project.overviewPath}`;
  const content = overviewFiles[overviewFile];
  const [beforeMedia, afterMedia] = (content ?? "").split(mediaMarker);
  const media = repositoryOverviewMedia[project.slug] ?? [];

  return (
    <section className="readme-box detail-readme repository-overview" id="overview">
      <div className="readme-bar">
        <BookOpen size={16} aria-hidden="true" />
        <strong>OVERVIEW.md</strong>
      </div>
      <div className="markdown-body repository-overview-body">
        {!content ? (
          <p>OVERVIEW.md is not available for this project yet.</p>
        ) : (
          <>
            <div className="repository-overview-lead"><ReactMarkdown remarkPlugins={[remarkGfm]}>{beforeMedia}</ReactMarkdown></div>
            {media.length > 0 && (
              <div className={`repository-overview-media${media.length > 1 ? " repository-overview-media-grid" : ""}`}>
                {media.map((item) => <MediaFigure key={item.kind === "youtube" ? item.videoId : item.src} project={project} media={item} />)}
              </div>
            )}
            {afterMedia && <ReactMarkdown remarkPlugins={[remarkGfm]}>{afterMedia}</ReactMarkdown>}
          </>
        )}
      </div>
    </section>
  );
}
