import { GlobalStyle } from '~/styles/global-style'
import { ThemeProvider } from 'styled-components'
import { theme } from '~/styles/theme'

//React-ga
import { useEffect } from 'react'
import { initGA, logPageView } from '~/utils/analytics'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGA()
    logPageView()
  }, [])

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
