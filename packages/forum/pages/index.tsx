import styled from 'styled-components'

import { mainColor } from '~/constants/config'
import ForumVideo from '~/components/forum-video'
import Introduction from '~/components/introduction'
import HeroImage from '~/components/hero-image'
import Speakers from '~/components/speakers'
import Schedule from '~/components/schedule'
import Registration from '~/components/registration'
import RelatedPost from '~/components/related-post'
import Partners from '~/components/partners'
import type { RelatedPosts } from '~/components/related-post'

const Main = styled.main`
  /* background: ${mainColor}; */
  background: #bbd4da;
`

type ForumData = {
  pageInfo: Object
  schedule: Object
  speakers: Object
  partners: Object
  relatedPost: RelatedPosts
}

// TODO: 擴用性包含放背景圖片
export default function Home({ forumData }: ForumData): JSX.Element {
  const { pageInfo, speakers, schedule, relatedPost, partners } = forumData // 缺：type + 資料 error handle

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
      <Schedule content={schedule} />
      <RelatedPost relatedPosts={relatedPost} />
      <Registration content={registrationText} />
      <Partners partners={partners} />
    </Main>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      // 'https://storage.googleapis.com/v3-statics-dev.mirrormedia.mg/json/forum2023.json'
      'https://storage.googleapis.com/v3-statics-dev.mirrormedia.mg/files/json/forum2023_gql_all.json'
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
