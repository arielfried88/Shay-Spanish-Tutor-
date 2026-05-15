'use client'
import { useState, useEffect } from 'react'
import { VocabWord } from '@/types/content'
import SpeakButton from '@/components/ui/SpeakButton'

interface Props {
  words: VocabWord[]
  questionIndex: number
  onAnswer: (correct: boolean) => void
}

export default function FlashcardMatch({ words, questionIndex, onAnswer }: Props) {
  const word = words[questionIndex % words.length]
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [questionIndex])

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <p className="text-white/80 text-center">לחצי על הכרטיס כדי לגלות את התרגום!</p>

      <div
        className="w-64 h-64 cursor-pointer"
        style={{ perspective: '800px' }}
        onClick={() => setFlipped(true)}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-7xl">{word.emoji}</div>
            <div className="text-3xl font-bold text-gray-800">{word.spanish}</div>
            <p className="text-gray-400 text-sm">לחצי לגלות 👆</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-7xl">{word.emoji}</div>
            <div className="text-3xl font-bold text-white">{word.hebrew}</div>
            {word.audioHint && <p className="text-white/70 text-sm">🎵 {word.audioHint}</p>}
            <SpeakButton text={word.spanish} size="md" className="mt-2" />
          </div>
        </div>
      </div>

      {flipped && (
        <div className="flex gap-4 animate-bounce-in">
          <button
            onClick={() => onAnswer(true)}
            className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md hover:bg-emerald-600 active:scale-95 transition-all"
          >
            ✅ ידעתי!
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="bg-rose-400 text-white font-bold px-6 py-3 rounded-2xl shadow-md hover:bg-rose-500 active:scale-95 transition-all"
          >
            🤔 צריכה לתרגל
          </button>
        </div>
      )}
    </div>
  )
}
