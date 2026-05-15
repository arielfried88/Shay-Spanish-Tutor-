import { getWeakTopics } from '@/lib/progress'
import { getTopicById } from '@/content/topics'
import { UserProgress } from '@/types/progress'

interface Props { progress: UserProgress }

export default function WeakTopics({ progress }: Props) {
  const weakIds = getWeakTopics(progress)

  if (weakIds.length === 0) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-4 text-center">
        <div className="text-3xl mb-2">🌟</div>
        <p className="text-emerald-700 font-medium">שי מצטיינת בכל הנושאים!</p>
      </div>
    )
  }

  return (
    <div className="bg-orange-50 rounded-2xl p-4">
      <h3 className="font-bold text-orange-800 mb-3">נושאים שדורשים תשומת לב</h3>
      <div className="flex flex-wrap gap-2">
        {weakIds.map(id => {
          const topic = getTopicById(id)
          return topic ? (
            <span key={id} className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-sm font-medium">
              {topic.emoji} {topic.hebrewName}
            </span>
          ) : null
        })}
      </div>
      <p className="text-orange-600 text-sm mt-3">כדאי לשחק שוב בנושאים אלה לחיזוק</p>
    </div>
  )
}
