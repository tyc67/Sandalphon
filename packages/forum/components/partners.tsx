import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import { breakpoint } from '~/styles/theme'
import type { LogoImage } from '~/types'
import Image from '@readr-media/react-image'
import { imagePrefix } from '~/config'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`
const LogosWrapper = styled.div`
  max-width: 425px;
  margin: auto;

  ${breakpoint.xl} {
    max-width: 720px;
  }
`

const LogoType = styled.h2`
  font-family: 'Noto Serif TC', serif;
  font-size: 20px;
  font-weight: 900;
  line-height: 1.8;
  text-align: center;
  margin: 25px auto 15px;
`

const LogosImage = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  .readr-media-react-image {
    max-width: 128px;
    max-height: 40px;
    height: 40px;
    width: auto;
  }
`

//FIXME: Logo 壞掉時的處理 default-image
//FIXME: type 類型如無資料則不顯示

type PartnersProps = {
  partners: {
    [key: string]: LogoImage[]
  }
}
export default function Partners({
  partners = {
    主辦單位: [],
    指導單位: [],
    合作單位: [],
    贊助單位: [],
  },
}: PartnersProps): JSX.Element {
  function generateLogos(type: string) {
    const logoList = partners[type]
    const shouldShowList = Boolean(logoList?.length)

    return (
      <>
        {shouldShowList && (
          <>
            <LogoType>{type}</LogoType>
            <LogosImage>
              {logoList?.map((logo, index) => (
                <Image
                  key={index}
                  images={{ original: logo.image }}
                  alt={`sponsor-logo ${index}`}
                  objectFit={'contain'}
                  priority={true}
                  defaultImage={`${imagePrefix}/images/default-partner-bg.svg`}
                />
              ))}
            </LogosImage>
          </>
        )}
      </>
    )
  }

  return (
    <Wrapper id="partners">
      <h1>共同推動</h1>
      <LogosWrapper>
        {generateLogos('主辦單位')}
        {generateLogos('指導單位')}
        {generateLogos('合作單位')}
        {generateLogos('贊助單位')}
      </LogosWrapper>
    </Wrapper>
  )
}
