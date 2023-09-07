import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from './shared/content-block'

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

const QRCode = styled.img`
  width: 184px;
  height: 184px;
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
  introText: string
  qrCodeSrc?: string
}
export default function Introduction({
  introText = '',
  qrCodeSrc = '',
}: IntroProps): JSX.Element {
  return (
    <Wrapper>
      <h1>論壇簡介</h1>
      <Content>
        <QRCode src={qrCodeSrc} />
        <ContentBlock content={introText} />
      </Content>
    </Wrapper>
  )
}
