import { Provider } from 'react-redux'
import store from '../store'

import { ThemeProvider } from 'styled-components'
import { theme } from '~/styles/theme'
import { GlobalStyles } from '~/styles/global-styles'

function MyApp({ Component, pageProps }) {
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
