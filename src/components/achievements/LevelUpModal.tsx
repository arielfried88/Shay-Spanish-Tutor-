'use client'
import { useEffect, useState } from 'react'

interface Props {
  level: number
  levelName: string
  onClose: () => void
}

export default function LevelUpModal({ level, levelName, onClose }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 100)
    const t = setTimeout(() => { setShow(false); setTimeout(onClose, 400) }, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4 transition-transform duration-300 ${show ? 'scale-100' : 'scale-50'}`}>
        <div className="text-8xl mb-4">🏆</div>
        <h2 className="text-4xl font-bold mb-2">עלית רמה!</h2>
        <p className="text-6xl font-bold mb-2">{level}</p>
        <p className="text-2xl font-bold opacity-90">{levelName}</p>
        <p className="text-lg mt-4 opacity-80">כל הכבוד שי! ממשיכים קדימה! 🚀</p>
        <button
          onClick={onClose}
          className="mt-6 bg-white text-orange-600 font-bold px-8 py-3 rounded-2xl hover:bg-orange-50 active:scale-95 transition-all"
        >
          !יאהו
        </button>
      </div>
    </div>
  )
}
