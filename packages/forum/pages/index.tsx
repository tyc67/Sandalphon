import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { breakpoint, color } from '~/styles/theme'
import type { ForumData } from '~/types'
import { OG_DESC, OG_TITLE, bgImageURL, JSON_URL } from '~/config'

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
        title={OG_TITLE}
        description={OG_DESC}
        imageUrl="/images/og.jpg"
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
