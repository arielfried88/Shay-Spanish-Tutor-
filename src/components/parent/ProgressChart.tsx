import { TOPICS } from '@/content/topics'
import { getLessonsForTopic } from '@/content/lessons'
import { UserProgress } from '@/types/progress'

interface Props { progress: UserProgress }

export default function ProgressChart({ progress }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-bold text-gray-800 mb-3 text-lg">התקדמות לפי נושא</h3>
      <div className="flex flex-col gap-3">
        {TOPICS.map(topic => {
          const tp = progress.topics[topic.id]
          const lessons = getLessonsForTopic(topic.id)
          const completed = tp ? Object.keys(tp.lessons).length : 0
          const topicStars = tp ? Object.values(tp.lessons).reduce((s, l) => s + l.bestStars, 0) : 0
          const maxStars = lessons.length * 3
          const avg = tp
            ? Object.values(tp.lessons).reduce((s, l) => s + l.bestScore, 0) / (Object.keys(tp.lessons).length || 1)
            : 0
          const pct = Math.round((topicStars / maxStars) * 100)
          const barColor = pct >= 70 ? 'bg-emerald-400' : pct >= 30 ? 'bg-yellow-400' : 'bg-rose-300'

          const unlocked = progress.totalXP >= topic.unlockAfterXP

          return (
            <div key={topic.id} className={!unlocked ? 'opacity-40' : ''}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">
                  {topic.emoji} {topic.hebrewName}
                  {!unlocked && ' 🔒'}
                </span>
                <span className="text-gray-500">{topicStars}/{maxStars} ⭐ | {Math.round(avg)}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{completed}/{lessons.length} שיעורים</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
