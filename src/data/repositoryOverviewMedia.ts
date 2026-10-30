// Repository media is copied from checked sources or authored as an explicitly
// labeled illustration. Clones stay untouched; sourceCommit pins source links.
export type OverviewMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
      sourcePath: string;
      sourceLabel?: string;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      caption: string;
      sourcePath: string;
      sourceLabel?: string;
      fallbackUrl: string;
    }
  | {
      kind: "youtube";
      videoId: string;
      caption: string;
      fallbackUrl: string;
    };

export const repositoryOverviewMedia: Record<string, OverviewMedia[]> = {
  ctplot: [
    {
      kind: "image",
      src: "/media/repositories/ctplot/hero-braille.png",
      alt: "A sine wave plotted in terminal characters using Braille cells for fine resolution",
      caption: "Actual ctplot output from the source README: Braille dots make a smoother curve within a character-grid terminal.",
      sourcePath: "assets/hero-braille.png",
    },
  ],
  "manga-shelf-interface": [
    {
      kind: "image",
      src: "/media/repositories/manga-shelf-interface/shelf-overview.webp",
      alt: "Manga Shelf showing grouped title cards, chapter controls, search, and add tiles",
      caption: "The local reading shelf. Chapter controls sit on each card; categories and ordering are saved with the collection.",
      sourcePath: "docs/01-shelf-overview.webp",
    },
  ],
  "hot-potato-client": [
    {
      kind: "image",
      src: "/media/repositories/hot-potato-client/draft-preview.webp",
      alt: "Hot Potato teacher AI draft preview in Thai before content is accepted into a lesson",
      caption: "Teacher authoring: AI proposes lesson structure for review before the teacher accepts it into the document.",
      sourcePath: "public/guide/creating-08b-draft-preview.webp",
    },
  ],
  "calisthenic-outdoor-design": [
    {
      kind: "image",
      src: "/media/repositories/calisthenic-outdoor-design/layout-render.png",
      alt: "Blender render of the proposed outdoor pull-up, dip, snake, and monkey bar layout",
      caption: "Proposed layout render from the draft design package. It is not a photograph of a built or certified installation.",
      sourcePath: "final1-en/design/images/1.png",
    },
  ],
  "calisthenics-course-booking-client": [
    {
      kind: "image",
      src: "/media/repositories/calisthenics-course-booking-client/booking-demo.webp",
      alt: "Calisthenics booking prototype with sample time slots and trainer selection",
      caption: "Client-side booking demonstration with sample availability. Confirming a time does not reserve a server-side slot.",
      sourcePath: "docs/07-booking.webp",
    },
  ],
  "chronoforge-fpga-engine": [
    {
      kind: "video",
      src: "/media/repositories/chronoforge-fpga-engine/showcase.mp4",
      poster: "/media/repositories/chronoforge-fpga-engine/showcase-poster.png",
      caption: "ChronoForge running on a Basys3 FPGA. The video shows the board output, not a software emulator.",
      sourcePath: "assets/ChronoForge-FPGA-Showcase.mp4",
      fallbackUrl: "https://youtu.be/yzlUlyLRUwM",
    },
  ],
  "bio-analog-cpu": [
    {
      kind: "image",
      src: "/media/repositories/bio-analog-cpu/gauntlet-stream.png",
      alt: "Batch-by-batch accuracy across five domain changes: the frozen learner stays steadier while ER-strong drops and relearns at switches",
      caption: "Five-domain rapid-switch simulation. Thick lines show accuracy over all seen domains; thin lines show each live batch. The lower panel reports modeled energy, not measured chip power.",
      sourcePath: "draft6.0/src/phase10/exp3/figs_p10_3/GAUNTLET_STREAM.png",
    },
  ],
  "discretization-of-gradient-flow": [
    {
      kind: "image",
      src: "/media/repositories/discretization-of-gradient-flow/short-convergence-speed.png",
      alt: "Validation loss for explicit, implicit, and Newton updates over the first 45 iterations",
      caption: "The repository's early-iteration comparison. Newton drops fastest in this run, while implicit descent is smoother; the setup does not establish a general ranking.",
      sourcePath: "docs-src/result/short-convergence-speed.png",
    },
  ],
  "causal-world-learning-and-transfer": [
    {
      kind: "image",
      src: "/media/repositories/causal-world-learning-and-transfer/intervention-example.svg",
      alt: "An intervention distinguishes two candidate Boolean rules by ruling out the one that predicts the wrong observation",
      caption: "Portfolio illustration of exact hypothesis elimination, based on the repository's current world and oracle design. It is not an experiment result; this project's narrative is awaiting owner review.",
      sourcePath: "src/ARCHITECTURE_OVERVIEW.md",
      sourceLabel: "Read model source",
    },
  ],
  "hot-potato": [
    {
      kind: "image",
      src: "/media/repositories/hot-potato/student-tutor.webp",
      alt: "Hot Potato student Ask AI interface with lesson-specific tutor modes and a discussion",
      caption: "Student view: the lesson's AI study companion supports open-ended questions.",
      sourcePath: "docs/screenshots/learning-06-askai.webp",
    },
    {
      kind: "image",
      src: "/media/repositories/hot-potato/teacher-editor.webp",
      alt: "Hot Potato teacher editor with lesson canvas and authoring tools",
      caption: "Teacher view: the editor combines lesson content, questions, and publishing controls.",
      sourcePath: "docs/screenshots/creating-03-editor-overview.webp",
    },
  ],
  "rebirth": [
    {
      kind: "youtube",
      videoId: "ZhlghJ0V2-c",
      caption: "Gameplay showcase from the repository README. Playback starts muted; the complete browser game is linked above.",
      fallbackUrl: "https://youtu.be/ZhlghJ0V2-c",
    },
  ],
};
