import { GlobalStyles } from '../styles/global-style'
import { EmojiContext } from '../context/emoji'
import type { AppProps } from 'next/app'
import Header from '../components/shared/header'
import { useState } from 'react'
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }: AppProps) {
  const [shouldShowEmoji, setShouldShowEmoji] = useState(true)
  const router = useRouter()
  const currentPath = router.asPath
  const shouldActiveEmojiButton =
    currentPath.includes('lai-ching-te') ||
    currentPath.includes('hou-yu-ih') ||
    currentPath.includes('ko-wen-je')
  return (
    <>
      <GlobalStyles />
      <EmojiContext.Provider value={{ shouldShowEmoji, setShouldShowEmoji }}>
        <Header shouldActiveEmojiButton={shouldActiveEmojiButton} />
        <Component {...pageProps} />
      </EmojiContext.Provider>
    </>
  )
}
