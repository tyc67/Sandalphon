import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import { transformVideoSrc } from '~/utils'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const Iframe = styled.iframe`
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  margin: auto;
`

type VideoProps = {
  video: string
  gtmClassName?: string
}
export default function ForumVideo({
  video = '',
  gtmClassName = '',
}: VideoProps): JSX.Element {
  const videoSrc = transformVideoSrc(video)

  return (
    <Wrapper>
      <h1>活動影音</h1>
      <Iframe
        src={videoSrc}
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={gtmClassName}
      />
    </Wrapper>
  )
}
