import { renderToReadableStream } from "react-dom/server.browser";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { projects } from "./data/projects";

export const prerenderRoutes = [
  "/",
  "/repositories",
  "/journey",
  ...projects.map((project) => `/repositories/${project.slug}`),
];

export async function renderPage(path: string) {
  const project = projects.find((item) => path === `/repositories/${item.slug}`);
  const title = project ? `${project.title} · Jakkarin Promsee` :
    path === "/repositories" ? "Repositories · Jakkarin Promsee" :
    path === "/journey" ? "Journey · Jakkarin Promsee" :
    "Jakkarin Promsee · Portfolio";
  const description = project?.description ??
    (path === "/journey"
      ? "The research path, projects, and decisions behind Jakkarin Promsee's work."
      : "Jakkarin Promsee's projects, research, and experiments.");

  const stream = await renderToReadableStream(<StaticRouter location={path}><App /></StaticRouter>);
  await stream.allReady;

  return {
    html: await new Response(stream).text(),
    title,
    description,
  };
}
