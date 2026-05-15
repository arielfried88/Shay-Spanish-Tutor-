export interface LessonResult {
  lessonId: string
  bestStars: number
  bestScore: number
  timesPlayed: number
  lastPlayed: string
  xpEarned: number
}

export interface TopicProgress {
  topicId: string
  unlocked: boolean
  lessons: Record<string, LessonResult>
}

export interface Badge {
  id: string
  unlockedAt: string
}

export interface UserSettings {
  ttsEnabled: boolean
  ttsRate: number
  parentPin: string
  syncEnabled: boolean
}

export interface UserProgress {
  version: number
  totalXP: number
  level: number
  totalStars: number
  lastPlayed: string
  topics: Record<string, TopicProgress>
  badges: Badge[]
  settings: UserSettings
}

export const DEFAULT_PROGRESS: UserProgress = {
  version: 1,
  totalXP: 0,
  level: 1,
  totalStars: 0,
  lastPlayed: new Date().toISOString(),
  topics: {},
  badges: [],
  settings: {
    ttsEnabled: true,
    ttsRate: 0.75,
    parentPin: '1234',
    syncEnabled: false,
  },
}
