import styled from 'styled-components'

import { mockData } from '~/constants/constant'
import { mainColor } from '~/constants/config'
import ForumVideo from '~/components/forum-video'
import Introduction from '~/components/introduction'
import HeroImage from '~/components/hero-image'
import Speakers from '~/components/speakers'
import Schedule from '~/components/schedule'
import Registration from '~/components/registration'

const Main = styled.main`
  /* background: ${mainColor}; */
  background: #bbd4da;
`

// TODO: 擴用性包含放背景圖片
export default function Home(): JSX.Element {
  // const { pageInfo, speakers } = forumData
  const { pageInfo, speakers } = mockData

  const heroImageSrc = {
    mobile: pageInfo?.heroImage_mobile?.content || '',
    tablet: pageInfo?.heroImage_tablet?.content || '',
    desktop: pageInfo?.heroImage_desktop?.content || '',
  }
  const introText = pageInfo?.introduction?.content || ''
  const introQrCodeSrc = pageInfo?.qrCode?.content || ''
  const videoSrc = pageInfo?.video?.content || ''
  const speakersData = speakers || []
  const registrationText = pageInfo?.registration?.content || ''

  return (
    <Main>
      <HeroImage heroImageSrc={heroImageSrc} />
      <Introduction introText={introText} qrCodeSrc={introQrCodeSrc} />
      <ForumVideo videoSrc={videoSrc} />
      <Speakers speakers={speakersData} />
      <Schedule />
      <Registration content={registrationText} />
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
