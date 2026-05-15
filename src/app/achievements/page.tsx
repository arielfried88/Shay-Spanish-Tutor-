'use client'
import { useProgress } from '@/hooks/useProgress'
import { BADGES } from '@/lib/achievements'
import BadgeCard from '@/components/achievements/BadgeCard'
import Link from 'next/link'

export default function AchievementsPage() {
  const { progress, hydrated } = useProgress()

  const earnedIds = new Set(progress.badges.map(b => b.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-2xl transition-colors">←</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🏆 הפרסים שלי</h1>
            <p className="text-gray-500 text-sm">
              {hydrated ? `${progress.badges.length} מתוך ${BADGES.length} פרסים` : 'טוען...'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BADGES.map(badge => {
            const earnedBadge = progress.badges.find(b => b.id === badge.id)
            return (
              <BadgeCard
                key={badge.id}
                badge={badge}
                unlocked={earnedIds.has(badge.id)}
                unlockedAt={earnedBadge?.unlockedAt}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
