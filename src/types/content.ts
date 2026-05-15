export interface VocabWord {
  id: string
  spanish: string
  hebrew: string
  emoji: string
  audioHint?: string
  exampleSentence?: { spanish: string; hebrew: string }
}

export interface Topic {
  id: string
  hebrewName: string
  spanishName: string
  emoji: string
  color: string
  bgGradient: string
  words: VocabWord[]
  unlockAfterXP: number
  lessonIds: string[]
}

export type GameType =
  | 'flashcard_match'
  | 'word_image_match'
  | 'multiple_choice'
  | 'fill_in_blank'
  | 'audio_riddle'
  | 'mystery_mission'

export interface Lesson {
  id: string
  topicId: string
  hebrewTitle: string
  difficulty: 1 | 2 | 3
  gameType: GameType
  wordPool: string[]
  xpReward: number
}
