import { BadgeDef } from '@/lib/achievements'

interface Props {
  badge: BadgeDef
  unlocked: boolean
  unlockedAt?: string
}

export default function BadgeCard({ badge, unlocked, unlockedAt }: Props) {
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
      unlocked
        ? 'bg-white border-yellow-300 shadow-md'
        : 'bg-gray-100 border-gray-200 opacity-50 grayscale'
    }`}>
      <div className="text-4xl">{badge.emoji}</div>
      <div className="font-bold text-sm text-center text-gray-800">{badge.name}</div>
      <div className="text-xs text-gray-500 text-center">{badge.description}</div>
      {unlocked && unlockedAt && (
        <div className="text-xs text-yellow-600">
          {new Date(unlockedAt).toLocaleDateString('he-IL')}
        </div>
      )}
      {!unlocked && <div className="text-xs text-gray-400">🔒 נעול</div>}
    </div>
  )
}
