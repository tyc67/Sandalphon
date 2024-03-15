import Document, { Html, Head, Main, NextScript } from 'next/document'
import { env } from '~/const'
import { staticFileDestination } from '~/const/wide-article'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
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

  render() {
    const ogUrl =
      env === 'dev'
        ? 'https://www.mirrormedia.mg/projects/dev-anniversary318/index.html'
        : 'https://www.mirrormedia.mg/projects/anniversary318/index.html'

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:locale" content="zh_TW" />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content="318，我記得：十一個平凡人的太陽花運動"
          />
          <meta
            property="og:image"
            content="https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta
            property="og:description"
            content="2014 年，318 運動爆發，擋下兩岸服貿協議，翻轉台灣本土政治社會格局、令馬英九政權提前跛腳、促成台灣第三次政黨輪替，「公民不服從」精神的展現，也替 2014 香港雨傘運動、2019 香港反送中運動、2022 中國白紙運動等大型社會運動創造動能、打開各種可能性。我們訪談共 11 名台、港、中三地直接或間接的三一八學運參與者，從平凡人視角出發，記錄書寫 10 年來的記憶，回顧生命裡不容易的這 10 年。"
          />
          <meta property="og:url" content={ogUrl} />
          <meta property="fb:app_id" content="175313259598308" />
          <meta
            name="description"
            content="2014 年，318 運動爆發，擋下兩岸服貿協議，翻轉台灣本土政治社會格局、令馬英九政權提前跛腳、促成台灣第三次政黨輪替，「公民不服從」精神的展現，也替 2014 香港雨傘運動、2019 香港反送中運動、2022 中國白紙運動等大型社會運動創造動能、打開各種可能性。我們訪談共 11 名台、港、中三地直接或間接的三一八學運參與者，從平凡人視角出發，記錄書寫 10 年來的記憶，回顧生命裡不容易的這 10 年。"
          />

          <link
            rel="icon"
            type="image/x-icon"
            href={`${staticFileDestination}/favicon.ico`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${staticFileDestination}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${staticFileDestination}/favicon-16x16.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${staticFileDestination}/apple-touch-icon.png`}
          />
          <link
            rel="mask-icon"
            href={`${staticFileDestination}/safari-pinned-tab.svg`}
            color="#003366"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
