# Project agents

Every `*.md` file in this directory defines a subagent available to Claude Code in
this repo. Agents are picked automatically when their `description` matches the
task, or invoked explicitly ("use the content-reviewer agent to ...").

## File format

```markdown
---
name: content-reviewer
description: When to use this agent. Claude reads this to decide whether to
  delegate, so describe the trigger, not just the capability.
tools: Read, Grep, Glob        # optional; omit to inherit all tools
model: sonnet                  # optional: haiku | sonnet | opus | fable
---

The system prompt for the agent goes here — its role, what it should check,
what it should return, and what it must not do.
```

## Notes

- Each agent starts with a cold context. It sees only the prompt it is handed,
  not this conversation — so its system prompt must carry the project knowledge
  it needs.
- Restrict `tools` for read-only agents (reviewers, auditors). Leave it off for
  agents that need to edit files.
- `model` trades cost for depth: `haiku` for mechanical checks, `sonnet` for most
  work, `opus` for design and hard reasoning.
- Agents in this directory are committed, so they are shared by everyone working
  on the repo and available in web sessions too.

## Agents defined here

_(none yet — planned in the design session)_
