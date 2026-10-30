// Editorial journey copy. Repository URLs stay explicit because the ten-record
// The repository catalog and this journey both cover all 28 complete repos.
export type JourneyRepository = {
  slug: string;
  title: string;
  repositoryUrl: string;
};

export type ResearchStep = {
  number: string;
  title: string;
  question: string;
  story: string;
  turningPoint: string;
  repositories: JourneyRepository[];
};

export type SideQuest = {
  title: string;
  story: string;
  repositories: JourneyRepository[];
  feature?: {
    label: string;
    highlights: string[];
    action?: { label: string; url: string };
  };
};

export type SideQuestGroup = {
  title: string;
  description: string;
  quests: SideQuest[];
};

export const researchJourney: ResearchStep[] = [
  {
    number: "01",
    title: "Understand the numbers",
    question: "What does a weight actually learn?",
    story:
      "I derived linear regression and backpropagation on paper, then implemented them in NumPy to see how individual weights changed. I followed that curiosity into Hessians and different optimization rules. I could explain more of the machinery, but fitting examples still did not explain how a system comes to understand an unfamiliar world.",
    turningPoint:
      "I understood how weights moved, but the question I cared about was bigger than an update rule.",
    repositories: [
      {
        slug: "ML01-linear-regression-from-scratch",
        title: "ML01-linear-regression-from-scratch",
        repositoryUrl:
          "https://github.com/jakkarin-promsee/ML01-linear-regression-from-scratch",
      },
      {
        slug: "discretization-of-gradient-flow",
        title: "discretization-of-gradient-flow",
        repositoryUrl:
          "https://github.com/jakkarin-promsee/discretization-of-gradient-flow",
      },
    ],
  },
  {
    number: "02",
    title: "Question the substrate",
    question:
      "Would a different kind of hardware change what learning can do?",
    story:
      "ChronoForge was a game engine, not a learning experiment. I built its path from Python authoring to a runtime made of FPGA logic, with no CPU or operating system. It made the effect of a computational substrate concrete: the hardware design changes which operations are natural to perform.",
    turningPoint:
      "I turned from studying training rules toward designing a substrate that might support learning while it runs.",
    repositories: [
      {
        slug: "chronoforge-fpga-engine",
        title: "chronoforge-fpga-engine",
        repositoryUrl:
          "https://github.com/jakkarin-promsee/chronoforge-fpga-engine",
      },
    ],
  },
  {
    number: "03",
    title: "Build a local learner",
    question:
      "Could a brain-inspired analog substrate keep learning as it runs?",
    story:
      "Bio-Analog CPU began with resident weights and local updates. I abandoned my first attribution rule when the mathematics showed that contribution magnitude could not tell a weight which direction to move, and the rule did not escape the summation cost I hoped to avoid. I rebuilt the project as a forward-only learner with a small closed-form classifier. Controlled simulations mapped its retention and its limits against tuned baselines.",
    turningPoint:
      "I had tested a way to train a learner, not found the mechanism of understanding I was looking for.",
    repositories: [
      {
        slug: "bio-analog-cpu",
        title: "bio-analog-cpu",
        repositoryUrl: "https://github.com/jakkarin-promsee/bio-analog-cpu",
      },
    ],
  },
  {
    number: "04",
    title: "Inspect the agent loop",
    question: "How much of an agent's capability comes from the system around its model?",
    story:
      "While searching for my next research question, I built a coding-agent harness from scratch. Its model loop, tools, permissions, prompts, and sessions made the surrounding system visible. The harness was a side project that helped me distinguish useful tool behavior from a model learning an unfamiliar world.",
    turningPoint:
      "I returned to modern ML and memory with a more precise question about what an agent could learn from experience.",
    repositories: [
      {
        slug: "my-harness",
        title: "my-harness",
        repositoryUrl: "https://github.com/jakkarin-promsee/my-harness",
      },
    ],
  },
  {
    number: "05",
    title: "Test memory through action",
    question: "Does what a model sees change where it looks next?",
    story:
      "In Active Sensing, a model used a coarse map, a few detailed glimpses, and a state carried between them. It learned where to point, but a state borrowed from another image worked about as well as its own; a policy blind to its glimpses pointed better. The state was useful, yet these controls did not support the experience-updating memory I wanted. After months of testing, I closed this particular setup as a scoped negative result.",
    turningPoint:
      "A credible next test required a major redesign, so I stepped back to ask what policy lets an agent learn from experience at all.",
    repositories: [
      {
        slug: "active-sensing-vis",
        title: "active-sensing-vis",
        repositoryUrl: "https://github.com/jakkarin-promsee/active-sensing-vis",
      },
    ],
  },
  {
    number: "06",
    title: "Make learning testable",
    question:
      "How could an agent discover an unseen world's rules from limited actions?",
    story:
      "After Active Sensing, I asked how I had learned enough to diagnose an unfamiliar problem myself: I chose what to study, tested explanations, and revised them. Causal World Learning and Transfer turns that question into small Boolean worlds where actions and observations have exact consequences. I have built exact inference and action-selection baselines to measure what the evidence permits before testing a learned policy. Learning that policy and discovering what one agent could usefully pass to another are still open work.",
    turningPoint:
      "The focus is now on the policy for learning while an agent acts; I have not yet settled what transfer between agents should contain.",
    repositories: [
      {
        slug: "causal-world-learning-and-transfer",
        title: "causal-world-learning-and-transfer",
        repositoryUrl:
          "https://github.com/jakkarin-promsee/causal-world-learning-and-transfer",
      },
    ],
  },
];

