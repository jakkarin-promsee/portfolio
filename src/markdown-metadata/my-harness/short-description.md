# my-harness

Categories: [AI Agents, Developer Tools, Systems Learning]

Summary: A coding-agent harness built from scratch in Python to study the mechanics that agent SDKs usually hide. It implements the model/tool loop, provider adapters, permission decisions, context controls, session journaling, roles, reusable commands and skills, subagents, and MCP tool integration behind a terminal interface. Local Ollama and API model lanes expose the same underlying execution path, while offline tests use a fake model to exercise behavior without paid calls.

Highlights:
- Tool calls pass through explicit `chat`, `explore`, `build`, or `auto` policies; `-y` can approve only askable actions.
- Tiered prompt backbones, role switching, token estimates, history compaction, and JSONL session resume make context behavior inspectable.
- Provider adapters connect native Ollama, Gemini's OpenAI-compatible API, and an implemented but not live-verified Anthropic lane.
- Built-in file, search, shell, web, question, todo, subagent, and MCP tools share one registry and permission gate.

Tech stack: [Python, Ollama, Gemini API, Anthropic API, MCP, pytest, uv]
