'use client'
import { useState, useEffect } from 'react'
import { VocabWord } from '@/types/content'
import SpeakButton from '@/components/ui/SpeakButton'
import { getCorrectFeedback, getWrongFeedback } from '@/lib/feedback'

interface Props {
  word: VocabWord
  topicId: string
  onAnswer: (correct: boolean) => void
}

const FALLBACK_RIDDLES: Record<string, string> = {
  color_rojo: 'אני הצבע של עגבנייה ותפוח. מה שמי בספרדית? 🍎',
  color_azul: 'אני הצבע של השמיים והים. מה שמי בספרדית? 🌊',
  color_verde: 'אני הצבע של עשב וצפרדע. מה שמי בספרדית? 🐸',
  animal_gato: 'יש לי שפם, אני אוהב לישון ולנקר. מה שמי בספרדית? 😺',
  animal_perro: 'אני הידיד הכי טוב של האדם. מה שמי בספרדית? 🐕',
  animal_leon: 'אני מלך הג\'ונגל עם רעמה גדולה. מה שמי בספרדית? 👑',
  food_helado: 'אני קר ומתוק, אוכלים אותי בקיץ. מה שמי בספרדית? 🍦',
  food_chocolate: 'אני חום ומתוק ועשוי מקקאו. מה שמי בספרדית? 🍫',
}

export default function MysteryMission({ word, topicId, onAnswer }: Props) {
  const [riddle, setRiddle] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(true)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    setSelected(null)
    setFeedback('')
    setTyped('')
    setRiddle(null)
    setLoading(true)

    fetch('/api/mystery-mission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, wordId: word.id, spanish: word.spanish, hebrew: word.hebrew }),
    })
      .then(r => r.json())
      .then(data => setRiddle(data.riddle ?? FALLBACK_RIDDLES[word.id] ?? `מה הוא "${word.hebrew}" בספרדית?`))
      .catch(() => setRiddle(FALLBACK_RIDDLES[word.id] ?? `מה הוא "${word.hebrew}" בספרדית?`))
      .finally(() => setLoading(false))
  }, [word.id, topicId])

  const submit = () => {
    if (selected) return
    const correct = typed.trim().toLowerCase() === word.spanish.toLowerCase()
    setSelected(word.id)
    setFeedback(
      correct
        ? `${getCorrectFeedback()} התשובה היא: ${word.spanish} ${word.emoji}`
        : `${getWrongFeedback()} התשובה הנכונה היא: ${word.spanish} ${word.emoji}`
    )
    setTimeout(() => onAnswer(correct), 1500)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl p-6 text-center w-full shadow-2xl">
        <div className="text-4xl mb-3">🔍</div>
        <h2 className="text-xl font-bold mb-2">מסיון מסתורי!</h2>
        {loading ? (
          <div className="animate-pulse text-white/60 text-lg">טוענת חידה...</div>
        ) : (
          <p className="text-lg leading-relaxed">{riddle}</p>
        )}
      </div>

      {!loading && (
        <div className="bg-white rounded-3xl shadow-xl p-6 w-full">
          <p className="text-gray-500 text-sm mb-3 text-center">כתבי את התשובה בספרדית:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={typed}
              onChange={e => setTyped(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              disabled={!!selected}
              placeholder="כתבי כאן..."
              className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-2 text-lg font-bold text-center focus:outline-none focus:border-indigo-500 disabled:bg-gray-50"
              dir="ltr"
            />
            <SpeakButton text={selected ? word.spanish : ''} />
          </div>
          <button
            onClick={submit}
            disabled={!!selected || !typed.trim()}
            className="mt-3 w-full bg-indigo-500 text-white font-bold py-3 rounded-2xl hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50"
          >
            בדקי! 🔍
          </button>
        </div>
      )}

      {feedback && (
        <div className="text-xl font-bold text-center animate-bounce-in bg-white/90 rounded-2xl px-6 py-3 shadow">
          {feedback}
        </div>
      )}
    </div>
  )
}
