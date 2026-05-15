'use client'
import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { xpToNextLevel } from '@/lib/scoring'
import ProgressBar from '@/components/ui/ProgressBar'

export default function NavBar() {
  const { progress, hydrated } = useProgress()

  const xpInfo = xpToNextLevel(progress.totalXP)

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 py-3 shadow-lg">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-xl hover:opacity-90 transition-opacity">
          🌟 שי לומדת ספרדית
        </Link>

        {hydrated && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <div className="text-xs text-white/70">רמה {progress.level}: {xpInfo.levelName}</div>
              <div className="w-32">
                <ProgressBar value={xpInfo.current} max={xpInfo.needed} color="bg-yellow-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <span className="text-yellow-300">⚡</span>
              <span className="font-bold text-sm">{progress.totalXP}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <span>⭐</span>
              <span className="font-bold text-sm">{progress.totalStars}</span>
            </div>
            <Link href="/parent" className="text-white/60 hover:text-white text-xs transition-colors">
              👪
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
