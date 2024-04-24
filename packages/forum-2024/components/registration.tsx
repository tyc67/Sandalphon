import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from '~/components/shared/content-block'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

type RegistrationProps = {
  content: string
}
export default function Registration({
  content,
}: RegistrationProps): JSX.Element | null {
  //Error Handle
  const shouldShowJsx = Boolean(typeof content !== 'string' || content.trim())
  if (!shouldShowJsx) {
    return null
  }

  return (
    <Wrapper id="registration">
      <h1>報名資訊</h1>
      <ContentBlock content={content} />
    </Wrapper>
  )
}
