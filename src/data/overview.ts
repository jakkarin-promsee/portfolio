import type { JourneyRepository } from "./journey";

export type OverviewPin = {
  title: string;
  label: string;
  story: string;
  highlights: string[];
  repositories: JourneyRepository[];
  action?: { label: string; url: string };
};

export const researchPins: OverviewPin[] = [
  {
    title: "Active Sensing",
    label: "SEQUENTIAL PERCEPTION · CLOSED STUDY",
    story:
      "Working with agent context made me wonder whether a visual model could use what it had just seen to choose its next look. It learned where to point, but the controls did not support the experience-updating memory I was looking for. I closed this setup as a scoped negative result.",
    highlights: [
      "A state from another image worked as well as the original in a key control.",
      "A policy blind to its own glimpses pointed better, narrowing what the result could mean.",
    ],
    repositories: [{ slug: "active-sensing-vis", title: "active-sensing-vis", repositoryUrl: "https://github.com/jakkarin-promsee/active-sensing-vis" }],
  },
  {
    title: "my-harness",
    label: "AGENT SYSTEMS · TOOLING",
    story:
      "I was curious how a coding-agent harness worked, so I started with a small model, tool, and permission loop. I kept experimenting with prompts, context size, tool output, and model providers until it became a usable terminal agent. That work showed me how much the surrounding system shapes a fixed model's behavior.",
    highlights: [
      "Prompt tiers, token estimates, and session history make context use inspectable.",
      "Provider adapters keep local and API model experiments on one execution path.",
    ],
    repositories: [{ slug: "my-harness", title: "my-harness", repositoryUrl: "https://github.com/jakkarin-promsee/my-harness" }],
  },
  {
    title: "Bio-Analog CPU",
    label: "CONTINUAL LEARNING · BEHAVIORAL SIMULATION",
    story:
      "ChronoForge made designing a substrate feel possible, while gradient descent's backward pass still bothered me. I tried resident weights and local updates, but my first rule could not tell a weight which direction to move. I rebuilt the learner around forward-only updates and a closed-form classifier, then tested the resulting simulation against replay baselines.",
    highlights: [
      "Controlled shifting-stream simulations showed steadier retention in some regimes.",
      "Static accuracy and same-substrate energy comparisons exposed real limits. No chip was built.",
    ],
    repositories: [{ slug: "bio-analog-cpu", title: "bio-analog-cpu", repositoryUrl: "https://github.com/jakkarin-promsee/bio-analog-cpu" }],
  },
  {
    title: "ChronoForge",
    label: "FPGA · PURE HARDWARE",
    story:
      "I started by making a ROM counter emit game events and kept asking how much of a game that simple hardware idea could run. Movement, collision, and video grew around the event stream; authoring the packed commands then pushed me to build a Python compiler and previewer. The result runs directly in FPGA logic.",
    highlights: [
      "The board runs the game without a CPU or operating system.",
      "Growing one counter into a toolchain made the effect of a computational substrate concrete.",
    ],
    repositories: [{ slug: "chronoforge-fpga-engine", title: "chronoforge-fpga-engine", repositoryUrl: "https://github.com/jakkarin-promsee/chronoforge-fpga-engine" }],
  },
  {
    title: "Learning from individual numbers",
    label: "MATHEMATICS · FIRST PRINCIPLES",
    story:
      "I wanted to understand how numerical weights could store learned behavior, so I derived linear regression and backpropagation one operation at a time. Studying optimization afterward led me through Hessians, eigendirections, and different update rules. I implemented the mathematics to see where the paper reasoning held up in practice.",
    highlights: [
      "ML01 built intuition about learning from individual weight updates, not a new ML library.",
      "Discretization compares explicit, implicit, and Newton updates through derivation and computation.",
    ],
    repositories: [
      { slug: "discretization-of-gradient-flow", title: "discretization-of-gradient-flow", repositoryUrl: "https://github.com/jakkarin-promsee/discretization-of-gradient-flow" },
      { slug: "ML01-linear-regression-from-scratch", title: "ML01-linear-regression-from-scratch", repositoryUrl: "https://github.com/jakkarin-promsee/ML01-linear-regression-from-scratch" },
    ],
  },
];

export const otherPins: OverviewPin[] = [
  {
    title: "Hot Potato",
    label: "FULL STACK · EDUCATION",
    story:
      "A teacher I knew needed a way for students to question a lesson; I also wanted to push a full-stack build with a dynamic editor and AI API. What began as an editable lesson grew into a phone-first student experience and a lesson-grounded tutor, with teacher approval over AI drafts.",
    highlights: [
      "The same lesson document survives editing, saving, and mobile reading.",
      "The public, phone-first student path can be used without signing in.",
    ],
    repositories: [
      { slug: "hot-potato", title: "System", repositoryUrl: "https://github.com/jakkarin-promsee/hot-potato" },
      { slug: "hot-potato-client", title: "Client", repositoryUrl: "https://github.com/jakkarin-promsee/hot-potato-client" },
      { slug: "hot-potato-server", title: "Server", repositoryUrl: "https://github.com/jakkarin-promsee/hot-potato-server" },
    ],
    action: { label: "Open the live app", url: "https://hot-potato-client.vercel.app/" },
  },
  {
    title: "CTerminalPlot",
    label: "C11 · DEVELOPER TOOL",
    story:
      "For a C course project, I wanted to plot numerical data without leaving the terminal and build the data structures myself. I kept extending that experiment into a C11 plotting library and CLI, then revisited its correctness and memory safety after the course.",
    highlights: [
      "The data abstraction supports filtering, sorting, and statistics as well as plotting.",
      "UTF-8, ANSI color, and Braille dots make dense plots readable in a terminal.",
    ],
    repositories: [{ slug: "ctplot", title: "ctplot", repositoryUrl: "https://github.com/jakkarin-promsee/ctplot" }],
  },
  {
    title: "Indicator-augmented Regression",
    label: "APPLIED ML · INTERACTIVE APP",
    story:
      "I wondered whether a Big Five questionnaire could give a useful estimate before someone answered all 50 questions. I represented unanswered items explicitly, compared a Ridge model with simple baselines, and turned the experiment into an interactive Streamlit quiz.",
    highlights: [
      "Answer values and observation masks distinguish missing responses from real values.",
      "The quiz can show estimated results after a small number of answers.",
    ],
    repositories: [{ slug: "ia-regression", title: "ia-regression", repositoryUrl: "https://github.com/jakkarin-promsee/ia-regression" }],
  },
  {
    title: "Rebirth",
    label: "GAME DESIGN · PLAYABLE RELEASE",
    story:
      "I wanted to make a game and find out how its bots could feel threatening without making every fight unfair. Starting from a map and shooting loop, we grew Rebirth into a complete action game. I focused on tuning enemy decisions against player movement, weapons, and the pace of each room.",
    highlights: [
      "Enemy archetypes patrol, pursue, circle, reposition, and dodge using tunable behavior.",
      "The finished browser build is playable on itch.io.",
    ],
    repositories: [{ slug: "rebirth", title: "rebirth", repositoryUrl: "https://github.com/jakkarin-promsee/rebirth" }],
    action: { label: "Play the game", url: "https://nightst.itch.io/rebirth" },
  },
];
