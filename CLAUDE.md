# Shay's Spanish Tutor — project context

A Spanish-vocabulary learning app for Shay, age 7, a Hebrew-speaking kid. All UI copy is Hebrew (the app teaches Spanish *through* Hebrew), and Shay is addressed as female throughout the copy. Deployed and in regular, daily use — treat live-usage stability as a real constraint, not a nice-to-have.

See `ROADMAP.md` for current priorities and long-term direction. Update that file, not this one, when planning next steps.

## Tech stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Zustand (client state + persistence). No backend/database — all content is static data in-repo, all progress is stored client-side via Zustand persistence.

## Architecture map

- `src/content/` — the curriculum data: `topics.ts` (topic list, unlock XP thresholds, which lessons belong to each topic), `lessons.ts` (lesson definitions), `vocabulary/*.ts` (one file per topic's word list).
- `src/components/games/` — the six game types kids actually play: `MultipleChoice`, `FillInBlank`, `FlashcardMatch`, `WordImageMatch`, `AudioRiddle`, `MysteryMission` (riddle-guessing). `GameShell.tsx` is the shared wrapper (scoring, transitions between questions).
- `src/lib/` — `scoring.ts` (star/XP calculation), `progress.ts` + `src/store/progressStore.ts` (Zustand store, persisted progress), `achievements.ts` (badge definitions and unlock checks), `tts.ts` + `src/hooks/useTTS.ts` (Spanish text-to-speech via Web Speech API), `riddles.ts` (built-in Hebrew riddle bank for Mystery Mission — no external API), `feedback.ts` (correct/wrong encouragement copy).
- `src/app/` — routes: `/` (topic map home), `/topic/[topicId]` (lesson list), `/topic/[topicId]/lesson/[lessonId]` (the actual game runner), `/achievements`, `/parent` (PIN-gated parent dashboard with progress charts and weak-topic detection).

## Conventions

- **Hebrew, RTL, gender-marked**: `<html dir="rtl">` in `src/app/layout.tsx`. All new copy should stay Hebrew and continue addressing Shay in the female grammatical form (see badge text in `src/lib/achievements.ts` for examples).
- **Adding a new vocab topic**: create `src/content/vocabulary/<topic>.ts` with the word list → add a `TOPICS` entry in `src/content/topics.ts` (emoji, colors, `unlockAfterXP`, `lessonIds`) → add matching lesson entries in `src/content/lessons.ts`.
- **No external APIs**: the app intentionally has zero backend dependencies. Don't reintroduce a server-side AI call without a real product reason (see ROADMAP Horizon 2 for the one place this might come back deliberately).
