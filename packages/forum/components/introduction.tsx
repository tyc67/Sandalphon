import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from './shared/content-block'
import Image from '@readr-media/react-image'
import { imagePrefix } from '~/config'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const Content = styled.div`
  display: block;

  ${breakpoint.xl} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
`

const QRCode = styled.div`
  width: 184px;
  height: 184px;
  min-width: 184px;
  margin: auto;
  display: block;
  margin-bottom: 30px;

  ${breakpoint.md} {
    margin-bottom: 40px;
  }

  ${breakpoint.xl} {
    margin: auto 0px auto 60px;
  }
`

type IntroProps = {
  introText?: string
  qrCodeSrc?: string
}
export default function Introduction({
  introText = '',
  qrCodeSrc = '',
}: IntroProps): JSX.Element {
  //什麼時候這個 block 會整個不見？？

  return (
    <Wrapper id="introduction">
      <h1>論壇簡介</h1>
      <Content>
        <QRCode>
          <Image
            images={{ original: qrCodeSrc }}
            objectFit={'contain'}
            priority={true}
            defaultImage={`${imagePrefix}/images/default-qrcode-bg.svg`}
            alt="qr-code"
          />
        </QRCode>
        <ContentBlock content={introText} />
      </Content>
    </Wrapper>
  )
}
