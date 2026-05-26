import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NANOfusion Admin',
  description: 'Správa obsahu a poptávek NANOfusion',
  robots: { index: false, follow: false },
  icons: { icon: '/logo.png' },
  manifest: '/manifest.json',
  themeColor: '#f59e0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NF Admin',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
