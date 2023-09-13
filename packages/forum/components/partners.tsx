import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import { breakpoint } from '~/styles/theme'

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

  img {
    height: 40px;
    width: auto;
  }
`

//FIXME: Logo 壞掉時的處理 default-image
//FIXME: type 類型如無資料則不顯示

type Logo = {
  order: string
  image: string
}
type PartnersProps = {
  partners: {
    [key: string]: Logo[]
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
  function removeEmptyLogo(logoList: Logo[]) {
    return logoList.filter((item) => item.image.trim() !== '')
  }

  function generateLogos(type: string) {
    const logoList = removeEmptyLogo(partners[type])

    return (
      <>
        <LogoType>{type}</LogoType>
        <LogosImage>
          {logoList.map((logo, index) => (
            <img key={index} src={logo.image} alt={`sponsor-logo ${index}`} />
          ))}
        </LogosImage>
      </>
    )
  }

  return (
    <Wrapper>
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
