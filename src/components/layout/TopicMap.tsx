'use client'
import { TOPICS } from '@/content/topics'
import { useProgress } from '@/hooks/useProgress'
import TopicCard from './TopicCard'

export default function TopicMap() {
  const { isTopicUnlocked, getTopicStars, hydrated } = useProgress()

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 bg-white/20 rounded-3xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 max-w-2xl mx-auto">
      {TOPICS.map(topic => (
        <TopicCard
          key={topic.id}
          topic={topic}
          unlocked={isTopicUnlocked(topic.id)}
          stars={getTopicStars(topic.id)}
        />
      ))}
    </div>
  )
}
