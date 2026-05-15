interface Props {
  xp: number
  level: number
  levelName: string
}

export default function XPBadge({ xp, level, levelName }: Props) {
  return (
    <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
      <span className="text-yellow-300 font-bold text-sm">⚡ {xp} XP</span>
      <span className="text-white/60 text-xs">|</span>
      <span className="text-white text-sm font-medium">רמה {level}: {levelName}</span>
    </div>
  )
}
