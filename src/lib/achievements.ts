import { UserProgress } from '@/types/progress'

export interface BadgeDef {
  id: string
  name: string
  description: string
  emoji: string
  check: (p: UserProgress) => boolean
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first_lesson',
    name: 'הצעד הראשון',
    description: 'השלמת את השיעור הראשון שלך!',
    emoji: '🌱',
    check: p => Object.values(p.topics).some(t => Object.keys(t.lessons).length > 0),
  },
  {
    id: 'first_star',
    name: 'כוכב ראשון',
    description: 'קיבלת כוכב ראשון!',
    emoji: '⭐',
    check: p => p.totalStars >= 1,
  },
  {
    id: 'five_stars',
    name: 'אוספת כוכבים',
    description: 'צברת 5 כוכבים!',
    emoji: '🌟',
    check: p => p.totalStars >= 5,
  },
  {
    id: 'level_2',
    name: 'עלית רמה!',
    description: 'הגעת לרמה 2 - תלמידה',
    emoji: '🎓',
    check: p => p.level >= 2,
  },
  {
    id: 'level_3',
    name: 'חוקרת אמיצה',
    description: 'הגעת לרמה 3!',
    emoji: '🦁',
    check: p => p.level >= 3,
  },
  {
    id: 'colors_complete',
    name: 'מלכת הצבעים',
    description: 'סיימת את כל שיעורי הצבעים!',
    emoji: '🎨',
    check: p => {
      const ct = p.topics['colors']
      if (!ct) return false
      return ['colors_1','colors_2','colors_3'].every(id => (ct.lessons[id]?.bestStars ?? 0) > 0)
    },
  },
  {
    id: 'greetings_complete',
    name: 'מנומסת',
    description: 'שלטת בברכות הספרדיות!',
    emoji: '👋',
    check: p => {
      const gt = p.topics['greetings']
      if (!gt) return false
      return ['greetings_1','greetings_2','greetings_3'].every(id => (gt.lessons[id]?.bestStars ?? 0) > 0)
    },
  },
  {
    id: 'perfect_score',
    name: 'מושלמת!',
    description: 'קיבלת 100% בשיעור!',
    emoji: '💯',
    check: p => Object.values(p.topics).some(t => Object.values(t.lessons).some(l => l.bestScore === 100)),
  },
  {
    id: 'ten_lessons',
    name: 'עובדת קשה',
    description: 'השלמת 10 שיעורים!',
    emoji: '💪',
    check: p => Object.values(p.topics).reduce((sum, t) => sum + Object.keys(t.lessons).length, 0) >= 10,
  },
  {
    id: 'three_star_master',
    name: 'אלופת שלושה כוכבים',
    description: 'קיבלת 3 כוכבים ב-5 שיעורים!',
    emoji: '🏆',
    check: p => Object.values(p.topics).reduce((sum, t) => sum + Object.values(t.lessons).filter(l => l.bestStars === 3).length, 0) >= 5,
  },
]

export function checkNewBadges(progress: UserProgress): string[] {
  const earned = new Set(progress.badges.map(b => b.id))
  return BADGES.filter(b => !earned.has(b.id) && b.check(progress)).map(b => b.id)
}

export function getBadgeById(id: string): BadgeDef | undefined {
  return BADGES.find(b => b.id === id)
}
