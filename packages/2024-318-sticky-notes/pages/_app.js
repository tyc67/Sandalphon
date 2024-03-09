import { Provider } from 'react-redux'
import store from '../store'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
