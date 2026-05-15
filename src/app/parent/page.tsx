'use client'
import { useState } from 'react'
import { useProgress } from '@/hooks/useProgress'
import PinGate from '@/components/parent/PinGate'
import ProgressChart from '@/components/parent/ProgressChart'
import WeakTopics from '@/components/parent/WeakTopics'
import Link from 'next/link'
import { BADGES } from '@/lib/achievements'
import { xpToNextLevel } from '@/lib/scoring'
import { LESSONS } from '@/content/lessons'

export default function ParentPage() {
  const [unlocked, setUnlocked] = useState(false)
  const { progress, hydrated, resetProgress, updateSettings } = useProgress()
  const [changingPin, setChangingPin] = useState(false)
  const [newPin, setNewPin] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />

  const xpInfo = xpToNextLevel(progress.totalXP)
  const totalLessons = LESSONS.length
  const completedLessons = Object.values(progress.topics).reduce(
    (sum, tp) => sum + Object.keys(tp.lessons).length, 0
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-2xl mx-auto py-6 px-4 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-2xl">←</Link>
          <h1 className="text-3xl font-bold text-gray-800">👪 אזור הורים</h1>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'XP סה"כ', value: progress.totalXP, emoji: '⚡' },
            { label: 'רמה נוכחית', value: `${progress.level} – ${xpInfo.levelName}`, emoji: '🎓' },
            { label: 'כוכבים', value: progress.totalStars, emoji: '⭐' },
            { label: 'שיעורים', value: `${completedLessons}/${totalLessons}`, emoji: '📚' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 text-center shadow">
              <div className="text-3xl mb-1">{s.emoji}</div>
              <div className="font-bold text-gray-800 text-lg">{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress chart */}
        {hydrated && <ProgressChart progress={progress} />}

        {/* Weak topics */}
        {hydrated && <WeakTopics progress={progress} />}

        {/* Badges */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-bold text-gray-800 mb-3">🏆 פרסים ({progress.badges.length}/{BADGES.length})</h3>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map(b => {
              const def = BADGES.find(bd => bd.id === b.id)
              return def ? (
                <span key={b.id} className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-sm">
                  {def.emoji} {def.name}
                </span>
              ) : null
            })}
            {progress.badges.length === 0 && <p className="text-gray-400 text-sm">עוד אין פרסים</p>}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
          <h3 className="font-bold text-gray-800 text-lg">⚙️ הגדרות</h3>

          <label className="flex items-center justify-between">
            <span className="text-gray-700">הקראה קולית בספרדית</span>
            <button
              onClick={() => updateSettings({ ttsEnabled: !progress.settings.ttsEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${progress.settings.ttsEnabled ? 'bg-indigo-500' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow mx-0.5 transition-transform ${progress.settings.ttsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </label>

          {changingPin ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                maxLength={4}
                value={newPin}
                onChange={e => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="PIN חדש (4 ספרות)"
                className="border rounded-xl px-3 py-2 text-sm flex-1 text-center"
                dir="ltr"
              />
              <button
                onClick={() => { if (newPin.length === 4) { updateSettings({ parentPin: newPin }); setChangingPin(false); setNewPin('') } }}
                className="bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-sm"
              >שמרי</button>
              <button onClick={() => setChangingPin(false)} className="text-gray-400 text-sm">ביטול</button>
            </div>
          ) : (
            <button onClick={() => setChangingPin(true)} className="text-indigo-500 font-medium text-sm text-right hover:underline">
              🔑 שנה PIN הורה
            </button>
          )}

          {confirmReset ? (
            <div className="bg-rose-50 rounded-xl p-3 flex gap-3 items-center">
              <p className="text-rose-700 text-sm flex-1">בטוחים? כל ההתקדמות תימחק!</p>
              <button onClick={() => { resetProgress(); setConfirmReset(false) }} className="bg-rose-500 text-white font-bold px-3 py-1.5 rounded-xl text-sm">מחקי</button>
              <button onClick={() => setConfirmReset(false)} className="text-gray-500 text-sm">ביטול</button>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="text-rose-400 font-medium text-sm text-right hover:underline">
              🗑️ אפסי את כל ההתקדמות
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
