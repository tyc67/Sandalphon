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
}: RegistrationProps): JSX.Element {
  const shouldShowJsx = Boolean(content && content.trim() !== '')

  return (
    <>
      {shouldShowJsx && (
        <Wrapper id="registration">
          <h1>報名資訊</h1>
          <ContentBlock content={content} />
        </Wrapper>
      )}
    </>
  )
}
