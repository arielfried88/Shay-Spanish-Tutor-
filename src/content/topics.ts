import { Topic } from '@/types/content'
import { greetingsWords } from './vocabulary/greetings'
import { colorsWords } from './vocabulary/colors'
import { numbersWords } from './vocabulary/numbers'
import { animalsWords } from './vocabulary/animals'
import { bodyPartsWords } from './vocabulary/body-parts'
import { foodWords } from './vocabulary/food'
import { familyWords } from './vocabulary/family'
import { schoolWords } from './vocabulary/school'
import { actionsWords } from './vocabulary/actions'
import { sportsWords } from './vocabulary/sports'

export const TOPICS: Topic[] = [
  {
    id: 'greetings',
    hebrewName: 'ברכות',
    spanishName: 'Saludos',
    emoji: '👋',
    color: 'bg-yellow-400',
    bgGradient: 'from-yellow-300 to-orange-300',
    words: greetingsWords,
    unlockAfterXP: 0,
    lessonIds: ['greetings_1', 'greetings_2', 'greetings_3'],
  },
  {
    id: 'colors',
    hebrewName: 'צבעים',
    spanishName: 'Colores',
    emoji: '🎨',
    color: 'bg-pink-400',
    bgGradient: 'from-pink-300 to-rose-400',
    words: colorsWords,
    unlockAfterXP: 0,
    lessonIds: ['colors_1', 'colors_2', 'colors_3'],
  },
  {
    id: 'numbers',
    hebrewName: 'מספרים',
    spanishName: 'Números',
    emoji: '🔢',
    color: 'bg-blue-400',
    bgGradient: 'from-blue-300 to-indigo-400',
    words: numbersWords,
    unlockAfterXP: 100,
    lessonIds: ['numbers_1', 'numbers_2', 'numbers_3'],
  },
  {
    id: 'animals',
    hebrewName: 'בעלי חיים',
    spanishName: 'Animales',
    emoji: '🦁',
    color: 'bg-green-400',
    bgGradient: 'from-green-300 to-emerald-400',
    words: animalsWords,
    unlockAfterXP: 100,
    lessonIds: ['animals_1', 'animals_2', 'animals_3'],
  },
  {
    id: 'body',
    hebrewName: 'גוף',
    spanishName: 'Cuerpo',
    emoji: '🧍',
    color: 'bg-purple-400',
    bgGradient: 'from-purple-300 to-violet-400',
    words: bodyPartsWords,
    unlockAfterXP: 250,
    lessonIds: ['body_1', 'body_2', 'body_3'],
  },
  {
    id: 'food',
    hebrewName: 'אוכל',
    spanishName: 'Comida',
    emoji: '🍎',
    color: 'bg-red-400',
    bgGradient: 'from-red-300 to-orange-400',
    words: foodWords,
    unlockAfterXP: 250,
    lessonIds: ['food_1', 'food_2', 'food_3'],
  },
  {
    id: 'family',
    hebrewName: 'משפחה',
    spanishName: 'Familia',
    emoji: '👨‍👩‍👧',
    color: 'bg-teal-400',
    bgGradient: 'from-teal-300 to-cyan-400',
    words: familyWords,
    unlockAfterXP: 450,
    lessonIds: ['family_1', 'family_2', 'family_3'],
  },
  {
    id: 'school',
    hebrewName: 'בית ספר',
    spanishName: 'Escuela',
    emoji: '🎒',
    color: 'bg-amber-400',
    bgGradient: 'from-amber-300 to-yellow-400',
    words: schoolWords,
    unlockAfterXP: 450,
    lessonIds: ['school_1', 'school_2', 'school_3'],
  },
  {
    id: 'actions',
    hebrewName: 'פעולות',
    spanishName: 'Acciones',
    emoji: '🏃',
    color: 'bg-lime-400',
    bgGradient: 'from-lime-300 to-green-400',
    words: actionsWords,
    unlockAfterXP: 700,
    lessonIds: ['actions_1', 'actions_2', 'actions_3'],
  },
  {
    id: 'sports',
    hebrewName: 'ספורט',
    spanishName: 'Deportes',
    emoji: '⚽',
    color: 'bg-sky-400',
    bgGradient: 'from-sky-300 to-blue-400',
    words: sportsWords,
    unlockAfterXP: 700,
    lessonIds: ['sports_1', 'sports_2', 'sports_3'],
  },
]

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id)
}

export function getWordById(wordId: string): import('@/types/content').VocabWord | undefined {
  for (const topic of TOPICS) {
    const word = topic.words.find(w => w.id === wordId)
    if (word) return word
  }
  return undefined
}
