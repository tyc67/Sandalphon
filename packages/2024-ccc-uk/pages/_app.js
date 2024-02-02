import Head from 'next/head'
import { GlobalStyles } from '../styles/global-styles'
// import ReactGA from 'react-ga'
import { useEffect } from 'react'
import '../i18n'
import TagManager from 'react-gtm-module'
import { GTM_ID } from '../const'
import { useTranslation } from 'react-i18next'

// ReactGA.initialize(environment === 'dev' ? 'UA-83609754-2' : 'UA-83609754-1')

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname)

  //   document.addEventListener('contextmenu', (event) => event.preventDefault())
  // }, [])
  const { t } = useTranslation()

  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID })
  }, [])

  return (
    <>
      <Head>
        <title>{t(`0.meta.title`)}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
