import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { OverviewPage } from "./pages/OverviewPage";
import { RepositoriesPage } from "./pages/RepositoriesPage";
import { JourneyPage } from "./pages/JourneyPage";
import { RepositoryDetailPage } from "./pages/RepositoryDetailPage";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
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
        <Route path="/repositories/:slug" element={<RepositoryDetailPage />} />
        <Route path="*" element={<OverviewPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
