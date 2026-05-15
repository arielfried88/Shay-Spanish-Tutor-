'use client'
import { useTTS } from '@/hooks/useTTS'

interface Props {
  text: string
  rate?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  autoPlay?: boolean
}

const sizes = { sm: 'text-xl p-1.5', md: 'text-2xl p-2', lg: 'text-4xl p-3' }

export default function SpeakButton({ text, rate, size = 'md', className = '', autoPlay: _ }: Props) {
  const { speak, isSpeaking } = useTTS()

  return (
    <button
      onClick={() => speak(text, rate)}
      className={`rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-150 active:scale-95 ${
        isSpeaking ? 'animate-pulse-speak bg-indigo-200' : ''
      } ${sizes[size]} ${className}`}
      title="שמעי את המילה בספרדית"
      type="button"
    >
      🔊
    </button>
  )
}
