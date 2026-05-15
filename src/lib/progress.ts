import { UserProgress, LessonResult, DEFAULT_PROGRESS } from '@/types/progress'
import { getLevelForXP } from './scoring'

const KEY = 'shay_progress'

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS }
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const parsed = JSON.parse(raw) as UserProgress
    return { ...DEFAULT_PROGRESS, ...parsed }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(p: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function updateLessonResult(
  progress: UserProgress,
  topicId: string,
  result: LessonResult
): UserProgress {
  const next = structuredClone(progress)
  if (!next.topics[topicId]) {
    next.topics[topicId] = { topicId, unlocked: true, lessons: {} }
  }
  const prev = next.topics[topicId].lessons[result.lessonId]
  next.topics[topicId].lessons[result.lessonId] = {
    ...result,
    bestStars: Math.max(result.bestStars, prev?.bestStars ?? 0),
    bestScore: Math.max(result.bestScore, prev?.bestScore ?? 0),
    timesPlayed: (prev?.timesPlayed ?? 0) + 1,
    xpEarned: (prev?.xpEarned ?? 0) + result.xpEarned,
  }
  return next
}

export function addXP(
  progress: UserProgress,
  amount: number
): { progress: UserProgress; leveledUp: boolean; newLevel: number } {
  const next = structuredClone(progress)
  const oldLevel = next.level
  next.totalXP += amount
  const info = getLevelForXP(next.totalXP)
  next.level = info.level
  const leveledUp = info.level > oldLevel
  return { progress: next, leveledUp, newLevel: info.level }
}

export function countTotalStars(progress: UserProgress): number {
  let total = 0
  for (const tp of Object.values(progress.topics)) {
    for (const lr of Object.values(tp.lessons)) {
      total += lr.bestStars
    }
  }
  return total
}

export function getWeakTopics(progress: UserProgress): string[] {
  const weak: string[] = []
  for (const [topicId, tp] of Object.entries(progress.topics)) {
    const lessons = Object.values(tp.lessons)
    if (lessons.length === 0) continue
    const avg = lessons.reduce((sum, l) => sum + l.bestScore, 0) / lessons.length
    if (avg < 60) weak.push(topicId)
  }
  return weak
}
