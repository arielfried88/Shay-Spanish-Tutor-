export interface AIFeedbackRequest {
  word: string
  userAnswer: string
  correct: boolean
  sessionScore?: number
  totalQuestions?: number
}

export interface AIFeedbackResponse {
  message: string
  error?: string
}

export interface MysteryMissionRequest {
  topicId: string
  wordId: string
  spanish: string
  hebrew: string
}

export interface MysteryMissionResponse {
  riddle: string
  error?: string
}
