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
  eager: true,
}) as Record<string, string>;

// GFM treats pipes inside table cells as separators, even inside inline code.
// Escape them for rendering while keeping the README snapshot byte-for-byte intact.
function prepareReadmeForDisplay(markdown: string) {
  return markdown.replace(/^\s*\|[^\r\n]*$/gm, (row) =>
    row.replace(/(`+)(.*?)\1/g, (code) =>
      code.replace(/(?<!\\)\|/g, "\\|"),
    ),
  );
}

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
  const readmeFile = `../../${project.readmePath}`;
  const content = readmeFiles[readmeFile];

  return (
    <section className="readme-box detail-readme repository-readme" id="readme">
      <div className="readme-bar">
        <BookOpen size={16} />
        <strong>README.md</strong>
      </div>
      <div className="markdown-body rendered-markdown">
        {!content ? (
          <p>README.md is not available for this project yet.</p>
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
            {prepareReadmeForDisplay(content)}
          </ReactMarkdown>
        )}
      </div>
    </section>
  );
}
