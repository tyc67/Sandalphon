import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { environment } from '../const'

function CustomDocument() {
  const ogUrl =
    environment === 'dev'
      ? 'https://www.mirrormedia.mg/projects/ccc_ukraine_2023-dev'
      : 'https://www.mirrormedia.mg/projects/ccc_ukraine_2023'
  return (
    <Html>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:locale" content="zh_TW" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="凝視頓巴斯：張乾琦的戰地攝影紀實" />
        <meta
          property="og:image"
          content="https://www.mirrormedia.mg/assets/images/20230208110214-84ac8a1a28b780a2b6231d78f87c44b4-tablet.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://www.mirrormedia.mg/assets/images/20230208110214-84ac8a1a28b780a2b6231d78f87c44b4-tablet.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:description"
          content="過去一年，攝影家張乾琦先後四次進入烏克蘭拍攝，本刊繼去年獨家取得授權，這次將刊載第四次、在烏東頓巴斯地區的影像作品，這裡被視為戰爭決戰點，也是目前兩軍激戰最激烈的地方之一。"
        />
        <meta property="og:url" content={ogUrl} />
        <meta property="fb:app_id" content="175313259598308" />
        <meta
          name="description"
          content="過去一年，攝影家張乾琦先後四次進入烏克蘭拍攝，本刊繼去年獨家取得授權，這次將刊載第四次、在烏東頓巴斯地區的影像作品，這裡被視為戰爭決戰點，也是目前兩軍激戰最激烈的地方之一。"
        />

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
