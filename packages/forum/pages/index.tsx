import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'

import ForumVideo from '~/components/forum-video'
import Introduction from '~/components/introduction'
import HeroImage from '~/components/hero-image'
import Speakers from '~/components/speakers'
import Schedule from '~/components/schedule'
import Registration from '~/components/registration'
import RelatedPost from '~/components/related-post'
import Partners from '~/components/partners'
import { breakpoint } from '~/styles/theme'
import Layout from '~/components/layout/layout'
import type { K6_ForumData } from '~/types'
import CustomHead from '../components/shared/head'
import type { OGProperty } from '~/types'

const Main = styled.main`
  background: #bbd4da;
  padding-top: 53px;

  ${breakpoint.xl} {
    padding-top: 76px;
  }
`

// TODO: 擴用性包含放背景圖片

type HomeProps = {
  ogData: OGProperty
}
export default function Home({ ogData }: HomeProps): JSX.Element {
  const [data, setData] = useState<K6_ForumData>({
    metadata: {
      pageInfo: {
        heroImage_mobile: {
          content: '',
          construction: '',
        },
        heroImage_tablet: {
          content: '',
          construction: '',
        },
        heroImage_desktop: {
          content: '',
          construction: '',
        },
        introduction: {
          content: '',
          construction: '',
        },
        qrCode: {
          content: '',
          construction: '',
        },
        video: {
          content: '',
          construction: '',
        },
        registration: {
          content: '',
          construction: '',
        },
        og_image: {
          content: '',
          construction: '',
        },
        og_title: {
          content: '',
          construction: '',
        },
      },
      schedule: [],
      speakers: [],
      partners: {},
    },
    relatedPost: [],
  })

  console.log('data', data)

  useEffect(() => {
    axios
      .get(
        //k6-JSON
        //'https://v3-statics-dev.mirrormedia.mg/files/json/forum2023_gql_all.json'

        //k3-JSON
        // 'https://v3-statics-dev.mirrormedia.mg/json/forum2023.json'

        //k3-prod-JSON
        'https://v3-statics.mirrormedia.mg/json/forum2023.json'
      )
      .then((response) => {
        const data = response.data
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const { metadata, relatedPost } = data // 缺：type + 資料 error handle
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
        title={ogData.ogTitle}
        description={ogData.ogDesc}
        imageUrl={ogData.ogImageSrc}
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

export async function getStaticProps() {
  try {
    const response = await axios.get(
      'https://v3-statics.mirrormedia.mg/json/forum2023.json'
    )
    const data = response.data

    const ogTitle = data.metadata?.pageInfo?.og_title?.content || ''
    const ogImageSrc = data.metadata?.pageInfo?.og_image?.content || ''
    const ogDesc = data.metadata?.pageInfo?.introduction?.content || ''

    return {
      props: {
        ogData: {
          ogTitle: ogTitle,
          ogImageSrc: ogImageSrc,
          ogDesc: ogDesc,
        },
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        ogData: { ogTitle: '', ogImageSrc: '', ogDesc: '' }, // 或其他錯誤處理
      },
    }
  }
}
