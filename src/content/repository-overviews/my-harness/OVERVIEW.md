## A small coding-agent loop grew into a harness I could inspect and change.

After Bio-Analog CPU, I did not have a new ML experiment ready. I was curious about how a coding-agent harness actually worked, so I made a small one rather than starting from an SDK. The first version was a single-file loop: send messages to a model, receive tool calls, check permission before risky actions, return tool results, and watch the token use. The question was simply whether I could make that mechanism work and understand every part of it.

## Following the system as it grew

Once the loop worked, I kept trying things. I ran local and API model lanes under a limited budget, studied a system prompt I had seen shared online, changed my own prompt structures and reasoning controls, watched what fit inside different context windows, and tested how much tool output the next turn really needed. The final prompt was my own smaller design, not a pasted copy. Those experiments led to provider adapters, prompt tiers, context estimates and compaction, session history, roles, and a more explicit permission gate. Each addition made another piece of the agent's behavior visible instead of leaving it hidden in a framework.

The terminal excerpt below comes from the repository README. Its token counts are example values, but the controls show the kind of questions I was playing with: how large should the prompt be, and what is taking up the context window?

```text
$ uv run harness
you> /prompt
  * micro     backbone ~286 tokens
    compact   backbone ~602 tokens
    standard  backbone ~897 tokens
    full      backbone ~1,092 tokens

you> /tokens
  [context] ~732 tokens (9% of 8,192)
```

The result is a working terminal agent, but the lesson I carried into my research was about the boundary between the model and its surroundings. Tools, instructions, and conversation history can make a fixed model useful; that does not by itself mean the model learned a new world's rules from experience. Working so closely with prompts and context also pulled my attention toward what transformers represent internally. I then studied latent state, associative memory, and vision more deeply, leading to [Active Sensing](/repositories/active-sensing-vis).
