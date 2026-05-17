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

    // Chrome auto-pauses speechSynthesis after ~15s of inactivity — keep it awake
    this.keepAlive = setInterval(() => {
      if (!window.speechSynthesis.speaking) window.speechSynthesis.resume()
    }, 8000)

    // Pre-warm: speak a silent utterance so the engine is ready immediately
    const warmup = new SpeechSynthesisUtterance(' ')
    warmup.volume = 0
    warmup.lang = 'es-ES'
    window.speechSynthesis.speak(warmup)
  }

  speak(text: string, rate = 0.75): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve()
    return new Promise(resolve => {
      // Wake Chrome up before speaking — this eliminates the delay
      window.speechSynthesis.resume()

      // Only cancel if something is already playing
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel()
      }

      const utterance = new SpeechSynthesisUtterance(text)
      if (this.spanishVoice) utterance.voice = this.spanishVoice
      utterance.lang = 'es-ES'
      utterance.rate = rate
      utterance.pitch = 1.1
      utterance.onend = () => resolve()
      utterance.onerror = () => resolve() // non-fatal — just continue
      window.speechSynthesis.speak(utterance)
    })
  }

  stop() {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel()
  }
}

export const tts = new TTSService()
