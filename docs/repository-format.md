# Repository detail format

Status: editorial guide for 28 authored detail overviews and a 28-repository frontend catalog. The project-by-project source and page audit is recorded in [repository-overview-final-check.md](repository-overview-final-check.md). Story outlines live in [research-overview-outlines.md](research-overview-outlines.md) and [other-repo-overview-outlines.md](other-repo-overview-outlines.md). Source checks alone do not verify personal motivation or chronology; Causal World remains explicitly provisional.

## Purpose of the three areas

The detail page has three reading depths:

1. **`OVERVIEW.md` (upper left):** an editorial introduction for someone who may know nothing about the project. Explain why it exists, what was built or tested, what happened, and what this repository contributes. A reader should understand the project without opening the technical README.
2. **About / Details (upper right):** a short description and verifiable facts that can be scanned quickly. It should not repeat the overview's story.
3. **`README.md` (full width below):** the unchanged repository README for implementation details, usage, experiment records, and deeper evidence.

The overview is neither a résumé bullet nor a shortened README. It gives enough context to make the technical material worth opening. Keep the profile Overview separate from repository content.

For repositories in the verified research path, connect each project's starting question to the question that preceded it and the one that followed. `docs/profile-readme-draft.md`, `src/content/profile-readme-extend.md`, and `src/data/journey.ts` give the current public narrative; repository READMEs and metadata verify what each project actually did. The checked-out `project/Jakkarin-Promsee/README.md` records an older research direction and should not override the current narrative. Membership in this path is independent of a repository's browsing category.

## An editorial spine, not a fixed template

Every overview should let the reader answer four questions:

- **Why this project?** State the question, practical need, or mechanism the author wanted to understand.
- **What exists?** Name the actual artifact or experiment and its distinctive behavior. For a multi-repository product, identify this repository's role.
- **What happened?** Give the useful result, demonstrated capability, shipped state, or important negative finding.
- **What is the boundary?** Say what remains a prototype, simulation, untested idea, or open question when that distinction affects the claim.

Lead each detail overview with a one-sentence heading that tells a new reader what the project is about. Put the explanation below it in normal body text; do not enlarge an entire introductory paragraph. Follow with a few short paragraphs or a small list, whichever makes that project's story easier to scan. Use further headings only when they help navigation. Do not force a word count, identical section names, a feature grid, or a fixed number of bullets across all 28 repositories. The title already appears in the page shell; avoid another title that merely repeats it.

### Research projects

Use the sequence **question → experiment or method → observed result → scope and next question**. Explain enough of the setup for the result to mean something. Distinguish a hypothesis, simulation, baseline comparison, and completed result. A negative result can be the most valuable part of the overview; state exactly what was tested rather than generalizing it to an entire field. Put detailed equations, all metrics, architecture layers, and reproducibility steps in the README.

For a project on the research path, tell **how the work changed**, not just what the final implementation contains. Start with the idea or belief that motivated the first attempt, then show the early test, the evidence that challenged it, and the design decision that followed. Introduce the final architecture in a few plain terms only after that arc, so a reader knows which version produced the result. Place a result figure at that point and explain both its success and its limits. Keep the heading and opening from summarizing the entire arc again; each later paragraph should advance it. Do not rewrite a late benchmark as the question that launched the project.

**Weak example — retrofits the endpoint into the origin:**

> Bio-Analog CPU asks whether a learner can keep adapting as its world changes. It combines SCFF and SLDA and beats replay on retention.

This skips the original substrate and update-rule question, hides the failed attribution rule, and gives the reader the result before the reason for building the design. Repeating these claims under later headings would make the overview feel circular.

**Better example — shows why the implementation changed:**

> I thought a global backward pass was the wrong way to build the learner I wanted, so I tried resident weights and a local attribution rule. The rule could measure contribution but could not tell a weight which way to move; its summation cost also defeated the hoped-for shortcut. I abandoned it, tested forward-only learning, and changed the objective when stacking early blocks did not yield useful depth. Only after those revisions did I freeze the SCFF and SLDA design and compare it with replay.

