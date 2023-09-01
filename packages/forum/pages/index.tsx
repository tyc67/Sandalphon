import styled from 'styled-components'

import { defaultBlockStyle } from '~/styles/shared-style'
import { mockData } from '~/constants/constant'
import { mainColor } from '~/constants/environment-variables'
import ForumVideo from '~/components/forum-video'
import Introduction from '~/components/introduction'
import HeroImage from '~/components/hero-image'

const Main = styled.main`
  background: ${mainColor};
`

const Registration = styled.div`
  ${defaultBlockStyle}
`

export default function Home(): JSX.Element {
  
  const { pageInfo, schedule, speakers, partners } = mockData

  const heroImageSrc = {
    mobile: pageInfo?.heroImage_mobile?.content || '',
    tablet: pageInfo?.heroImage_tablet?.content || '',
    desktop: pageInfo?.heroImage_desktop?.content || '',
  }
  const introText = pageInfo?.introduction?.content || ''
  const introQrCode = pageInfo?.qrCode?.content || ''
  const videoSrc = pageInfo?.video?.content || ''

  return (
    <Main>
      <HeroImage heroImageSrc={heroImageSrc} />
      <Introduction introText={introText} qrCodeSrc={introQrCode} />
      <ForumVideo video={videoSrc} />

      <Registration>
        <h1>報名資訊</h1>
        <p>{pageInfo?.registration?.content}</p>
      </Registration>
    </Main>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      'https://statics-dev.mnews.tw/json/forum_sheet.json'
    )
    const data = await response.json()

    return {
      props: {
        data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        data: {},
      },
    }
  }
}
