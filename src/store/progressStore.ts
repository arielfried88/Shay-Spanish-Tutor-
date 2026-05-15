'use client'
import { create } from 'zustand'
import { UserProgress, DEFAULT_PROGRESS } from '@/types/progress'
import { loadProgress, saveProgress, updateLessonResult, addXP, countTotalStars } from '@/lib/progress'
import { checkNewBadges } from '@/lib/achievements'
import { LessonResult } from '@/types/progress'

interface ProgressStore {
  progress: UserProgress
  hydrated: boolean
  hydrate: () => void
  completeLesson: (topicId: string, result: LessonResult) => { leveledUp: boolean; newBadges: string[] }
  updateSettings: (settings: Partial<UserProgress['settings']>) => void
  resetProgress: () => void
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: DEFAULT_PROGRESS,
  hydrated: false,

  hydrate() {
    const loaded = loadProgress()
    loaded.totalStars = countTotalStars(loaded)
    set({ progress: loaded, hydrated: true })
  },

  completeLesson(topicId, result) {
    const p = get().progress
    const isRepeat = !!(p.topics[topicId]?.lessons[result.lessonId]?.timesPlayed)

    let next = updateLessonResult(p, topicId, result)
    next.totalStars = countTotalStars(next)

    const xpResult = addXP(next, result.xpEarned)
    next = xpResult.progress

    const newBadgeIds = checkNewBadges(next)
    const now = new Date().toISOString()
    for (const id of newBadgeIds) {
      next.badges.push({ id, unlockedAt: now })
    }
    next.lastPlayed = now

    saveProgress(next)
    set({ progress: next })

    return { leveledUp: xpResult.leveledUp, newBadges: newBadgeIds }
  },

  updateSettings(settings) {
    const next = { ...get().progress, settings: { ...get().progress.settings, ...settings } }
    saveProgress(next)
    set({ progress: next })
  },

  resetProgress() {
    saveProgress({ ...DEFAULT_PROGRESS })
    set({ progress: { ...DEFAULT_PROGRESS } })
  },
}))