The actual [Bio-Analog CPU overview](../src/content/repository-overviews/bio-analog-cpu/OVERVIEW.md) then puts its result image after that development arc and explains what the rapid-switch comparison supports. This is an example of narrative order, not a template to copy across research projects.

### Full-stack products and apps

Use **need or motivation → user experience → delivered scope → repository role**. Show what a person can actually do, whether it was deployed or used, and what is still a mock flow. For a system/client/server set, write distinct overviews: the system repository explains the product and integration map; the client explains the interface and user journeys; the server explains the API and its responsibilities. Link related repositories without copying the same overview three times.

When a real user need gives an exploratory build its direction, tell both parts of the motivation. Trace how the first mechanism grew into an integrated product and which problem forced the next layer. For Hot Potato, the teacher's need matters alongside the author's interest in a dynamic editor, AI integration, and data flow; a list of the shipped features alone misses why the system took its final shape.

### Tools, hardware, games, and other work

Use **motivation → artifact → distinctive mechanism or experience → current state**. A tool can show its output, a hardware project can show what runs on the board, and a game can show play. Explain the author's reason for building it when that gives more insight than a feature list. Do not imply a prototype is a finished product or that a simulated circuit is fabricated hardware.

For a game, describe the design problem behind the mechanics. Rebirth began with curiosity about game bots; implementing a finite state machine was only the start, while tuning behavior that stayed challenging and playable shaped the combat, rooms, and boss. Credit collaborators when the repository is shared, and avoid assigning individual work without evidence.

## Media in `OVERVIEW.md`

Use **one strong visual by default when the repository README points to a suitable source**; use a second only when it answers a different question. A media-free overview is better than a filler image. GitHub badges, decorative logos, generic stock art, and a gallery of tiny unreadable screenshots do not count as evidence of the result.

For this research-path batch, the owner confirmed that ML01 and Active Sensing should have no overview image. `my-harness` uses a short terminal transcript already present in its README instead of an invented screenshot. If a repository has no native image but an explanation genuinely needs one, an authored diagram may illustrate a source-checked mechanism; label it as an illustration and link to the source it interprets. Never present such a diagram as a screenshot or experimental result. The current Causal World illustration is provisional along with that project's unverified narrative.

Choose media that lets a first-time visitor see the work immediately:

- **Research:** a readable result figure, task illustration, or comparison that supports the exact claim in the nearby text. Caption the tested setting and limitation. Do not choose a flattering chart that hides a loss or requires reading the whole README to interpret.
- **Product:** a representative screen of the real user experience. A second image can show the other side of a two-sided product, such as student and teacher flows.
- **Tool:** actual output, ideally beside a second view only if it shows a distinct capability.
- **Hardware or game:** a clear frame or short video of the system running. Motion is useful when a still cannot convey the result.

Inspect every candidate at the size it will occupy in the overview, on desktop and mobile. Prefer a clear crop and legible labels over an image that merely looks dramatic. Preserve aspect ratio, provide useful alt text and a short caption, and link a dense figure to a larger view. Place a visual where its evidence enters the story: a product screen may belong near the opening, while a research result figure may need to follow the attempts and decisions that produced it. Use lazy loading for media below the first screen and reasonable file sizes.

### Video

Use a poster before playback and visible controls by default. Rebirth's gameplay embed is an owner-requested exception: it attempts muted autoplay, keeps YouTube controls, and links to the full video as a fallback. Never start audio automatically. A video must show the actual project and be supported by a source referenced in the repository README. Do not claim a local video file exists when the README supplies only a YouTube link. A custom media component may be preferable to raw HTML because the current Markdown sanitizer and renderer do not promise to preserve `<video>` behavior.

### Pilot media and future candidates

The first five rows were the media choices in the pilot pages:

