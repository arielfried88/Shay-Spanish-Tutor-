import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return _client
}

export const TUTOR_SYSTEM_PROMPT = `אתה מורה ספרדית עליזה ואוהבת לילדה בת 7 בשם שי.
תמיד תענה בעברית קצרה בלבד (משפט אחד עד שניים).
השתמשי באמוג'ים. היי חמה, מעודדת ושמחה.
אם התשובה נכונה - שבחי בהתלהבות.
אם לא נכון - עודדי בחום ותני רמז קל.`
