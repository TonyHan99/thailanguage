import Link from 'next/link'; // Import Link component
import './globals.css'
import { Inter, Noto_Sans_KR } from 'next/font/google'

// Configure fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansKr = Noto_Sans_KR({ 
  subsets: ['latin'], // Use 'korean' subset if needed, but often 'latin' covers necessary glyphs
  weight: ['400', '500', '700'], // Include needed weights
  variable: '--font-noto-sans-kr' 
})

export const metadata = {
  title: 'ThaiStep - Learn Thai Language',
  description: 'Learn Thai language through pronunciation and conversation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body className="font-sans antialiased bg-gray-100 text-gray-900">
        <header className="py-4 px-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
                    ThaiStep
                </Link>
            </div>
        </header>
        <main className="min-h-screen pt-6 pb-12">
          {children}
        </main>
        <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
            © {new Date().getFullYear()} ThaiStep. All rights reserved.
        </footer>
      </body>
    </html>
  )
} 