| Repository | README media source | Overview use |
| --- | --- | --- |
| `chronoforge-fpga-engine` | README video attachment, `docs/images/chonoforge_showcase.png`, and full YouTube demo; clone `assets/ChronoForge-FPGA-Showcase.mp4` | Local showcase video with poster and full-demo fallback. |
| `bio-analog-cpu` | `draft6.0/src/phase10/exp3/figs_p10_3/GAUNTLET_STREAM.png` | Batch-by-batch live and all-seen-domains accuracy through rapid domain changes, with the modeled-energy panel identified as secondary. |
| `hot-potato` | `docs/screenshots/learning-06-askai.webp` and `docs/screenshots/creating-03-editor-overview.webp` | Student tutor and teacher editor, showing the two sides of the product. |
| `rebirth` | YouTube gameplay link in the README | Muted autoplay gameplay embed and the browser game link. |
| `active-sensing-vis` | No image embedded in the top-level README | No overview media in the pilot. |
| `ctplot` | `assets/hero-braille.png`, `assets/quickstart-scatter.png` | Actual terminal output that communicates the library faster than a feature list. |

The top-level `active-sensing-vis` README does not currently embed an image. Its overview has none under this rule, even though the clone contains experimental figures elsewhere. Four newer overviews use source-copied images: `manga-shelf-interface`, `hot-potato-client`, `calisthenic-outdoor-design`, and `calisthenics-course-booking-client`.

Keep the clones untouched. When implementing, record each chosen asset's README reference, the source commit for Git-tracked files, and the checked URL for external media. Verify that the path or link resolves, and copy or prepare a frontend asset separately if needed. An overview image should be stable and traceable to the checked source; do not silently rely on a moving `HEAD` URL for a result figure. The existing README renderer's relative-link behavior needs its own audit as the catalog expands.

## About / Details

**About** uses the repository's GitHub description and topics verbatim from its checked `src/markdown-metadata/<repo>/cover.md`. The 28 covers matched public GitHub metadata on 2026-10-30. These fields are no longer rewritten as portfolio copy in `projects.ts`; the editorial list summary and `OVERVIEW.md` remain separate. Keep the canonical repository link. Add a live app, playable build, paper, or demo link only when it is real and checked; GitHub homepage fields are not copied blindly because some contain malformed or historical values.

**Details** can contain the fields that are meaningful and verified for this repository:

| Field | Rule |
| --- | --- |
| Category | Editorial browsing category, independent of private tiers in `config/list-detail.md`. |
| Main language | Verify against the repository rather than a sample value. |
| Status | Optional; distinguish active research, closed study, prototype, deployed app, and finished release. |
| License | Show the actual license when present; omit an unverified value rather than showing `License TBD`. |
| Date | A clone commit date is a **source snapshot date**. Call it “Last updated” only after checking the remote meaning of that claim. |
| Related repositories | Optional; useful for client/server/system groups. Give each link a role label. |

Not every repository needs every field. Topics in `cover.md` describe GitHub metadata and may require manual refresh; `source.md` proves the README snapshot and clone commit, not the date or provenance of separately authored descriptions.

## Content and implementation boundaries

- Keep `project/<repo>/` as read-only reference clones and `src/markdown-metadata/<repo>/README.md` verbatim. Portfolio overview copy and presentation assets belong in frontend data or an authored content layer, not in those sources.
- Prefer Markdown for ordinary overviews. Use a reviewed React component for a project that genuinely needs a custom result visualization, media layout, or interaction. Static HTML is possible only when it renders safely and accessibly; avoid arbitrary unsanitized HTML.
- Authored overviews live under `src/content/repository-overviews/`; media records live in `src/data/repositoryOverviewMedia.ts`. Keep canonical `repositoryUrl` values explicit. `src/data/projects.ts` combines its original ten records with the 18 in `src/data/projectsAdditional.ts` for the complete 28-repository catalog.
- Verify substantive claims against `cover.md`, `short-description.md`, `deep-description.md`, the verbatim README, and the clone when needed. Do not use private priority tiers as public categories, labels, or ordering.

## Rollout and review

1. Review the five pilot pages: ChronoForge (hardware), Bio-Analog CPU and Active Sensing (research), Hot Potato (full stack), and Rebirth (game). Check first-screen readability, image quality, mobile layout, captions, About facts, and how much new information the README adds below.
2. Review the newer 18 narratives with the owner, especially the reasons for starting, the sequence of decisions, and the distinction between a demo and a deployed product. Compare each with its pinned source commit, related-repository role, and media origin.
3. Before calling a page done, confirm that a reader can explain the project's purpose and result from its overview, that About does not duplicate it, and that every image, video, link, date, and status is accurate in the rendered page.
