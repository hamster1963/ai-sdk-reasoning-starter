import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import './globals.css'
import { ReactScan } from './react-scan'

export const metadata: Metadata = {
  title: 'Reasoning Preview',
  description:
    'This is a preview of using reasoning models with Next.js and the AI SDK.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} bg-background`}
    >
      <ReactScan />
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
