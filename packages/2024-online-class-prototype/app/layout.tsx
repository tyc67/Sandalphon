import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const font = Noto_Sans_TC({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className={font.className}>{children}</body>
    </html>
  )
}
