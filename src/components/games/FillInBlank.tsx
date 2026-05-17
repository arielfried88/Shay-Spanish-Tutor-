'use client'
import { useState, useEffect, useMemo } from 'react'
import { VocabWord } from '@/types/content'
import SpeakButton from '@/components/ui/SpeakButton'
import { getCorrectFeedback, getWrongFeedback } from '@/lib/feedback'

interface Props {
  words: VocabWord[]
  questionIndex: number
  onAnswer: (correct: boolean) => void
}

function shuffleLetters(word: string): string[] {
  // Add 3-4 distractor letters that look/sound similar
  const extras = 'aeiourstlnm'.split('').sort(() => Math.random() - 0.5).slice(0, 4)
  return [...word.split(''), ...extras].sort(() => Math.random() - 0.5)
}

export default function FillInBlank({ words, questionIndex, onAnswer }: Props) {
  const word = words[questionIndex % words.length]
  const [input, setInput] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)

  const tiles = useMemo(() => shuffleLetters(word.spanish), [word.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInput([])
    setSubmitted(false)
    setFeedback('')
    setShowHint(false)
  }, [questionIndex])

  const addLetter = (letter: string, idx: number) => {
    if (submitted) return
    const key = `${letter}-${idx}`
    if (input.includes(key)) return
    setInput(prev => [...prev, key])
  }

  const removeLast = () => {
    if (submitted) return
    setInput(prev => prev.slice(0, -1))
  }

  const currentWord = input.map(t => t.split('-')[0]).join('')

  const submit = () => {
    if (submitted || currentWord.length < word.spanish.length) return
    const correct = currentWord.toLowerCase() === word.spanish.toLowerCase()
    setSubmitted(true)
    setFeedback(correct ? getCorrectFeedback() : `${getWrongFeedback()} התשובה: ${word.spanish}`)
    setTimeout(() => onAnswer(correct), 1200)
  }

  const isCorrect = submitted && currentWord.toLowerCase() === word.spanish.toLowerCase()

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto">

      {/* Word card */}
      <div className="bg-white rounded-3xl shadow-xl p-5 text-center w-full">
        <div className="text-5xl mb-2">{word.emoji}</div>
        <p className="text-gray-500 text-sm mb-1">כתבי את המילה הספרדית:</p>
        <div className="text-3xl font-bold text-gray-800">{word.hebrew}</div>

        {/* Prominent phonetic hint */}
        {word.audioHint && (
          <div className="mt-3 bg-indigo-50 rounded-2xl px-4 py-2 inline-block">
            <p className="text-indigo-600 text-sm font-medium">
              🎵 נשמע כך: <span className="text-xl font-bold text-indigo-700">{word.audioHint}</span>
            </p>
          </div>
        )}

        <div className="mt-3 flex justify-center">
          <SpeakButton text={word.spanish} />
        </div>
      </div>

      {/* Letter display slots */}
      <div className="flex gap-2 flex-wrap justify-center">
        {word.spanish.split('').map((_, i) => {
          const filledLetter = input[i] ? input[i].split('-')[0] : ''
          return (
            <div
              key={i}
              className={`w-10 h-10 border-b-4 text-center font-bold text-xl flex items-end justify-center pb-0.5 transition-all duration-200 ${
                submitted && filledLetter
                  ? isCorrect
                    ? 'border-emerald-500 text-emerald-700'
                    : 'border-rose-400 text-rose-600'
                  : filledLetter
                  ? 'border-indigo-500 text-indigo-800'
                  : 'border-gray-300 text-gray-800'
              }`}
            >
              {filledLetter.toUpperCase()}
            </div>
          )
        })}
      </div>

      {/* Letter tiles */}
      <div className="bg-white/30 backdrop-blur rounded-2xl p-3 w-full">
        <p className="text-white/70 text-xs text-center mb-2">לחצי על האותיות לפי הסדר</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {tiles.map((letter, idx) => {
            const key = `${letter}-${idx}`
            const used = input.includes(key)
            return (
              <button
                key={key}
                onClick={() => addLetter(letter, idx)}
                disabled={used || submitted}
                className={`w-11 h-11 rounded-xl font-bold text-xl transition-all active:scale-90 shadow ${
                  used
                    ? 'bg-gray-200 text-gray-300 cursor-not-allowed'
                    : 'bg-white hover:bg-indigo-100 text-indigo-800 hover:scale-110'
                }`}
              >
                {letter.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hint toggle */}
      {!submitted && !showHint && input.length === 0 && (
        <button
          onClick={() => setShowHint(true)}
          className="text-white/60 text-sm hover:text-white transition-colors underline"
        >
          צריכה רמז? 💡
        </button>
      )}
      {showHint && !submitted && (
        <div className="bg-white/90 rounded-2xl px-5 py-2 text-center animate-bounce-in">
          <p className="text-gray-600 text-sm">המילה היא: <span className="font-bold text-indigo-700 tracking-widest">{word.spanish.split('').join(' · ')}</span></p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={removeLast}
          disabled={submitted || input.length === 0}
          className="bg-white text-gray-700 font-bold px-5 py-2.5 rounded-xl shadow hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40"
        >
          ← מחקי
        </button>
        <button
          onClick={submit}
          disabled={submitted || currentWord.length < word.spanish.length}
          className="bg-indigo-500 text-white font-bold px-7 py-2.5 rounded-xl shadow hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50"
        >
          בדקי! ✓
        </button>
      </div>

      {feedback && (
        <div className="text-xl font-bold text-center animate-bounce-in">
          {feedback}
        </div>
      )}
    </div>
  )
}
