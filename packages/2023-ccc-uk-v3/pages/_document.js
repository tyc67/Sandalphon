import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { environment } from '../const'

function CustomDocument() {
  const ogUrl =
    environment === 'dev'
      ? 'https://www.mirrormedia.mg/projects/ccc_ukraine_202308-dev'
      : 'https://www.mirrormedia.mg/projects/ccc_ukraine_202308'
  return (
    <Html>
      <Head>
        <meta charset="utf-8" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="逆襲" />
        <meta
          property="og:image"
          content="https://www.mirrormedia.mg/assets/images/20230725193655-cd77bed5a5193c7bdd80a82d36e6cce3-tablet.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://www.mirrormedia.mg/assets/images/20230725193655-cd77bed5a5193c7bdd80a82d36e6cce3-tablet.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:description" content="張乾琦烏東戰地攝影紀實" />
        <meta property="og:url" content={ogUrl} />
        <meta property="fb:app_id" content="175313259598308" />
        <meta name="description" content="張乾琦烏東戰地攝影紀實" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

CustomDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } finally {
    sheet.seal()
  }
}

export default CustomDocument
