import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <Github size={20} />
      <span>© 2026 Jakkarin Promsee</span>
      <Link to="/">Overview</Link>
      <Link to="/repositories">Repositories</Link>
      <Link to="/journey">Journey</Link>
      <a
        href="https://github.com/jakkarin-promsee"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </footer>
  );
}