export const sideQuestGroups: SideQuestGroup[] = [
  {
    title: "Products and interfaces",
    description:
      "Practical needs and experiments in how the layers of a product fit together.",
    quests: [
      {
        title: "Hot Potato",
        story:
          "A teacher's real classroom need gave me a reason to build and understand a whole learning product. Teachers author interactive lessons and guide an AI study companion; students can explore without signing in. The product reached actual use and spans a system map, a React client, and an Express server.",
        feature: {
          label: "FULL STACK · REAL-WORLD USE",
          highlights: [
            "Teacher-led product built for an actual need",
            "Three connected repositories across UI, API, and system design",
          ],
          action: {
            label: "Open the live app",
            url: "https://hot-potato-client.vercel.app/",
          },
        },
        repositories: [
          {
            slug: "hot-potato",
            title: "System",
            repositoryUrl: "https://github.com/jakkarin-promsee/hot-potato",
          },
          {
            slug: "hot-potato-client",
            title: "Client",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/hot-potato-client",
          },
          {
            slug: "hot-potato-server",
            title: "Server",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/hot-potato-server",
          },
        ],
      },
      {
        title: "Manga Shelf",
        story:
          "A local-first place to remember what I read, where I stopped, and which link to open next. No account or hosted database required.",
        repositories: [
          {
            slug: "manga-shelf-interface",
            title: "manga-shelf-interface",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/manga-shelf-interface",
          },
        ],
      },
      {
        title: "Calisthenics course booking",
        story:
          "A coaching and booking experience prototype with plan, payment, calendar, and skill views. Its companion API handles accounts and sessions; bookings and payments remain client-side demonstrations.",
        repositories: [
          {
            slug: "calisthenics-course-booking-client",
            title: "Client",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/calisthenics-course-booking-client",
          },
          {
            slug: "calisthenics-course-booking-server",
            title: "Server",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/calisthenics-course-booking-server",
          },
        ],
      },
      {
        title: "Cinema booking and management",
        story:
          "A connected customer booking flow and admin dashboard. The server owns showings, seat state, and transactional booking rules; the client turns those records into the user experience.",
        repositories: [
          {
            slug: "cpe241-booking-website-client",
            title: "Client",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/cpe241-booking-website-client",
          },
          {
            slug: "cpe241-booking-website-server",
            title: "Server",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/cpe241-booking-website-server",
          },
        ],
      },
      {
        title: "TokTickIT",
        story:
          "A role-based IT service desk built through coursework releases, with ticket workflows, backend authorization, peer-reviewed pull requests, and automated checks.",
        repositories: [
          {
            slug: "toktickit",
            title: "toktickit",
            repositoryUrl: "https://github.com/jakkarin-promsee/toktickit",
          },
        ],
      },
      {
        title: "PredictPeopleAssistant",
        story:
          "A first-year hackathon prototype for viewing area counts and asking an AI assistant for advice. The saved charts and question flow survived; live forecasting did not reach the web app.",
        repositories: [
          {
            slug: "PredictPeopleAssistant",
            title: "PredictPeopleAssistant",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/PredictPeopleAssistant",
          },
        ],
      },
    ],
  },
  {
    title: "Tools for understanding and making",
    description:
      "Small systems built to expose their mechanisms or support a daily workflow.",
    quests: [
      {
        title: "ctplot",
        story:
          "I wanted to work out object-like data structures in C, then carry that design through a plotting API, CLI, and terminal renderer. The resulting C11 library draws tables and charts with UTF-8, ANSI color, and Braille plots using only the standard library and libm.",
        feature: {
          label: "C11 LIBRARY · TERMINAL VISUALIZATION",
          highlights: [
            "Data abstraction, plotting API, and renderer built from the ground up",
            "Tables and charts work from in-memory data or CSV files",
          ],
        },
        repositories: [
          {
            slug: "ctplot",
            title: "ctplot",
            repositoryUrl: "https://github.com/jakkarin-promsee/ctplot",
          },
        ],
      },
      {
        title: "IA Regression",
        story:
          "An end-to-end machine-learning workflow behind a shorter Big Five quiz. I cleaned response data, trained a missing-answer model with explicit observation masks, compared it with simpler baselines, exported the model, and connected it to a Streamlit interface that can show estimated results after a few answers.",
        feature: {
          label: "END-TO-END AI WORKFLOW",
          highlights: [
            "Data preparation, model design, and baseline evaluation",
            "Exported model connected to an interactive quiz",
          ],
        },
        repositories: [
          {
            slug: "ia-regression",
            title: "ia-regression",
            repositoryUrl: "https://github.com/jakkarin-promsee/ia-regression",
          },
        ],
      },
      {
        title: "KMUTT Year 3, Semester 1",
        story:
          "An Obsidian coursework vault structured so an AI agent can navigate courses, notes, PDFs, and deadlines without being rebriefed every session.",
        repositories: [
          {
            slug: "kmutt-y3-s1",
            title: "kmutt-y3-s1",
            repositoryUrl: "https://github.com/jakkarin-promsee/kmutt-y3-s1",
          },
        ],
      },
      {
        title: "Javaroke",
        story:
          "A JavaFX karaoke player with synchronized lyrics and custom queue and stack structures; a graph-based recommender remains a separate experiment.",
        repositories: [
          {
            slug: "javaroke",
            title: "javaroke",
            repositoryUrl: "https://github.com/jakkarin-promsee/javaroke",
          },
        ],
      },
      {
        title: "Time-Limited Shortest Path Visualize",
        story:
          "A JavaFX maze tool for watching BFS, Dijkstra, A*, and genetic search take different routes through weighted grids.",
        repositories: [
          {
            slug: "time-limited-shortest-path-visualize",
            title: "time-limited-shortest-path-visualize",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/time-limited-shortest-path-visualize",
          },
        ],
      },
      {
        title: "Toram-Bot01",
        story:
          "An early series of desktop automation scripts that grew from fixed game actions into timing, mana checks, and a selling routine.",
        repositories: [
          {
            slug: "Toram-Bot01",
            title: "Toram-Bot01",
            repositoryUrl: "https://github.com/jakkarin-promsee/Toram-Bot01",
          },
        ],
      },
    ],
  },
  {
    title: "Games and the physical world",
    description:
      "Finished play experiences, hardware experiments, and a design beyond the screen.",
    quests: [
      {
        title: "Rebirth",
        story:
          "I built a complete 2D pixel-art action game while working out how enemy behaviors make combat readable and challenging. It grew beyond a mechanics prototype into seven weapons, room-based encounters, a multi-phase boss, and an ending shaped by a story choice. The finished game is playable on itch.io.",
        feature: {
          label: "COMPLETE GAME · DEPLOYED",
          highlights: [
            "Full playable game with combat, progression, and boss fight",
            "Browser build published on itch.io",
          ],
          action: {
            label: "Play on itch.io",
            url: "https://nightst.itch.io/rebirth",
          },
        },
        repositories: [
          {
            slug: "rebirth",
            title: "rebirth",
            repositoryUrl: "https://github.com/jakkarin-promsee/rebirth",
          },
        ],
      },
      {
        title: "Era Odyssey",
        story:
          "A high-school team game about Earth's geological history. The Unity source archive holds gameplay systems; its companion site presents the world, creatures, and downloads.",
        repositories: [
          {
            slug: "Unity-EraOdesey",
            title: "Game",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/Unity-EraOdesey",
          },
          {
            slug: "Era-Odyssey",
            title: "Website",
            repositoryUrl: "https://github.com/jakkarin-promsee/Era-Odyssey",
          },
        ],
      },
      {
        title: "UnderTale: Sans Fight on FPGA",
        story:
          "An unofficial game prototype expressed directly in Verilog: player input, hazards, collision, scoring, sprites, and VGA output without a CPU.",
        repositories: [
          {
            slug: "undertale-san-fight-verilog-game",
            title: "undertale-san-fight-verilog-game",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/undertale-san-fight-verilog-game",
          },
        ],
      },
      {
        title: "Outdoor Calisthenics Gym",
        story:
          "Blender models, dimensions, sourcing, and preliminary engineering checks for backyard exercise structures. The draft explicitly calls for licensed review before construction.",
        repositories: [
          {
            slug: "calisthenic-outdoor-design",
            title: "calisthenic-outdoor-design",
            repositoryUrl:
              "https://github.com/jakkarin-promsee/calisthenic-outdoor-design",
          },
        ],
      },
    ],
  },
];
