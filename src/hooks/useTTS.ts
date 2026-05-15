'use client'
import { useState, useCallback, useEffect } from 'react'
import { tts } from '@/lib/tts'

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    tts.init()
  }, [])

  const speak = useCallback(async (text: string, rate?: number) => {
    setIsSpeaking(true)
    try {
      await tts.speak(text, rate)
    } catch {
      // TTS errors are non-fatal
    } finally {
      setIsSpeaking(false)
    }
  }, [])

  const stop = useCallback(() => {
    tts.stop()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
