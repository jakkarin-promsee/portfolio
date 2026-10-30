import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import { BookOpen } from "lucide-react";
import type { Project } from "../../data/projects";

const readmeFiles = import.meta.glob("../../markdown-metadata/*/README.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function resolveRepositoryUrl(project: Project, path: string, raw: boolean) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;

  const [, relativePath, suffix] = path.match(/^([^?#]*)(.*)$/) ?? ["", path, ""];
  const siblingRole = relativePath.match(/^\.\.\/(client|server)\/README\.md$/i)?.[1];
  if (!raw && siblingRole) {
    const sibling = project.related?.find(({ url }) => url.endsWith(`-${siblingRole}`));
    if (sibling) return `/repositories/${new URL(sibling.url).pathname.split("/").pop()}${suffix}`;
  }
  const normalized = relativePath.replace(/^(?:\.\/|\/)+/, "");
  const repositoryPath = new URL(project.repositoryUrl).pathname.replace(/^\/+|\/+$/g, "");
  const sourceRef = project.sourceCommit ?? "HEAD";
  const root = raw
    ? `https://raw.githubusercontent.com/${repositoryPath}/${sourceRef}/`
    : `${project.repositoryUrl}/blob/${sourceRef}/`;
  const encodedPath = normalized.split("/").map((segment) => {
    try {
      return encodeURIComponent(decodeURIComponent(segment));
    } catch {
      return encodeURIComponent(segment);
    }
  }).join("/");
  return `${root}${encodedPath}${suffix}`;
}

export function RepositoryReadme({ project }: { project: Project }) {
  const [content, setContent] = useState<string | null>(null);
  const readmeFile = `../../${project.readmePath}`;

  useEffect(() => {
    let current = true;
    setContent(null);
    const read = readmeFiles[readmeFile];
    if (read) {
      read()
        .then((markdown) => { if (current) setContent(markdown); })
        .catch(() => { if (current) setContent("README.md could not be loaded."); });
    }
    return () => { current = false; };
  }, [readmeFile]);

  return (
    <section className="readme-box detail-readme repository-readme" id="readme">
      <div className="readme-bar">
        <BookOpen size={16} />
        <strong>README.md</strong>
      </div>
      <div className="markdown-body rendered-markdown">
        {content === null ? (
          <p>{readmeFiles[readmeFile] ? "Loading README…" : "README.md is not available for this project yet."}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeSlug]}
            components={{
              a: ({ href, children, ...props }) => (
                <a href={resolveRepositoryUrl(project, href ?? "", false)} {...props}>{children}</a>
              ),
              img: ({ src, alt, ...props }) => (
                <img src={resolveRepositoryUrl(project, src ?? "", true)} alt={alt ?? ""} loading="lazy" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </section>
  );
}
