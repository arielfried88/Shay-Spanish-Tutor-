'use client'
import { useEffect } from 'react'
import { useProgressStore } from '@/store/progressStore'
import { TOPICS } from '@/content/topics'

export function useProgress() {
  const store = useProgressStore()

  useEffect(() => {
    if (!store.hydrated) store.hydrate()
  }, [store.hydrated]) // eslint-disable-line react-hooks/exhaustive-deps

  const isTopicUnlocked = (topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId)
    if (!topic) return false
    return store.progress.totalXP >= topic.unlockAfterXP
  }

  const getTopicStars = (topicId: string) => {
    const tp = store.progress.topics[topicId]
    if (!tp) return 0
    return Object.values(tp.lessons).reduce((sum, l) => sum + l.bestStars, 0)
  }

  const getLessonStars = (lessonId: string, topicId: string) => {
    return store.progress.topics[topicId]?.lessons[lessonId]?.bestStars ?? 0
  }

  return {
    ...store,
    isTopicUnlocked,
    getTopicStars,
    getLessonStars,
  }
}
