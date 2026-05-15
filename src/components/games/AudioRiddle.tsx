'use client'
import { useState, useEffect, useMemo } from 'react'
import { VocabWord } from '@/types/content'
import { useTTS } from '@/hooks/useTTS'
import { getCorrectFeedback, getWrongFeedback } from '@/lib/feedback'

interface Props {
  words: VocabWord[]
  allWords: VocabWord[]
  questionIndex: number
  onAnswer: (correct: boolean) => void
}

export default function AudioRiddle({ words, allWords, questionIndex, onAnswer }: Props) {
  const word = words[questionIndex % words.length]
  const { speak, isSpeaking } = useTTS()
  const [selected, setSelected] = useState<string | null>(null)
  const [plays, setPlays] = useState(0)
  const [feedback, setFeedback] = useState('')

  const options = useMemo(() => {
    const distractors = allWords.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3)
    return [word, ...distractors].sort(() => Math.random() - 0.5)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id])

  useEffect(() => {
    setSelected(null)
    setPlays(0)
    setFeedback('')
  }, [questionIndex])

  const playAudio = () => {
    if (plays >= 3) return
    speak(word.spanish, 0.65)
    setPlays(p => p + 1)
  }

  const handleSelect = (w: VocabWord) => {
    if (selected) return
    const correct = w.id === word.id
    setSelected(w.id)
    setFeedback(correct ? getCorrectFeedback() : getWrongFeedback())
    setTimeout(() => onAnswer(correct), 1000)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="bg-white/20 backdrop-blur rounded-3xl p-8 text-center w-full">
        <p className="text-white/80 text-sm mb-4">האזיני למילה ובחרי את התרגום הנכון</p>
        <button
          onClick={playAudio}
          disabled={isSpeaking || plays >= 3}
          className={`text-7xl transition-transform duration-200 ${isSpeaking ? 'scale-125 animate-pulse' : 'hover:scale-110 active:scale-95'} ${plays >= 3 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          🔊
        </button>
        <p className="text-white/60 text-sm mt-3">
          {plays === 0 ? 'לחצי להאזין' : plays < 3 ? `ניתן לנגן עוד ${3 - plays} פעמים` : 'האזנת מספיק!'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map(opt => {
          const isSelected = selected === opt.id
          const isCorrect = opt.id === word.id
          let style = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-indigo-400'
          if (selected) {
            if (isCorrect) style = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-800'
            else if (isSelected) style = 'bg-rose-100 border-2 border-rose-400 text-rose-800 animate-shake'
            else style = 'bg-white border-2 border-gray-100 text-gray-400 opacity-60'
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`rounded-2xl p-4 font-bold text-lg transition-all duration-200 active:scale-95 text-center ${style}`}
            >
              <div className="text-2xl mb-1">{opt.emoji}</div>
              <div>{opt.hebrew}</div>
            </button>
          )
        })}
      </div>

      {feedback && <div className="text-xl font-bold animate-bounce-in">{feedback}</div>}
    </div>
  )
}
