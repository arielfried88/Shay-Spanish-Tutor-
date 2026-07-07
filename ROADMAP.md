# Roadmap — Shay's Spanish Tutor

## What this app is

A Spanish-vocabulary app built just for Shay (age 7). She's a Hebrew speaker, so every instruction, encouragement, and hint is in Hebrew — she's learning Spanish *through* Hebrew. It's deployed and she plays it regularly, on whatever device is around (phone, tablet, computer).

## Where things stand today (2026-07-07)

- **10 topics** (greetings, colors, numbers, animals, body parts, food, family, school, actions, sports), unlocking progressively by XP, **30 lessons** total (3 per topic).
- **5 game types**: multiple choice, flashcard match, word-image match, audio riddle, mystery mission (typed-answer riddle). A 6th component, fill-in-blank, exists in code but isn't wired into any lesson yet.
- **XP/leveling + badges** system (`src/lib/achievements.ts`), a **parent dashboard** (PIN-gated) with progress charts and weak-topic detection.
- Spanish **text-to-speech** on every word via the browser's built-in speech engine — no external API needed.
- **Live and in daily use.**

### Just shipped this session
- **Mobile/tablet check-up.** Since Shay plays on phones and tablets a lot, this was made priority #1. Tested all 5 game types at iPhone viewport size (375×812): no horizontal overflow anywhere, no console/page errors, touch targets are comfortably sized, the typed-answer screen (Mystery Mission) handles the on-screen keyboard cleanly. Bumped `SpeakButton`'s small size up to a guaranteed 44px tap target (`src/components/ui/SpeakButton.tsx`) since it measured a bit under the touch-target guideline before. **The one thing that could *not* be verified in this sandbox: real iOS Safari behavior for the speak button.** `src/lib/tts.ts` defers the actual `speechSynthesis.speak()` call by 50ms after `cancel()` (a deliberate fix from an earlier session for a Chrome timing bug — see commit `e6335c8`). iOS Safari has a known history of being strict about `speak()` needing to fire in direct response to a user gesture, and a deferred call is a plausible (not confirmed) way that could silently fail specifically on iPhone/iPad. **Next step: have Shay (or you) tap the 🔊 button on an actual iPhone/iPad and confirm sound plays.** If it doesn't, the fix is in `tts.ts`'s cancel→speak sequencing.
- **Deleted dead code**: the leftover Anthropic/Claude API integration (`src/lib/claude.ts`, `/api/ai-feedback`, `/api/mystery-mission` routes, `useAIFeedback` hook, `src/types/api.ts`) had been unused since riddles moved to a built-in library (commit `214bf85`) — confirmed nothing referenced it, removed it along with the `@anthropic-ai/sdk` dependency.

## The plan: three horizons, in order

### Horizon 1 — Ongoing Companion *(now)*
Keep it running well and respond to how Shay is actually using it. This is where we live day to day: bug fixes, small content additions, polish, and — as of this session — mobile/tablet reliability as a standing priority, not a one-time check.

### Horizon 2 — Feature-Complete App *(next)*
Once the day-to-day experience is solid, add real new capabilities. Candidates, not commitments:
- Simple sentence building (beyond single words)
- Basic verb conjugation practice
- Pronunciation/speech input (say the word back, get scored)
- Streaks or gentle reminders to keep up a routine
- Reviving AI-generated feedback/riddles as a deliberate, opt-in feature — this would mean rebuilding what we just deleted, on purpose this time, if it earns its place

### Horizon 3 — Content-Complete Curriculum *(later)*
Define what "done" actually means content-wise — target topic list, whether grammar/sentences are in scope, roughly what level Shay should reach — and then fill it in systematically. **Open question, not yet decided**: we'll define this together in a future session rather than guessing at scope now.

## Next up (pull from here next session)

1. **Verify TTS on a real iPhone/iPad** — the one open item from this session's mobile work (see above).
2. Wire the unused `FillInBlank` game type into at least one lesson, or decide it's not needed and remove it.
3. Pick the first Horizon 2 feature to prototype.

## How we use this doc

Update "Where things stand today" and "Next up" at the end of each session, so the next one starts from here instead of re-deriving it from the commit log.
