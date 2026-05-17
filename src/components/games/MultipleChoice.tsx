'use client'
import { useState, useEffect, useMemo } from 'react'
import { VocabWord } from '@/types/content'
import SpeakButton from '@/components/ui/SpeakButton'
import { getCorrectFeedback, getWrongFeedback, getStreakFeedback } from '@/lib/feedback'

interface Props {
  words: VocabWord[]
  allWords: VocabWord[]
  questionIndex: number
  onAnswer: (correct: boolean) => void
  streak: number
}

export default function MultipleChoice({ words, allWords, questionIndex, onAnswer, streak }: Props) {
  const word = words[questionIndex % words.length]
  const [selected, setSelected] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState('')

  const options = useMemo(() => {
    const distractors = allWords
      .filter(w => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    return [word, ...distractors].sort(() => Math.random() - 0.5)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id])

  useEffect(() => {
    setSelected(null)
    setFeedbackText('')
  }, [questionIndex])

  const handleSelect = (w: VocabWord) => {
    if (selected) return
    const correct = w.id === word.id
    setSelected(w.id)
    const streak_fb = correct ? getStreakFeedback(streak + 1) : null
    setFeedbackText(streak_fb ?? (correct ? getCorrectFeedback() : getWrongFeedback()))
    setTimeout(() => onAnswer(correct), 1000)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Question card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center w-full">
        <p className="text-gray-500 text-sm mb-2">איך אומרים זאת בספרדית?</p>
        <div className="text-6xl mb-3">{word.emoji}</div>
        <div className="text-3xl font-bold text-gray-800 mb-1">{word.hebrew}</div>
        <div className="mt-4 flex justify-center">
          <SpeakButton text={word.spanish} size="lg" />
        </div>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map(opt => {
          const isSelected = selected === opt.id
          const isCorrect = opt.id === word.id
          let style = 'bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
          if (selected) {
            if (isCorrect) style = 'bg-emerald-100 border-2 border-emerald-500'
            else if (isSelected) style = 'bg-rose-100 border-2 border-rose-400 animate-shake'
            else style = 'bg-white border-2 border-gray-100 opacity-50'
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`rounded-2xl p-4 text-center transition-all duration-200 active:scale-95 ${style}`}
            >
              <div className="text-2xl mb-1">{opt.emoji}</div>
              {/* Pronunciation — the main label Shay reads */}
              <div className="text-xl font-bold text-gray-800 leading-tight">
                {opt.audioHint ?? opt.hebrew}
              </div>
              {/* Spanish spelling — small and secondary */}
              <div className="text-xs text-gray-400 mt-1">{opt.spanish}</div>
            </button>
          )
        })}
      </div>

      {feedbackText && (
        <div className="text-xl font-bold text-center animate-bounce-in">
          {feedbackText}
        </div>
      )}
    </div>
  )
}
