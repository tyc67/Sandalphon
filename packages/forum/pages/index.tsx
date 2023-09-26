import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { breakpoint, color } from '~/styles/theme'
import type { ForumData } from '~/types'
import { bgImageURL, JSON_URL } from '~/config'

import Layout from '~/components/layout/layout'
import CustomHead from '~/components/shared/head'
import ForumVideo from '~/components/forum-video'
import Introduction from '~/components/introduction'
import HeroImage from '~/components/hero-image'
import Speakers from '~/components/speakers'
import Schedule from '~/components/schedule'
import Registration from '~/components/registration'
import RelatedPost from '~/components/related-post'
import Partners from '~/components/partners'

const Main = styled.main`
  background-image: ${bgImageURL ? `url(${bgImageURL})` : 'none'};
  background-attachment: fixed;
  background-size: cover;
  background-color: ${color.background};
  padding-top: 53px;

  ${breakpoint.xl} {
    padding-top: 76px;
  }
`

export default function Home(): JSX.Element {
  const [data, setData] = useState<ForumData>({
    metadata: {
      pageInfo: {},
      schedule: [],
      speakers: [],
      partners: {},
    },
    relatedPost: [],
  })

  useEffect(() => {
    axios
      .get(JSON_URL)
      .then((response) => {
        const data = response.data
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const { metadata, relatedPost } = data
  const { pageInfo, speakers, schedule, partners } = metadata

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
    <>
      <CustomHead
        title="2023 離岸風電 高峰論壇"
        description="隨著Apple、Google、Microsoft等重量級企業加入全球再生能源倡議RE100，再生能源對出口導向的台灣經濟發展將更加重要。然而，台灣自2021年被列為全球採購再生能源最困難的市場之一後，此問題並未有太大改善。持平而論，未來幾年要大幅提高綠電供給，似乎只能仰賴離岸風電。換句話說，台灣離岸風電的發展順利與否，將攸關台灣經濟的命運。有鑑於此，《鏡週刊》特別舉辦「離岸風電高峰論壇」，盼能集思廣益，解決此一難題。"
        imageUrl="https://v3-statics-dev.mirrormedia.mg/images/161082a6-2311-4fb0-b5b3-0ea19af21b55.png"
      />

      <Layout>
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
      </Layout>
    </>
  )
}
