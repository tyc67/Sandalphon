import { GlobalStyles } from '../styles/global-style'
import type { AppProps } from 'next/app'
import Header from '../components/shared/header'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </>
  )
}
