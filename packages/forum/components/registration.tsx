import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from './shared/content-block'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

type RegistrationProps = {
  content: string
}
export default function Registration({
  content,
}: RegistrationProps): JSX.Element {
  return (
    <Wrapper>
      <h1>報名資訊</h1>
      <ContentBlock content={content} />
    </Wrapper>
  )
}
