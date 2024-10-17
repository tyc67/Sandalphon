import './globals.css'
import { Noto_Sans_TC } from 'next/font/google'
import Header from '@/components/header'
import StoreProvider from '@/redux/store-provider'
import { DEFAULT_METADATA } from '@/constants/config'

const font = Noto_Sans_TC({ subsets: ['latin'] })

export const metadata = DEFAULT_METADATA

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-Hant"
      className="scroll-pt-[var(--header-height)] overflow-y-auto"
    >
      <body
        className={`${font.className} flex min-h-screen flex-col items-center`}
      >
        <StoreProvider>
          <Header />
          <main className="mt-[var(--header-height)] flex w-screen max-w-screen-lg grow flex-col items-center">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  )
}
