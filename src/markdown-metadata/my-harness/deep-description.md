# my-harness

## Why build a harness from first principles?

The repository identifies itself as a personal learning project: a way to understand how coding agents actually work by implementing their substrate rather than outsourcing it to an agent SDK. It is also a usable terminal agent. A user can converse in a REPL or submit one headless prompt, select a model lane and role, inspect context usage, resume sessions, and let the model read, search, edit, or execute within explicit permissions. The point is the exposed control surface: model execution, tools, prompt assembly, history, and safety decisions are all visible in this codebase.

## One agent turn

The CLI chooses the provider, role, mode, prompt tier, and optional prior session. It assembles a system message from a tiered backbone, role instructions, workspace information, `AGENTS.md`, and skill descriptions. `core/loop.py` sends messages and tool schemas through a provider adapter. A model response may finish or request named tool calls. Each request is decoded, checked by the active permission policy, dispatched through the registry, and appended as a tool result with the matching call ID before the next model call. Unknown names, bad arguments, denials, and failures become readable results so the model can recover. Callbacks journal messages and display tool activity. The loop takes its dependencies as inputs, which allows `FakeModel` tests without an external model.

## Boundaries, controls, and extensibility

The permission profiles are materially different: `chat` advertises no tools, `explore` permits local reads and asks before web access, `build` asks before writes and other consequential actions, and `auto` permits working-directory writes but still asks before shell, network, or subagent work. A command-line yes flag upgrades `ask` decisions but cannot override `deny`. The tool set includes bounded directory and text search, paged reads, exact-string edits, shell execution with a timeout, web fetch, todo tracking, human questions, child loops, and MCP-mounted tools. Roles in `agents/`, commands in `commands/`, skills in `skills/`, and MCP declarations in `harness.toml` are extension points.

The harness supports local Ollama defaults, Gemini API presets through an OpenAI-compatible adapter, and a native Anthropic adapter. The README explicitly says the Anthropic path is implemented but has not passed a live project test. Reasoning controls depend on model support. Prompt tiers change the backbone footprint; `/tokens` estimates current context, `/compact` replaces older conversational content with a summary, and automatic compaction runs between interactive turns. Raw sessions are journaled to JSONL and can be resumed. Tool output is capped with head and tail retained; provider reasoning can be displayed but is removed from stored conversation messages. Subagents keep separate transcripts and return only their final response to the parent.

## What the repo captures beyond the application

`docs/GUIDEBOOK.md` is the operational manual; design notes and several roadmaps preserve how the architecture evolved. Offline tests cover the loop, permission rules, providers, sessions, context, MCP, skills, subagents, and other controls. Acceptance scripts and a museum of older work help distinguish the current packaged harness from previous learning stages. The README describes Stage 0–2 work, a Stage 2C cognitive core, and an MCP client as implemented while later ability and agency work remains on `ROADMAP4`.

## Evidence and open questions

- Sources: `project/my-harness/README.md`, `project/my-harness/docs/GUIDEBOOK.md`, `project/my-harness/src/harness/core/loop.py`, `project/my-harness/src/harness/core/permissions.py`, `project/my-harness/src/harness/core/context.py`, `project/my-harness/src/harness/cli/repl.py`, `project/my-harness/src/harness/providers/`, `project/my-harness/tests/`, and `project/my-harness/docs/ROADMAP4.md`.
- The personal learning motivation is explicit. Real-world user adoption, API costs, and production reliability are not established. Ask the owner which implementation lesson or failed experiment changed their understanding of agents most.
