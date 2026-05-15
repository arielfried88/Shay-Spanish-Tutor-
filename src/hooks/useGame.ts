'use client'
import { useState, useCallback } from 'react'
import { calcStars } from '@/lib/scoring'

export interface GameState {
  questionIndex: number
  totalQuestions: number
  correctCount: number
  streak: number
  maxStreak: number
  done: boolean
  score: number
}

export function useGame(totalQuestions: number) {
  const [state, setState] = useState<GameState>({
    questionIndex: 0,
    totalQuestions,
    correctCount: 0,
    streak: 0,
    maxStreak: 0,
    done: false,
    score: 0,
  })

  const answer = useCallback((correct: boolean) => {
    setState(prev => {
      const newCorrect = prev.correctCount + (correct ? 1 : 0)
      const newStreak = correct ? prev.streak + 1 : 0
      const newIndex = prev.questionIndex + 1
      const done = newIndex >= totalQuestions
      const score = done ? Math.round((newCorrect / totalQuestions) * 100) : 0
      return {
        ...prev,
        questionIndex: newIndex,
        correctCount: newCorrect,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        done,
        score,
      }
    })
  }, [totalQuestions])

  const reset = useCallback(() => {
    setState({
      questionIndex: 0,
      totalQuestions,
      correctCount: 0,
      streak: 0,
      maxStreak: 0,
      done: false,
      score: 0,
    })
  }, [totalQuestions])

  const stars = calcStars(state.score)

  return { state, answer, reset, stars }
}
