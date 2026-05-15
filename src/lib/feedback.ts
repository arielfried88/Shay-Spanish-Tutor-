const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export const CORRECT = [
  '!נכון מאוד! ⭐',
  '!יפהפה! ידעת! 🌟',
  '!וואו! מדהים! 🎉',
  '!בול! את גאונית! 🏆',
  '!כל הכבוד! 🌈',
  '!מושלם! 💫',
]

export const WRONG = [
  '!כמעט! נסי שוב 💪',
  '!אל תוותרי! את יכולה 🌈',
  '!קרוב מאוד! 🤔',
  '!היה שווה ניסיון! נסי שוב ✨',
]

export const STREAK: Record<number, string> = {
  3:  '!רצף של 3 נכונות! 🔥',
  5:  '!חמישה ברצף! 🚀',
  10: '!עשרה ברצף!! 👑',
}

export const GAME_COMPLETE_STARS: Record<number, string[]> = {
  1: ['!כל הכבוד על הניסיון! 💪', '!יפה מאוד! נסי שוב להשיג יותר כוכבים! ⭐'],
  2: ['!עבודה נהדרת! ⭐⭐', '!ממש טוב! עוד קצת ותגיעי ל-3 כוכבים! 🌟'],
  3: ['!מושלם! 3 כוכבים! ⭐⭐⭐', '!אלופת ספרדית! מדהים! 🏆', '!שלושה כוכבים! את פשוט נפלאה! ✨'],
}

export function getCorrectFeedback(): string { return pick(CORRECT) }
export function getWrongFeedback(): string { return pick(WRONG) }
export function getStreakFeedback(streak: number): string | null {
  return STREAK[streak] ?? null
}
export function getCompleteFeedback(stars: 1 | 2 | 3): string {
  return pick(GAME_COMPLETE_STARS[stars])
}
