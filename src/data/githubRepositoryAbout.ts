// cover.md contains the checked GitHub About description and topics.
// Vite includes these snapshots at build time; detail pages do not call GitHub at runtime.
export type GithubRepositoryAbout = {
  description: string;
  topics: string[];
};

const coverFiles = import.meta.glob("../markdown-metadata/*/cover.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const aboutBySlug: Record<string, GithubRepositoryAbout> = {};

for (const [path, markdown] of Object.entries(coverFiles)) {
  const slug = path.match(/\/([^/]+)\/cover\.md$/)?.[1];
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const description = frontmatter?.match(/^description:\s*'((?:''|[^'])*)'\s*$/m)?.[1];
  if (!slug || !frontmatter || !description) {
    throw new Error(`Invalid GitHub About metadata: ${path}`);
  }

  aboutBySlug[slug] = {
    description: description.replace(/''/g, "'"),
    topics: [...frontmatter.matchAll(/^  - '((?:''|[^'])*)'\s*$/gm)]
      .map((match) => match[1].replace(/''/g, "'")),
  };
}

export function githubRepositoryAbout(slug: string): GithubRepositoryAbout {
  const about = aboutBySlug[slug];
  if (!about) throw new Error(`Missing GitHub About metadata for ${slug}`);
  return about;
}
