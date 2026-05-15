import { getTopicById } from '@/content/topics'
import { getLessonsForTopic } from '@/content/lessons'
import LessonList from '@/components/layout/LessonList'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { topicId: string }
}

export default function TopicPage({ params }: Props) {
  const topic = getTopicById(params.topicId)
  if (!topic) notFound()

  const lessons = getLessonsForTopic(topic.id)

  return (
    <div className={`min-h-screen bg-gradient-to-br ${topic.bgGradient}`}>
      <div className="max-w-md mx-auto py-6">
        <div className="flex items-center gap-3 px-4 mb-6">
          <Link href="/" className="text-white/70 hover:text-white text-2xl transition-colors">←</Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-4xl">{topic.emoji}</span>
              <h1 className="text-3xl font-bold text-white">{topic.hebrewName}</h1>
            </div>
            <p className="text-white/70 text-sm">{topic.spanishName} · {lessons.length} שיעורים</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur mx-4 rounded-2xl p-3 mb-4">
          <p className="text-white text-sm text-center">
            {topic.words.length} מילים · בחרי שיעור כדי להתחיל!
          </p>
        </div>

        <LessonList lessons={lessons} topicId={topic.id} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [
    'greetings','colors','numbers','animals','body','food','family','school','actions','sports'
  ].map(topicId => ({ topicId }))
}
