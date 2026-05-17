'use client'
import { useState } from 'react'
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

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <p className="text-white/80 text-center">לחצי על הכרטיס כדי לגלות איך אומרים בספרדית!</p>

      {/* key=word.id forces a full remount when the word changes — flipped resets to false instantly, no peek */}
      <div
        key={word.id}
        className="w-72 h-72 cursor-pointer"
        style={{ perspective: '800px' }}
        onClick={() => setFlipped(true)}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front — Hebrew word + emoji */}
          <div
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-7xl">{word.emoji}</div>
            <div className="text-4xl font-bold text-gray-800">{word.hebrew}</div>
            <p className="text-gray-400 text-sm mt-2">לחצי לגלות 👆</p>
          </div>

          {/* Back — pronunciation as main, Spanish small below */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3 px-4"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-6xl">{word.emoji}</div>

            {/* Pronunciation — the main thing Shay needs */}
            {word.audioHint && (
              <div className="text-4xl font-bold text-white text-center">{word.audioHint}</div>
            )}

            {/* Spanish spelling — small and secondary */}
            <div className="text-base text-white/60 font-medium">{word.spanish}</div>

            <SpeakButton text={word.spanish} size="lg" className="mt-1" />
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
