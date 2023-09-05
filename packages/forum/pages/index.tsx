import styled from 'styled-components'

import { defaultBlockStyle } from '~/styles/shared-style'
import { mockData } from '~/constants/constant'
import { mainColor } from '~/constants/config'
import ForumVideo from '~/components/forum-video'
import Introduction from '~/components/introduction'
import HeroImage from '~/components/hero-image'
import Speakers from '~/components/speakers'
import ContentBlock from '~/components/shared/content-block'

const Main = styled.main`
  /* background: ${mainColor}; */
  background: #bbd4da;
`

const Registration = styled.div`
  ${defaultBlockStyle}
`

export default function Home(): JSX.Element {
  // const { pageInfo, speakers } = forumData
  const { pageInfo, speakers } = mockData

  const heroImageSrc = {
    mobile: pageInfo?.heroImage_mobile?.content || '',
    tablet: pageInfo?.heroImage_tablet?.content || '',
    desktop: pageInfo?.heroImage_desktop?.content || '',
  }
  const introText = pageInfo?.introduction?.content || ''
  const introQrCode = pageInfo?.qrCode?.content || ''
  const videoSrc = pageInfo?.video?.content || ''
  const speakersData = speakers || []

  return (
    <Main>
      <HeroImage heroImageSrc={heroImageSrc} />
      <Introduction introText={introText} qrCodeSrc={introQrCode} />
      <ForumVideo video={videoSrc} />
      <Speakers speakers={speakersData} />

      <Registration>
        <h1>報名資訊</h1>
        <ContentBlock content={pageInfo?.registration?.content} />
      </Registration>
    </Main>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      'https://storage.googleapis.com/v3-statics-dev.mirrormedia.mg/json/forum2023.json'
    )
    const data = await response.json()

    if (!data) {
      return
    }

    const forumData = {
      pageInfo: data.metadata?.pageInfo ?? {},
      schedule: data.metadata?.schedule ?? {},
      speakers: data.metadata?.speakers ?? [],
      partners: data.metadata?.partners ?? {},
      relatedPost: data.relatedPost ?? [],
    }

    return {
      props: {
        forumData,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        forumData: {},
      },
    }
  }
}
