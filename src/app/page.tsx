import TopicMap from '@/components/layout/TopicMap'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🗺️</div>
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">מפת ההרפתקאות!</h1>
          <p className="text-gray-600 text-lg">בחרי נושא כדי להתחיל ללמוד ספרדית ✨</p>
        </div>
        <TopicMap />
        <div className="text-center mt-8">
          <a href="/achievements" className="text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
            🏆 הפרסים שלי
          </a>
        </div>
      </div>
    </div>
  )
}
