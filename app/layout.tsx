import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pressStart = Press_Start_2P({
  variable: '--font-pixel-base',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PIXELHABIT — Gamify Your Habits',
  description: 'A retro pixel-art habit gamification dashboard',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pressStart.variable} bg-background`}>
      <body className="font-pixel">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
