class TTSService {
  private spanishVoice: SpeechSynthesisVoice | null = null
  private initialized = false

  init() {
    if (this.initialized) return
    this.initialized = true

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      this.spanishVoice =
        voices.find(v => v.lang === 'es-ES') ??
        voices.find(v => v.lang === 'es-MX') ??
        voices.find(v => v.lang.startsWith('es')) ??
        null
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }

  speak(text: string, rate = 0.75): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve()
    return new Promise((resolve, reject) => {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      if (this.spanishVoice) utterance.voice = this.spanishVoice
      utterance.lang = 'es-ES'
      utterance.rate = rate
      utterance.pitch = 1.1
      utterance.onend = () => resolve()
      utterance.onerror = () => reject(new Error('TTS error'))
      window.speechSynthesis.speak(utterance)
    })
  }

  stop() {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel()
  }
}

export const tts = new TTSService()
