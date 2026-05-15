'use client'
import { useState, useCallback } from 'react'
import { AIFeedbackRequest } from '@/types/api'

export function useAIFeedback() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchFeedback = useCallback(async (req: AIFeedbackRequest) => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
      const data = await res.json()
      setMessage(data.message ?? null)
    } catch {
      setMessage(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => setMessage(null), [])

  return { message, loading, fetchFeedback, clear }
}
