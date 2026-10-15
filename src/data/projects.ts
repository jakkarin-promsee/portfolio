

export type Project = {
  slug: string;
  title: string;
  repositoryUrl: string;
  readmePath: `markdown-metadata/${string}/README.md`;
  description: string;
  topics: string[];
  language: string;
  color: string;
  category: string;
  year: string;
  license: string;
};

export const projects: Project[] = [
  {
    slug: "bio-analog-cpu",
    title: "bio-analog-cpu",
    repositoryUrl: "https://github.com/jakkarin-promsee/bio-analog-cpu",
    readmePath: "markdown-metadata/bio-analog-cpu/README.md",
    description:
      "A bio-inspired analog compute substrate that studies forward-only, on-chip continual learning through behavioral simulation.",
    topics: ["neuromorphic", "analog-computing", "continual-learning"],
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "License TBD",
  },
  {
    slug: "chronoforge-fpga-engine",
    title: "chronoforge-fpga-engine",
    repositoryUrl: "https://github.com/jakkarin-promsee/chronoforge-fpga-engine",
    readmePath: "markdown-metadata/chronoforge-fpga-engine/README.md",
    description:
      "A pure-hardware 2D game engine for the Basys3 FPGA. Author games in Python; run them as event-driven Verilog without a CPU or OS.",
    topics: ["fpga", "verilog", "game-engine"],
    language: "Verilog",
    color: "#b2b7f8",
    category: "Hardware",
    year: "2026",
    license: "License TBD",
  },
  {
    slug: "hot-potato",
    title: "hot-potato",
    repositoryUrl: "https://github.com/jakkarin-promsee/hot-potato",
    readmePath: "markdown-metadata/hot-potato/README.md",
    description:
      "A teacher-led learning platform with interactive lessons and an AI study companion that helps students think beyond right or wrong answers.",
    topics: ["edtech", "critical-thinking", "ai-study-companion"],
    language: "TypeScript",
    color: "#3178c6",
    category: "Full stack",
    year: "2026",
    license: "License TBD",
  },
  {
    slug: "ctplot",
    title: "ctplot",
    repositoryUrl: "https://github.com/jakkarin-promsee/ctplot",
    readmePath: "markdown-metadata/ctplot/README.md",
    description:
      "A dependency-free C11 library for plotting tables and charts straight in your terminal with ANSI color and Braille rendering.",
    topics: ["c11", "terminal", "data-visualization"],
    language: "C",
    color: "#555555",
    category: "Systems",
    year: "2025",
    license: "License TBD",
  },
  {
    slug: "active-sensing-vis",
    title: "active-sensing-vis",
    repositoryUrl: "https://github.com/jakkarin-promsee/active-sensing-vis",
    readmePath: "markdown-metadata/active-sensing-vis/README.md",
    description:
      "Investigating active visual sensing with differentiable glimpses and Vision Transformers to study sequential perception.",
    topics: ["computer-vision", "pytorch", "visual-attention"],
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "License TBD",
  },
  {
    slug: "causal-world-learning-and-transfer",
    title: "causal-world-learning-and-transfer",
    repositoryUrl: "https://github.com/jakkarin-promsee/causal-world-learning-and-transfer",
    readmePath: "markdown-metadata/causal-world-learning-and-transfer/README.md",
    description:
      "Exploring how agents learn hidden causal worlds through limited interventions and share what they discover.",
    topics: ["causal-learning", "agents", "research"],
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "License TBD",
  },
];
