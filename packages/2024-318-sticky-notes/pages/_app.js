import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store'

import { ThemeProvider } from 'styled-components'
import { theme } from '~/styles/theme'
import { GlobalStyles } from '~/styles/global-styles'

import gtag from '~/utils/gtag'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    gtag.init()
    gtag.sendGAPageView('/')
  }, [])

  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default MyApp
