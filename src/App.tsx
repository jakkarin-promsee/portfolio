import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { OverviewPage } from "./pages/OverviewPage";
import { RepositoriesPage } from "./pages/RepositoriesPage";
import { JourneyPage } from "./pages/JourneyPage";

const RepositoryDetailPage = lazy(() =>
  import("./pages/RepositoryDetailPage").then((module) => ({ default: module.RepositoryDetailPage })),
);

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [themeLoaded, setThemeLoaded] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("portfolio-theme") === "light") setTheme("light");
    setThemeLoaded(true);
  }, []);
  useEffect(() => {
    if (!themeLoaded) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, themeLoaded]);
  return (
    <div className="app-shell">
      <Header
        theme={theme}
        toggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/repositories" element={<RepositoriesPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/repositories/:slug" element={
          <Suspense fallback={<main className="missing">Loading repository…</main>}>
            <RepositoryDetailPage />
          </Suspense>
        } />
        <Route path="*" element={<OverviewPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
