export interface LevelInfo {
  level: number
  name: string
  minXP: number
  maxXP: number
}

export const LEVELS: Omit<LevelInfo, 'maxXP'>[] = [
  { level: 1, name: 'חוקרת',         minXP: 0    },
  { level: 2, name: 'תלמידה',        minXP: 100  },
  { level: 3, name: 'חוקרת אמיצה',   minXP: 250  },
  { level: 4, name: 'גיבורת שפות',   minXP: 450  },
  { level: 5, name: 'אלופת ספרדית',  minXP: 700  },
  { level: 6, name: 'קוסמת מילים',   minXP: 1000 },
  { level: 7, name: 'מאסטרית ספרדית', minXP: 1400 },
]

export function getLevelForXP(xp: number): LevelInfo {
  let current = LEVELS[0]
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) current = lvl
    else break
  }
  const idx = LEVELS.indexOf(current)
  const next = LEVELS[idx + 1]
  return { ...current, maxXP: next ? next.minXP : 9999 }
}

export function calcStars(scorePercent: number): 1 | 2 | 3 {
  if (scorePercent >= 90) return 3
  if (scorePercent >= 60) return 2
  return 1
}

export function calcXP(baseXP: number, stars: 1 | 2 | 3, isRepeat: boolean): number {
  const multiplier = stars === 3 ? 1.5 : stars === 2 ? 1.0 : 0.5
  const earned = Math.round(baseXP * multiplier)
  return isRepeat ? Math.round(earned * 0.5) : earned
}

export function xpToNextLevel(xp: number): { current: number; needed: number; levelName: string } {
  const info = getLevelForXP(xp)
  return {
    current: xp - info.minXP,
    needed: info.maxXP - info.minXP,
    levelName: info.name,
  }
}
