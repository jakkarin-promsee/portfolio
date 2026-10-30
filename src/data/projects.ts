

import { additionalProjects } from "./projectsAdditional";

export type Project = {
  slug: string;
  title: string;
  repositoryUrl: string;
  readmePath: `markdown-metadata/${string}/README.md`;
  overviewPath: `repository-overviews/${string}/OVERVIEW.md`;
  description: string;
  language?: string;
  color: string;
  category: string;
  year: string;
  license?: string;
  status?: string;
  sourceCommit?: string;
  sourceSnapshot?: string;
  demo?: { label: string; url: string };
  related?: { label: string; url: string }[];
};

const initialProjects: Project[] = [
  {
    slug: "bio-analog-cpu",
    title: "bio-analog-cpu",
    repositoryUrl: "https://github.com/jakkarin-promsee/bio-analog-cpu",
    readmePath: "markdown-metadata/bio-analog-cpu/README.md",
    overviewPath: "repository-overviews/bio-analog-cpu/OVERVIEW.md",
    description:
      "A behavioral simulation of forward-only learning designed for a possible analog compute-in-memory substrate.",
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "MIT (original work)",
    status: "Behavioral simulation",
    sourceCommit: "7ff00211006430dc7d68ef6d0cbbe794d328cc69",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "chronoforge-fpga-engine",
    title: "chronoforge-fpga-engine",
    repositoryUrl: "https://github.com/jakkarin-promsee/chronoforge-fpga-engine",
    readmePath: "markdown-metadata/chronoforge-fpga-engine/README.md",
    overviewPath: "repository-overviews/chronoforge-fpga-engine/OVERVIEW.md",
    description:
      "A pure-hardware 2D game engine for the Basys3 FPGA. Author games in Python; run them as event-driven Verilog without a CPU or OS.",
    language: "Verilog",
    color: "#b2b7f8",
    category: "Hardware",
    year: "2026",
    license: "MIT (original work)",
    status: "Hardware demo",
    sourceCommit: "a61d13b36d1ce2e2ac3a643c89599ac9f0020350",
    sourceSnapshot: "Oct 14, 2026",
    demo: { label: "Watch full demo", url: "https://youtu.be/yzlUlyLRUwM" },
  },
  {
    slug: "hot-potato",
    title: "hot-potato",
    repositoryUrl: "https://github.com/jakkarin-promsee/hot-potato",
    readmePath: "markdown-metadata/hot-potato/README.md",
    overviewPath: "repository-overviews/hot-potato/OVERVIEW.md",
    description:
      "The system map for a teacher-led learning platform with interactive lessons and an AI study companion.",
    color: "#3178c6",
    category: "Full stack",
    year: "2026",
    license: "MIT (original work)",
    status: "System map for deployed app",
    sourceCommit: "2a49879a4fe5cfc61bb41b2cb46aabd579d7a0b0",
    sourceSnapshot: "Oct 14, 2026",
    demo: { label: "Open live app", url: "https://hot-potato-client.vercel.app/" },
    related: [
      { label: "Client", url: "https://github.com/jakkarin-promsee/hot-potato-client" },
      { label: "Server", url: "https://github.com/jakkarin-promsee/hot-potato-server" },
    ],
  },
  {
    slug: "ctplot",
    title: "ctplot",
    repositoryUrl: "https://github.com/jakkarin-promsee/ctplot",
    readmePath: "markdown-metadata/ctplot/README.md",
    overviewPath: "repository-overviews/ctplot/OVERVIEW.md",
    description:
      "A C11 library and CLI for plotting tables and charts in the terminal with ANSI color and Braille rendering.",
    language: "C",
    color: "#555555",
    category: "Systems",
    year: "2026",
    license: "MIT (original work)",
    status: "Working library and CLI",
    sourceCommit: "02564aedd73490e7e2f071d61a5492be0fbe2d3e",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "active-sensing-vis",
    title: "active-sensing-vis",
    repositoryUrl: "https://github.com/jakkarin-promsee/active-sensing-vis",
    readmePath: "markdown-metadata/active-sensing-vis/README.md",
    overviewPath: "repository-overviews/active-sensing-vis/OVERVIEW.md",
    description:
      "A closed study of limited visual glimpses: pointing became learnable, but the tested loop did not develop the intended sequential memory.",
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "MIT (original work)",
    status: "Closed study",
    sourceCommit: "1643796236a33748508efff412f0e3b897979708",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "causal-world-learning-and-transfer",
    title: "causal-world-learning-and-transfer",
    repositoryUrl: "https://github.com/jakkarin-promsee/causal-world-learning-and-transfer",
    readmePath: "markdown-metadata/causal-world-learning-and-transfer/README.md",
    overviewPath: "repository-overviews/causal-world-learning-and-transfer/OVERVIEW.md",
    description:
      "A Boolean-world testbed with exact inference and intervention baselines for studying how agents might learn from limited experience.",
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "MIT (original work)",
    status: "Baseline phase",
    sourceCommit: "1e3333a91c9bb47b098aff2cd3bf937c849b9b75",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "ML01-linear-regression-from-scratch",
    title: "ML01-linear-regression-from-scratch",
    repositoryUrl: "https://github.com/jakkarin-promsee/ML01-linear-regression-from-scratch",
    readmePath: "markdown-metadata/ML01-linear-regression-from-scratch/README.md",
    overviewPath: "repository-overviews/ML01-linear-regression-from-scratch/OVERVIEW.md",
    description:
      "A hand-derived study of how numerical weights learn, checked through small NumPy regression networks.",
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "MIT (original work)",
    status: "Learning study",
    sourceCommit: "16a2c19895b1100f3985a385234dc2938c2142ac",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "discretization-of-gradient-flow",
    title: "discretization-of-gradient-flow",
    repositoryUrl: "https://github.com/jakkarin-promsee/discretization-of-gradient-flow",
    readmePath: "markdown-metadata/discretization-of-gradient-flow/README.md",
    overviewPath: "repository-overviews/discretization-of-gradient-flow/OVERVIEW.md",
    description:
      "An algebra-first study of Hessians and three update rules, derived on paper and tested in NumPy.",
    language: "Python",
    color: "#3572a5",
    category: "Research",
    year: "2026",
    license: "MIT (original work)",
    status: "Numerical study",
    sourceCommit: "36de8eaf36090f9fe3385ae571e9a1e8d07e76ba",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "my-harness",
    title: "my-harness",
    repositoryUrl: "https://github.com/jakkarin-promsee/my-harness",
    readmePath: "markdown-metadata/my-harness/README.md",
    overviewPath: "repository-overviews/my-harness/OVERVIEW.md",
    description:
      "A Python coding-agent harness built from scratch to inspect model loops, tools, permissions, and context management.",
    language: "Python",
    color: "#3572a5",
    category: "Systems",
    year: "2026",
    license: "MIT (original work)",
    status: "Working learning tool",
    sourceCommit: "d0cd59fa35c1db76de327f5598de90ab98825686",
    sourceSnapshot: "Oct 14, 2026",
  },
  {
    slug: "rebirth",
    title: "rebirth",
    repositoryUrl: "https://github.com/jakkarin-promsee/rebirth",
    readmePath: "markdown-metadata/rebirth/README.md",
    overviewPath: "repository-overviews/rebirth/OVERVIEW.md",
    description:
      "A playable 2D pixel-art action game with seven weapons, room combat, state-driven enemies, and a multi-phase boss.",
    language: "C#",
    color: "#178600",
    category: "Games",
    year: "2026",
    license: "MIT (original work)",
    status: "Playable browser build",
    sourceCommit: "55941c2f86b0604da79e34a45a4aecf013b34162",
    sourceSnapshot: "Oct 14, 2026",
    demo: { label: "Play on itch.io", url: "https://nightst.itch.io/rebirth" },
  },
];

export const projects: Project[] = [...initialProjects, ...additionalProjects];
