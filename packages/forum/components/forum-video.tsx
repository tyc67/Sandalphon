import styled from 'styled-components'
import { getVideoSrc } from '~/utils'
import { defaultBlockStyle } from '~/styles/shared-style'

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px;
`

const Iframe = styled.iframe`
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  margin: auto;
`

type VideoProps = {
  videoSrc: string
}
export default function ForumVideo({ videoSrc = '' }: VideoProps): JSX.Element {
  const shouldShowJsx = Boolean(videoSrc && videoSrc.trim() !== '')
  const src = getVideoSrc(videoSrc)

  return (
    <>
      {shouldShowJsx && (
        <Wrapper id="video">
          <h1>活動影音</h1>
          <Iframe
            src={src}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Wrapper>
      )}
    </>
  )
}
