# Project skills

Each subdirectory here is a skill — a named workflow Claude can invoke, and that
you can trigger as a slash command (`/add-topic`, `/check-content`, ...).

## File format

```
.claude/skills/add-topic/SKILL.md
```

```markdown
---
name: add-topic
description: When to use this skill. Be specific about the trigger — this is
  what Claude matches against.
---

Step-by-step instructions for the workflow.
```

Supporting files (templates, reference docs, scripts) can live alongside
`SKILL.md` in the same directory and be referenced by relative path.

## Skills vs. agents

- **Skill** = instructions injected into the current conversation. Keeps full
  context. Best for repeatable procedures.
- **Agent** = separate context window doing work in parallel. Best for wide
  searches, independent reviews, and anything whose intermediate output you do
  not want filling the main conversation.

## Skills defined here

_(none yet — planned in the design session)_
