'use client'
import { useState, useEffect, useCallback } from 'react'
import { Lesson } from '@/types/content'
import { getTopicById, getWordById } from '@/content/topics'
import { calcStars, calcXP, getLevelForXP } from '@/lib/scoring'
import { useProgress } from '@/hooks/useProgress'
import { getCompleteFeedback } from '@/lib/feedback'
import StarRating from '@/components/ui/StarRating'
import ProgressBar from '@/components/ui/ProgressBar'
import MultipleChoice from './MultipleChoice'
import FlashcardMatch from './FlashcardMatch'
import WordImageMatch from './WordImageMatch'
import AudioRiddle from './AudioRiddle'
import FillInBlank from './FillInBlank'
import MysteryMission from './MysteryMission'
import LevelUpModal from '@/components/achievements/LevelUpModal'
import { useRouter } from 'next/navigation'

interface Props {
  lesson: Lesson
}

export default function GameShell({ lesson }: Props) {
  const router = useRouter()
  const { completeLesson, progress } = useProgress()

  const topic = getTopicById(lesson.topicId)!
  const words = lesson.wordPool.map(id => getWordById(id)!).filter(Boolean)
  const allWords = topic.words

  const QUESTIONS = lesson.gameType === 'mystery_mission' ? Math.min(3, words.length)
    : lesson.gameType === 'flashcard_match' ? words.length
    : Math.min(10, words.length * 2)

  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [done, setDone] = useState(false)
  const [leveledUp, setLeveledUp] = useState(false)
  const [newBadges, setNewBadges] = useState<string[]>([])
  const [shuffledWords, setShuffledWords] = useState<typeof words>([])
  const [completeFeedback, setCompleteFeedback] = useState('')

  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5))
  }, [lesson.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback((correct: boolean) => {
    const nextCorrect = correctCount + (correct ? 1 : 0)
    const nextStreak = correct ? streak + 1 : 0
    setCorrectCount(nextCorrect)
    setStreak(nextStreak)

    if (questionIndex + 1 >= QUESTIONS) {
      const score = Math.round((nextCorrect / QUESTIONS) * 100)
      const stars = calcStars(score)
      const isRepeat = !!(progress.topics[lesson.topicId]?.lessons[lesson.id]?.timesPlayed)
      const xp = calcXP(lesson.xpReward, stars, isRepeat)

      const result = {
        lessonId: lesson.id,
        bestStars: stars,
        bestScore: score,
        timesPlayed: 1,
        lastPlayed: new Date().toISOString(),
        xpEarned: xp,
      }

      const { leveledUp: lu, newBadges: nb } = completeLesson(lesson.topicId, result)
      setLeveledUp(lu)
      setNewBadges(nb)
      setCompleteFeedback(getCompleteFeedback(stars))
      setDone(true)
    } else {
      setQuestionIndex(i => i + 1)
    }
  }, [correctCount, streak, questionIndex, QUESTIONS, lesson, progress, completeLesson, words])

  const score = done ? Math.round((correctCount / QUESTIONS) * 100) : 0
  const stars = calcStars(score)

  if (done) {
    return (
      <>
        {leveledUp && <LevelUpModal level={progress.level} levelName={getLevelForXP(progress.totalXP).name} onClose={() => setLeveledUp(false)} />}
        <div className={`min-h-screen bg-gradient-to-br ${topic.bgGradient} flex flex-col items-center justify-center p-6 gap-6`}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full animate-bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">כל הכבוד, שי!</h2>
            <div className="flex justify-center mb-4">
              <StarRating stars={stars} size="lg" animate />
            </div>
            <p className="text-2xl font-bold text-gray-700 mb-1">{score}%</p>
            <p className="text-gray-500 mb-2">{correctCount} נכונות מתוך {QUESTIONS}</p>
            <p className="text-lg font-bold text-indigo-600 mb-4">+{calcXP(lesson.xpReward, stars, false)} XP</p>

            {newBadges.length > 0 && (
              <div className="bg-yellow-50 rounded-2xl p-3 mb-4">
                <p className="text-sm font-bold text-yellow-700 mb-2">🏆 פרס חדש!</p>
                {newBadges.map(id => <div key={id} className="text-sm text-yellow-600">{id}</div>)}
              </div>
            )}

            {completeFeedback && (
              <div className="bg-indigo-50 rounded-2xl p-4 mb-4 text-indigo-700 font-medium text-lg">
                {completeFeedback}
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => { setDone(false); setQuestionIndex(0); setCorrectCount(0); setStreak(0) }}
                className="bg-indigo-100 text-indigo-700 font-bold py-3 rounded-2xl hover:bg-indigo-200 active:scale-95 transition-all"
              >
                🔄 שחקי שוב
              </button>
              <button
                onClick={() => router.push(`/topic/${lesson.topicId}`)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-2xl shadow hover:opacity-90 active:scale-95 transition-all"
              >
                חזרי לנושא ←
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const currentWord = shuffledWords[questionIndex % shuffledWords.length]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${topic.bgGradient} flex flex-col`}>
      {/* HUD */}
      <div className="p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-white/70 hover:text-white text-xl p-1">←</button>
        <div className="flex-1">
          <ProgressBar value={questionIndex} max={QUESTIONS} color="bg-white" label={lesson.hebrewTitle} />
        </div>
        <div className="bg-white/20 rounded-full px-3 py-1 text-white text-sm font-bold">
          {questionIndex}/{QUESTIONS}
        </div>
        {streak >= 3 && <div className="text-white font-bold">🔥 {streak}</div>}
      </div>

      {/* Game area */}
      <div className="flex-1 flex items-center justify-center p-4">
        {lesson.gameType === 'multiple_choice' && currentWord && (
          <MultipleChoice words={shuffledWords} allWords={allWords} questionIndex={questionIndex} onAnswer={handleAnswer} streak={streak} />
        )}
        {lesson.gameType === 'flashcard_match' && currentWord && (
          <FlashcardMatch words={shuffledWords} questionIndex={questionIndex} onAnswer={handleAnswer} />
        )}
        {lesson.gameType === 'word_image_match' && (
          <WordImageMatch words={shuffledWords} questionIndex={questionIndex} onAnswer={handleAnswer} />
        )}
        {lesson.gameType === 'audio_riddle' && currentWord && (
          <AudioRiddle words={shuffledWords} allWords={allWords} questionIndex={questionIndex} onAnswer={handleAnswer} />
        )}
        {lesson.gameType === 'fill_in_blank' && currentWord && (
          <FillInBlank words={shuffledWords} questionIndex={questionIndex} onAnswer={handleAnswer} />
        )}
        {lesson.gameType === 'mystery_mission' && currentWord && (
          <MysteryMission word={currentWord} topicId={lesson.topicId} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  )
}
