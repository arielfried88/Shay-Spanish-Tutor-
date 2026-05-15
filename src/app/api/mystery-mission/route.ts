import { NextRequest, NextResponse } from 'next/server'
import { getClient, TUTOR_SYSTEM_PROMPT } from '@/lib/claude'
import { MysteryMissionRequest } from '@/types/api'

export async function POST(req: NextRequest) {
  try {
    const body: MysteryMissionRequest = await req.json()
    const client = getClient()

    const prompt = `צרי חידה קצרה בעברית (משפט אחד עד שניים) על המילה הספרדית "${body.spanish}" (בעברית: "${body.hebrew}"). אל תגלי את המילה הספרדית. סיימי בשאלה "מה שמי בספרדית?". הוסיפי אמוג'י מתאים.`

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      system: [
        {
          type: 'text',
          text: TUTOR_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ] as Parameters<typeof client.messages.create>[0]['system'],
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ riddle: text })
  } catch (err) {
    console.error('Mystery mission error:', err)
    return NextResponse.json({ riddle: null, error: 'fallback' })
  }
}
