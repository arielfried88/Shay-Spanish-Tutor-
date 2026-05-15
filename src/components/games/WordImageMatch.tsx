'use client'
import { useState, useMemo, useEffect } from 'react'
import { VocabWord } from '@/types/content'

interface Props {
  words: VocabWord[]
  onAnswer: (correct: boolean) => void
  questionIndex: number
}

export default function WordImageMatch({ words, onAnswer, questionIndex }: Props) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPair, setWrongPair] = useState<string | null>(null)

  const pool = useMemo(() => words.slice(0, 6).sort(() => Math.random() - 0.5), [questionIndex]) // eslint-disable-line react-hooks/exhaustive-deps
  const shuffledEmojis = useMemo(() => [...pool].sort(() => Math.random() - 0.5), [pool])

  useEffect(() => {
    setSelectedWord(null)
    setMatched(new Set())
    setWrongPair(null)
  }, [questionIndex])

  const handleWordClick = (id: string) => {
    if (matched.has(id)) return
    setSelectedWord(prev => (prev === id ? null : id))
  }

  const handleEmojiClick = (id: string) => {
    if (!selectedWord || matched.has(id)) return
    if (selectedWord === id) {
      const next = new Set(matched)
      next.add(id)
      setMatched(next)
      setSelectedWord(null)
      onAnswer(true)
      if (next.size >= pool.length) setTimeout(() => onAnswer(true), 400)
    } else {
      setWrongPair(selectedWord)
      setTimeout(() => {
        setWrongPair(null)
        setSelectedWord(null)
        onAnswer(false)
      }, 600)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
      <p className="text-white/80 text-center text-sm">חברי כל מילה לאמוג׳י שלה!</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Words column */}
        <div className="flex flex-col gap-2">
          {pool.map(w => (
            <button
              key={w.id}
              onClick={() => handleWordClick(w.id)}
              className={`rounded-2xl py-3 px-4 font-bold text-lg transition-all duration-200 active:scale-95 ${
                matched.has(w.id)
                  ? 'bg-emerald-200 text-emerald-800 opacity-50'
                  : selectedWord === w.id
                  ? 'bg-indigo-500 text-white shadow-lg scale-105'
                  : wrongPair === w.id
                  ? 'bg-rose-200 text-rose-800 animate-shake'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              {w.spanish}
            </button>
          ))}
        </div>

        {/* Emojis column */}
        <div className="flex flex-col gap-2">
          {shuffledEmojis.map(w => (
            <button
              key={w.id}
              onClick={() => handleEmojiClick(w.id)}
              className={`rounded-2xl py-3 px-4 text-3xl transition-all duration-200 active:scale-95 ${
                matched.has(w.id)
                  ? 'bg-emerald-200 opacity-50'
                  : selectedWord
                  ? 'bg-white shadow hover:bg-indigo-50 hover:scale-105'
                  : 'bg-white shadow'
              }`}
            >
              {w.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
