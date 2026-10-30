<div align="center">

# Jakkarin Promsee

**Night** · Computer Engineering @ KMUTT, Thailand

I study how an agent can learn the rules of an unfamiliar world from limited experience — and what it could pass on to another agent.

![Causal World Learning](https://img.shields.io/badge/Causal%20World%20Learning-1f2937?style=flat-square)
![Learning Policies](https://img.shields.io/badge/Learning%20Policies-1f2937?style=flat-square)
![Mathematical Modeling](https://img.shields.io/badge/Mathematical%20Modeling-1f2937?style=flat-square)
![Knowledge Transfer](https://img.shields.io/badge/Knowledge%20Transfer-1f2937?style=flat-square)

**[Explore my portfolio website →](PORTFOLIO_URL)**

</div>

---

I follow that question across mathematics, hardware, and software. I start with an intuition, build something that can test it, then use the literature and controls to challenge my own explanation. Some of my most useful results came from finding out that an idea I liked was wrong.

---

## The research path

I need to see a mechanism work before I trust it. I proved linear regression without matrices and worked out double descent on my own — because I wanted to watch how intelligence actually lives inside a single weight. Those explorations brought me to a harder question: how does an agent come to understand a world it has never seen?

**[ChronoForge](https://github.com/jakkarin-promsee/chronoforge-fpga-engine)** — I built a 2D game engine and Python-to-ROM compiler whose runtime is FPGA logic: no CPU, OS, or instruction set. It made the effect of a computational substrate concrete, and showed me I could build the whole path from an authoring language to working hardware.

**[Bio-Analog CPU](https://github.com/jakkarin-promsee/bio-analog-cpu)** — I explored resident weights, local updates, and a possible analog substrate for continual learning. My first attribution rule broke at the mathematics: contribution magnitude could not tell a weight which _direction_ to move. I rebuilt the system as a forward-only learner with a small closed-form classifier. Controlled simulations showed stronger retention than a tuned replay baseline in some shifting streams, alongside clear losses on static accuracy. This is a tested learning architecture, not a fabricated chip or a complete account of intelligence.

**[my-harness](https://github.com/jakkarin-promsee/my-harness)** — I built a coding-agent harness to expose the model loop, tools, permissions, and sessions usually hidden behind an SDK. It helped me see how much useful agent behavior comes from the surrounding system, and sharpened my question about what a fixed model can actually learn from experience.

**[Active Sensing](https://github.com/jakkarin-promsee/active-sensing-vis)** — I tested a visual model with a coarse map, a few high-resolution glimpses, and a carried state. It learned where to point, but stronger controls showed that the state did not need to remember the previous glimpses: a shuffled state worked as well, and a glimpse-blind policy pointed better. I closed this tested route as a scoped negative result, rather than calling the apparent state a world model.

**[Causal World Learning and Transfer](https://github.com/jakkarin-promsee/causal-world-learning-and-transfer)** — This is my current question in a form I can test precisely. An agent enters an unfamiliar Boolean world, chooses limited interventions, and observes what changes. I have built exact inference and action-selection baselines to measure what the evidence permits. The longer goal is a reusable learning policy that constructs its own understanding and can pass useful evidence or guidance to another agent through limited bandwidth. That learned policy and transfer are still open work.

---

## Other things I've built

- **[Hot Potato](https://github.com/jakkarin-promsee/hot-potato)** — A deployed, teacher-led learning platform with a full-stack lesson editor, student experience, and AI study companion for critical-thinking discussion.
- **[CTerminalPlot](https://github.com/jakkarin-promsee/ctplot)** — A C11 terminal plotting library and CLI, built from a hand-made data abstraction, CSV handling, and a renderer using terminal characters and Braille dots.
- **[Indicator-augmented Regression](https://github.com/jakkarin-promsee/ia-regression)** — An end-to-end ML experiment: clean questionnaire data, train and evaluate a missing-answer model, then serve an interactive Big Five quiz in Streamlit.
- **[Rebirth](https://github.com/jakkarin-promsee/rebirth)** — A complete playable 2D pixel-art action game, with state-driven enemy behavior, room combat, and a multi-phase boss.

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jakkarin-promsee)
[![Email](https://img.shields.io/badge/Email-jakkarin.promsee@gmail.com-1f2937?style=flat-square&logo=gmail&logoColor=white)](mailto:jakkarin.promsee@gmail.com)
[![Facebook](https://img.shields.io/badge/Facebook-Connect-1877f2?style=flat-square&logo=facebook&logoColor=white)](https://www.facebook.com/jakkarin.promsee)

<!-- Need Replace PORTFOLIO_URL -->
