'use client'
import { useState } from 'react'
import { useProgress } from '@/hooks/useProgress'

interface Props {
  onUnlock: () => void
}

export default function PinGate({ onUnlock }: Props) {
  const { progress } = useProgress()
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleDigit = (d: string) => {
    const next = input + d
    setInput(next)
    setError(false)
    if (next.length === 4) {
      if (next === progress.settings.parentPin) {
        onUnlock()
      } else {
        setError(true)
        setTimeout(() => setInput(''), 600)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">👪</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">אזור הורים</h1>
        <p className="text-gray-500 text-sm mb-6">הזינו קוד PIN (ברירת מחדל: 1234)</p>

        <div className={`flex gap-3 justify-center mb-6 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-bold ${
              input.length > i ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200'
            } ${error ? 'border-rose-400 bg-rose-50' : ''}`}>
              {input.length > i ? '●' : ''}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((d, i) => (
            <button
              key={i}
              onClick={() => d === '⌫' ? setInput(p => p.slice(0, -1)) : d ? handleDigit(d) : undefined}
              className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-90 ${
                d ? 'bg-gray-100 hover:bg-indigo-100 text-gray-800' : 'invisible'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {error && <p className="text-rose-500 text-sm mt-4 font-medium">קוד שגוי, נסו שוב</p>}
      </div>
    </div>
  )
}
