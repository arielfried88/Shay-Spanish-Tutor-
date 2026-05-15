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
  const extra = 'aeiourstlnm'.split('').sort(() => Math.random() - 0.5).slice(0, 3)
  return [...word.split(''), ...extra].sort(() => Math.random() - 0.5)
}

export default function FillInBlank({ words, questionIndex, onAnswer }: Props) {
  const word = words[questionIndex % words.length]
  const [input, setInput] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')

  const tiles = useMemo(() => shuffleLetters(word.spanish), [word.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInput([])
    setSubmitted(false)
    setFeedback('')
  }, [questionIndex])

  const addLetter = (letter: string, idx: number) => {
    if (submitted || input.includes(`${letter}-${idx}`)) return
    setInput(prev => [...prev, `${letter}-${idx}`])
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
    setFeedback(correct ? getCorrectFeedback() : `${getWrongFeedback()} התשובה היא: ${word.spanish}`)
    setTimeout(() => onAnswer(correct), 1200)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-6 text-center w-full">
        <div className="text-5xl mb-2">{word.emoji}</div>
        <p className="text-gray-600 text-sm mb-1">כתבי את המילה הספרדית עבור:</p>
        <div className="text-3xl font-bold text-gray-800">{word.hebrew}</div>
        {word.exampleSentence && (
          <p className="text-gray-400 text-sm mt-2 italic">{word.exampleSentence.hebrew}</p>
        )}
        <div className="mt-3 flex justify-center">
          <SpeakButton text={word.spanish} />
        </div>
      </div>

      {/* Answer display */}
      <div className="flex gap-1 min-h-[3rem] flex-wrap justify-center">
        {word.spanish.split('').map((_, i) => (
          <div
            key={i}
            className={`w-9 h-9 border-b-2 text-center font-bold text-lg transition-all ${
              submitted && currentWord[i]
                ? currentWord.toLowerCase() === word.spanish.toLowerCase()
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-rose-400 text-rose-600'
                : 'border-gray-400 text-gray-800'
            }`}
          >
            {input[i] ? input[i].split('-')[0] : ''}
          </div>
        ))}
      </div>

      {/* Letter tiles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tiles.map((letter, idx) => {
          const key = `${letter}-${idx}`
          const used = input.includes(key)
          return (
            <button
              key={key}
              onClick={() => addLetter(letter, idx)}
              disabled={used || submitted}
              className={`w-10 h-10 rounded-xl font-bold text-lg transition-all active:scale-90 ${
                used ? 'bg-gray-200 text-gray-300 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800 shadow'
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={removeLast} disabled={submitted} className="bg-white text-gray-700 font-bold px-4 py-2 rounded-xl shadow hover:bg-gray-50 active:scale-95 transition-all">
          ← מחקי
        </button>
        <button
          onClick={submit}
          disabled={submitted || currentWord.length < word.spanish.length}
          className="bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50"
        >
          בדקי! ✓
        </button>
      </div>

      {feedback && <div className="text-xl font-bold text-center animate-bounce-in">{feedback}</div>}
    </div>
  )
}
