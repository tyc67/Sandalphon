import Head from 'next/head'
import { GlobalStyles } from '../styles/global-styles'
// import ReactGA from 'react-ga'
import { useEffect } from 'react'
import '../i18n'
import TagManager from 'react-gtm-module'
import { GTM_ID } from '../const'

// ReactGA.initialize(environment === 'dev' ? 'UA-83609754-2' : 'UA-83609754-1')

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname)

  //   document.addEventListener('contextmenu', (event) => event.preventDefault())
  // }, [])

  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID })
  }, [])

  return (
    <>
      <Head>
        <title>逆襲</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
