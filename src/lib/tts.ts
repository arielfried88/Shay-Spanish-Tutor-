class TTSService {
  private spanishVoice: SpeechSynthesisVoice | null = null
  private initialized = false
  private keepAlive: ReturnType<typeof setInterval> | null = null

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

    // Prevent Chrome from auto-pausing after ~15s of inactivity
    this.keepAlive = setInterval(() => {
      window.speechSynthesis.resume()
    }, 8000)
  }

  speak(text: string, rate = 0.75): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve()
    return new Promise(resolve => {
      // resume() is the key fix — Chrome pauses the engine silently
      window.speechSynthesis.resume()
      window.speechSynthesis.cancel()

      // Small yield so cancel() completes before we enqueue the new utterance
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text)
        if (this.spanishVoice) utterance.voice = this.spanishVoice
        utterance.lang = 'es-ES'
        utterance.rate = rate
        utterance.pitch = 1.1
        utterance.onend = () => resolve()
        utterance.onerror = () => resolve()
        window.speechSynthesis.speak(utterance)
      }, 50)
    })
  }

  stop() {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel()
  }
}

export const tts = new TTSService()

// Auto-init as soon as the module is imported in the browser —
// this runs well before any user interaction, so voices are ready instantly
if (typeof window !== 'undefined') {
  tts.init()
}
