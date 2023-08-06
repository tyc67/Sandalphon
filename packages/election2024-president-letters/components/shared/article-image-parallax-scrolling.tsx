import styled from 'styled-components'

import { breakpoint } from '../../styles/theme'
import { zIndex } from '../../styles/z-index'
const Figure = styled.figure`
  margin-bottom: 24px;
`
import ImageCaption from './image-caption'

const Div = styled.div<{
  imagesSrc: ImagesSrc
}>`
  margin: 0 auto;
  width: 100%;
  /* z-index: ${zIndex.overHeader}; */
  height: 75vw;
  position: relative;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: image-set(
    ${({ imagesSrc }) =>
      `url(${imagesSrc.mobileWebP}) type('image/webp'), url(${imagesSrc.mobile}) type('image/jpeg')`}
  );
  ${breakpoint.md} {
    background-image: image-set(
      ${({ imagesSrc }) =>
        `url(${imagesSrc.tabletWebP}) type('image/webp'), url(${imagesSrc.tablet}) type('image/jpeg')`}
    );
  }
  ${breakpoint.xl} {
    background-image: image-set(
      ${({ imagesSrc }) =>
        `url(${imagesSrc.desktopWebP}) type('image/webp'), url(${imagesSrc.desktop}) type('image/jpeg')`}
    );

    width: 100%;
    height: 60vw;
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
}

export default function ArticleImageParallaxScrolling({
  imagesSrc,
  imageCaption = '',
}: Props) {
  const hasImageCaption = !!imageCaption
  return (
    <Figure>
      <Div imagesSrc={imagesSrc}></Div>
      {hasImageCaption && <ImageCaption>{imageCaption}</ImageCaption>}
    </Figure>
  )
}
