import styled from 'styled-components'
import { breakpoint } from '../../styles/theme'

// import Image from 'next/image'

import { css } from 'styled-components'

const pictureCoverCSS = css`
  position: relative;
  display: block;
  width: 100vw;
  height: 42.25vh;

  img {
    width: 100%;
    height: 100%;
    /* height: calc(100vh - 254px); */

    object-fit: cover;
  }
  /* max-height: 512px; */
`
const pictureContentCSS = css<{
  isFullSizeImage: boolean
  shouldRespectImageWightAndHeight: boolean
}>`
  position: relative;
  display: block;
  margin-bottom: 24px;
  img {
    width: 100%;
    height: ${({ shouldRespectImageWightAndHeight, isFullSizeImage }) => {
      if (!isFullSizeImage || shouldRespectImageWightAndHeight) {
        return 'fit-content'
      }
      return '75vw'
    }};
    height: fit-content;
    object-fit: cover;
    max-width: ${({ isFullSizeImage }) =>
      isFullSizeImage ? 'initial' : '480px'};
    margin: 0 auto;
    ${breakpoint.xl} {
      width: 100vw;
      height: ${({ shouldRespectImageWightAndHeight, isFullSizeImage }) => {
        if (!isFullSizeImage || shouldRespectImageWightAndHeight) {
          return 'fit-content'
        }
        return '60vw'
      }};
      object-fit: cover;
    }
  }
`
const Picture = styled.picture<{
  type: 'cover' | 'content'
  isFullSizeImage: boolean
  shouldRespectImageWightAndHeight: boolean
}>`
  ${({ type }) => {
    switch (type) {
      case 'cover':
        return pictureCoverCSS
      case 'content':
        return pictureContentCSS
      default:
        return pictureContentCSS
    }
  }}
`
export type ImagesSrc = {
  desktop: string
  tablet: string
  mobile: string
  desktopWebP: string
  tabletWebP: string
  mobileWebP: string
}
type CoverImageProps = {
  name: string
  type?: 'cover' | 'content'
  imagesSrc: ImagesSrc
  isFullSizeImage?: boolean
  shouldRespectImageWightAndHeight?: boolean
}

export default function ArticleImage({
  name,
  type = 'content',
  imagesSrc,
  isFullSizeImage = true,
  shouldRespectImageWightAndHeight = false,
}: CoverImageProps): JSX.Element {
  return (
    <>
      <Picture
        type={type}
        isFullSizeImage={isFullSizeImage}
        shouldRespectImageWightAndHeight={shouldRespectImageWightAndHeight}
      >
        <source
          srcSet={imagesSrc.desktopWebP}
          media="(min-width: 1200px)"
          type="image/webP"
        />
        <source
          srcSet={imagesSrc.desktop}
          media="(min-width: 1200px)"
          type="image/jpeg"
        />
        <source
          srcSet={imagesSrc.tabletWebP}
          media="(min-width: 768px)"
          type="image/webP"
        />
        <source
          srcSet={imagesSrc.tablet}
          media="(min-width: 768px)"
          type="image/jpeg"
        />
        <source srcSet={imagesSrc.mobileWebP} type="image/webP" />

        <img alt={name} src={imagesSrc.mobile}></img>
      </Picture>
    </>
  )
}
