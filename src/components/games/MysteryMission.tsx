'use client'
import { useState, useEffect, useMemo } from 'react'
import { VocabWord } from '@/types/content'
import SpeakButton from '@/components/ui/SpeakButton'
import { getCorrectFeedback, getWrongFeedback } from '@/lib/feedback'
import { getRiddle } from '@/lib/riddles'

interface Props {
  word: VocabWord
  topicId: string
  onAnswer: (correct: boolean) => void
}

export default function MysteryMission({ word, topicId: _, onAnswer }: Props) {
  const riddle = useMemo(() => getRiddle(word.id) || `מה הוא "${word.hebrew}" בספרדית? 🤔`, [word.id])
  const [typed, setTyped] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setTyped('')
    setSubmitted(false)
    setFeedback('')
    setRevealed(false)
  }, [word.id])

  const submit = () => {
    if (submitted) return
    const correct = typed.trim().toLowerCase() === word.spanish.toLowerCase()
    setSubmitted(true)
    setRevealed(true)
    setFeedback(
      correct
        ? `${getCorrectFeedback()} התשובה: ${word.spanish} ${word.emoji}`
        : `${getWrongFeedback()} התשובה הנכונה: ${word.spanish} ${word.emoji}`
    )
    setTimeout(() => onAnswer(correct), 1500)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Riddle card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl p-7 text-center w-full shadow-2xl">
        <div className="text-5xl mb-3">🔍</div>
        <h2 className="text-xl font-bold mb-3">מסיון מסתורי!</h2>
        <p className="text-lg leading-relaxed">{riddle}</p>
      </div>

      {/* Answer input */}
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full">
        <p className="text-gray-500 text-sm mb-1 text-center">כתבי את התשובה בספרדית:</p>
        {word.audioHint && (
          <p className="text-indigo-500 text-sm text-center mb-3 font-medium">
            💡 רמז הגייה: <span className="font-bold">{word.audioHint}</span>
          </p>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={typed}
            onChange={e => setTyped(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            disabled={submitted}
            placeholder="כתבי כאן..."
            className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-2 text-lg font-bold text-center focus:outline-none focus:border-indigo-500 disabled:bg-gray-50"
            dir="ltr"
            autoComplete="off"
            autoCapitalize="none"
          />
          {revealed && <SpeakButton text={word.spanish} />}
        </div>

        {/* Hint: show first letter after a moment */}
        {!submitted && typed.length === 0 && (
          <p className="text-center text-gray-300 text-xs mt-2">
            המילה מתחילה באות <strong className="text-gray-400">{word.spanish[0].toUpperCase()}</strong>
          </p>
        )}

        <button
          onClick={submit}
          disabled={submitted || !typed.trim()}
          className="mt-4 w-full bg-indigo-500 text-white font-bold py-3 rounded-2xl hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50"
        >
          בדקי! 🔍
        </button>
      </div>

      {feedback && (
        <div className="text-xl font-bold text-center animate-bounce-in bg-white/90 rounded-2xl px-6 py-3 shadow">
          {feedback}
        </div>
      )}
    </div>
  )
}
