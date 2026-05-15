'use client'
import Link from 'next/link'
import { Topic } from '@/types/content'
import StarRating from '@/components/ui/StarRating'
import { getLessonsForTopic } from '@/content/lessons'

interface Props {
  topic: Topic
  unlocked: boolean
  stars: number
}

export default function TopicCard({ topic, unlocked, stars }: Props) {
  const lessons = getLessonsForTopic(topic.id)
  const maxStars = lessons.length * 3

  if (!unlocked) {
    return (
      <div className="relative flex flex-col items-center gap-2 p-5 rounded-3xl bg-gray-200 opacity-60 cursor-not-allowed select-none">
        <div className="text-5xl grayscale">{topic.emoji}</div>
        <div className="text-gray-500 font-bold text-lg">{topic.hebrewName}</div>
        <div className="text-4xl">🔒</div>
        <div className="text-xs text-gray-400">{topic.unlockAfterXP} XP לפתיחה</div>
      </div>
    )
  }

  return (
    <Link href={`/topic/${topic.id}`}>
      <div className={`flex flex-col items-center gap-2 p-5 rounded-3xl bg-gradient-to-br ${topic.bgGradient} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer active:scale-95`}>
        <div className="text-5xl">{topic.emoji}</div>
        <div className="text-white font-bold text-lg drop-shadow">{topic.hebrewName}</div>
        <div className="text-white/70 text-sm">{topic.spanishName}</div>
        <StarRating stars={stars} max={3} size="sm" />
        <div className="text-white/60 text-xs">{stars}/{maxStars} כוכבים</div>
      </div>
    </Link>
  )
}
