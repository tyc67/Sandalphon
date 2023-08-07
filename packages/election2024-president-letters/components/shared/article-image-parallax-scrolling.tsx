import styled from 'styled-components'

import { breakpoint } from '../../styles/theme'
const Figure = styled.figure`
  margin-bottom: 24px;
  div {
    @media screen and (max-device-width: 1199px) {
      background-attachment: scroll;
    }
  }
`
import ImageCaption from './image-caption'

const Div = styled.div<{
  imagesSrc: ImagesSrc
  shouldActiveParallaxScrolling: boolean
}>`
  margin: 0 auto;
  width: 100%;
  height: 75vw;
  position: relative;
  background-attachment: ${({ shouldActiveParallaxScrolling }) =>
    shouldActiveParallaxScrolling ? 'fixed' : 'scroll'};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imagesSrc }) => `url(${imagesSrc.mobile})`};
  ${breakpoint.md} {
    background-image: ${({ imagesSrc }) => `url(${imagesSrc.tablet})`};
  }
  ${breakpoint.xl} {
    background-image: ${({ imagesSrc }) => `url(${imagesSrc.desktop})`};

    width: 100%;
    height: 60vw;
  }
  @media only screen and (max-device-width: 1199px) {
    background-attachment: scroll;
  }
`
export type ImagesSrc = {
  desktop: string
  tablet: string
  mobile: string
  desktopWebP: string
  tabletWebP: string
  mobileWebP: string
}
type Props = {
  imagesSrc: ImagesSrc
  imageCaption?: string
  shouldActiveParallaxScrolling?: boolean
}

export default function ArticleImageParallaxScrolling({
  imagesSrc,
  imageCaption = '',
  shouldActiveParallaxScrolling = false,
}: Props) {
  const hasImageCaption = !!imageCaption
  return (
    <Figure>
      <Div
        imagesSrc={imagesSrc}
        shouldActiveParallaxScrolling={shouldActiveParallaxScrolling}
      ></Div>
      {hasImageCaption && <ImageCaption>{imageCaption}</ImageCaption>}
    </Figure>
  )
}
