import { NextRequest, NextResponse } from 'next/server'
import { getClient, TUTOR_SYSTEM_PROMPT } from '@/lib/claude'
import { AIFeedbackRequest } from '@/types/api'

export async function POST(req: NextRequest) {
  try {
    const body: AIFeedbackRequest = await req.json()
    const client = getClient()

    const userMsg = body.sessionScore !== undefined
      ? `שי סיימה שיעור: ציון ${body.sessionScore}% (${body.totalQuestions} שאלות). תני לה משוב עידוד קצר.`
      : `מילה: "${body.word}" | תשובת שי: "${body.userAnswer}" | נכון: ${body.correct ? 'כן' : 'לא'}`

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 80,
      system: [
        {
          type: 'text',
          text: TUTOR_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ] as Parameters<typeof client.messages.create>[0]['system'],
      messages: [{ role: 'user', content: userMsg }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ message: text })
  } catch (err) {
    console.error('AI feedback error:', err)
    return NextResponse.json({ message: '!כל הכבוד שי 🌟', error: 'fallback' })
  }
}
