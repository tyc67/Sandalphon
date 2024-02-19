import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { environment } from '../const'

function CustomDocument() {
  const ogUrl =
    environment === 'dev'
      ? 'https://www.mirrormedia.mg/projects/dev-ccc_ukraine_2024/index.html'
      : 'https://www.mirrormedia.mg/projects/ccc_ukraine_2024/index.html'

  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="勿忘烏克蘭：張乾琦．戰地紀實/Ukraine: Lest We Forget. Chien-Chi Chang's Reportage of the Two-Year Anniversary of the Russia-Ukraine War"
        />
        <meta
          property="og:image"
          content="https://v3-statics.mirrormedia.mg/images/e1ad0adb-3270-45f8-bc73-06b645a11a10-w1200.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://v3-statics.mirrormedia.mg/images/e1ad0adb-3270-45f8-bc73-06b645a11a10-w1200.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:description"
          content='你還記得布查大屠殺嗎？戰爭的殘忍景象曾讓全球民主國家憤慨，各國政要紛紛表達支持烏克蘭。兩年過去了，不少西方國家已經產生戰爭疲勞，質疑為何繼續資助這場戰爭的聲音愈來愈高；一般人的悲憫之情也在消退，對戰爭畫面已逐漸無感。
張乾琦始終沒有忘記烏克蘭。他在文章裡說，當奧地利人以高空煙火慶祝新年時，烏克蘭人卻在爆炸聲中驚醒。他冒著嚴寒浴雪而行，第八次前往烏克蘭戰地，見證前線「絞肉機」般漫長艱苦的戰況。
Do you still remember the Bucha massacre? The brutal scenes of war once stirred indignation among democratic nations worldwide, with leaders expressing support for Ukraine. Two years have passed, and many Western countries have developed war fatigue, questioning why they should continue funding this war. The voices of ordinary people expressing compassion have also faded, gradually becoming desensitized to the images of war.
Chien-Chi Chang has never forgotten Ukraine. In his article, he mentions that while Austrians celebrate the new year with sky-bound fireworks, Ukrainians wake up to the sounds of explosions. Braving the cold, he travels through the snow for the eighth time to the Ukrainian war zone, witnessing the prolonged and arduous conditions on the frontlines, often likened to a "meat grinder.”'
        />
        <meta property="og:url" content={ogUrl} />
        <meta property="fb:app_id" content="175313259598308" />
        <meta
          name="description"
          content='你還記得布查大屠殺嗎？戰爭的殘忍景象曾讓全球民主國家憤慨，各國政要紛紛表達支持烏克蘭。兩年過去了，不少西方國家已經產生戰爭疲勞，質疑為何繼續資助這場戰爭的聲音愈來愈高；一般人的悲憫之情也在消退，對戰爭畫面已逐漸無感。
          張乾琦始終沒有忘記烏克蘭。他在文章裡說，當奧地利人以高空煙火慶祝新年時，烏克蘭人卻在爆炸聲中驚醒。他冒著嚴寒浴雪而行，第八次前往烏克蘭戰地，見證前線「絞肉機」般漫長艱苦的戰況。
          Do you still remember the Bucha massacre? The brutal scenes of war once stirred indignation among democratic nations worldwide, with leaders expressing support for Ukraine. Two years have passed, and many Western countries have developed war fatigue, questioning why they should continue funding this war. The voices of ordinary people expressing compassion have also faded, gradually becoming desensitized to the images of war.
          Chien-Chi Chang has never forgotten Ukraine. In his article, he mentions that while Austrians celebrate the new year with sky-bound fireworks, Ukrainians wake up to the sounds of explosions. Braving the cold, he travels through the snow for the eighth time to the Ukrainian war zone, witnessing the prolonged and arduous conditions on the frontlines, often likened to a "meat grinder.”'
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
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
