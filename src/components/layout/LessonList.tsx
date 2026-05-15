'use client'
import Link from 'next/link'
import { Lesson } from '@/types/content'
import { useProgress } from '@/hooks/useProgress'
import StarRating from '@/components/ui/StarRating'

const gameTypeLabels: Record<string, string> = {
  flashcard_match: 'כרטיסיות',
  word_image_match: 'התאמת תמונות',
  multiple_choice: 'בחירה מרובה',
  fill_in_blank: 'מלאי את החסר',
  audio_riddle: 'חידת שמע',
  mystery_mission: 'מסיון מסתורי',
}

const gameTypeEmojis: Record<string, string> = {
  flashcard_match: '🃏',
  word_image_match: '🎯',
  multiple_choice: '✅',
  fill_in_blank: '✏️',
  audio_riddle: '🔊',
  mystery_mission: '🔍',
}

const difficultyLabels = ['', '⭐', '⭐⭐', '⭐⭐⭐']

interface Props {
  lessons: Lesson[]
  topicId: string
}

export default function LessonList({ lessons, topicId }: Props) {
  const { getLessonStars } = useProgress()

  return (
    <div className="flex flex-col gap-3 p-4 max-w-md mx-auto">
      {lessons.map((lesson, idx) => {
        const stars = getLessonStars(lesson.id, topicId)
        const played = stars > 0
        return (
          <Link key={lesson.id} href={`/topic/${topicId}/lesson/${lesson.id}`}>
            <div className={`flex items-center gap-4 p-4 rounded-2xl shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95 ${
              played ? 'bg-white' : 'bg-white/80'
            }`}>
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
                {gameTypeEmojis[lesson.gameType]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 truncate">{lesson.hebrewTitle}</div>
                <div className="text-sm text-gray-500">{gameTypeLabels[lesson.gameType]}</div>
                <div className="text-xs text-gray-400">קושי: {difficultyLabels[lesson.difficulty]}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {played ? (
                  <StarRating stars={stars} size="sm" />
                ) : (
                  <span className="text-xs text-indigo-400 font-medium">חדש!</span>
                )}
                <span className="text-xs text-gray-400">{lesson.xpReward} XP</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
