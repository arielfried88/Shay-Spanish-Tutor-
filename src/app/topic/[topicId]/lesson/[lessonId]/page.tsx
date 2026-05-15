import { getLessonById } from '@/content/lessons'
import GameShell from '@/components/games/GameShell'
import { notFound } from 'next/navigation'

interface Props {
  params: { topicId: string; lessonId: string }
}

export default function LessonPage({ params }: Props) {
  const lesson = getLessonById(params.lessonId)
  if (!lesson || lesson.topicId !== params.topicId) notFound()

  return <GameShell lesson={lesson} />
}
