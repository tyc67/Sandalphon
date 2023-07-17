import Head from 'next/head'
import { GlobalStyles } from '../styles/global-styles'
import ReactGA from 'react-ga'
import { useEffect } from 'react'
import '../i18n'
import { environment } from '../const'

ReactGA.initialize(environment === 'dev' ? 'UA-83609754-2' : 'UA-83609754-1')

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)

    document.addEventListener('contextmenu', (event) => event.preventDefault())
  }, [])
  return (
    <>
      <Head>
        <title>凝視頓巴斯：張乾琦的戰地攝影紀實</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
