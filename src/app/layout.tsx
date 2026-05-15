import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/layout/NavBar'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'שי לומדת ספרדית 🌟',
  description: 'המורה הפרטית של שי לספרדית',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="bg-gray-50 min-h-screen">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
