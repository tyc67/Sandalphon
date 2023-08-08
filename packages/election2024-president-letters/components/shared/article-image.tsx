import styled from 'styled-components'
import { breakpoint } from '../../styles/theme'

// import Image from 'next/image'
import ImageCaption from './image-caption'
import { css } from 'styled-components'
import { headerHeight } from '../../styles/shared-style'
const pictureCoverCSS = css`
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  img {
    width: 100vw;
    height: calc(40vh + ${headerHeight});
    /* max-height: 60vh; */
    object-fit: cover;
  }
  ${breakpoint.xl} {
    max-height: 450px;
    width: 600px;
    height: 450px;
    img {
      height: 450px;
    }
  }
  ${breakpoint.xxl} {
    width: 720px;
    height: 540px;
  }
  /* max-height: 512px; */
`
const pictureContentCSS = css<{
  isFullSizeImage: boolean
  shouldRespectImageWightAndHeight: boolean
}>`
  position: relative;
  display: block;
  margin: 0 auto;
  img {
    width: 100%;
    height: ${({ shouldRespectImageWightAndHeight, isFullSizeImage }) => {
      if (!isFullSizeImage || shouldRespectImageWightAndHeight) {
        return 'auto'
      }
      return '75vw'
    }};
    object-fit: cover;
    max-width: ${({ isFullSizeImage }) => (isFullSizeImage ? '100%' : '480px')};

    margin: 0 auto;
    ${breakpoint.xl} {
      width: ${({ shouldRespectImageWightAndHeight, isFullSizeImage }) => {
        if (!isFullSizeImage || shouldRespectImageWightAndHeight) {
          return 'auto'
        }
        return '100vw'
      }};
      height: ${({ shouldRespectImageWightAndHeight, isFullSizeImage }) => {
        if (!isFullSizeImage || shouldRespectImageWightAndHeight) {
          return 'auto'
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
const Figure = styled.figure<{ type: 'cover' | 'content' }>`
  margin-bottom: ${({ type }) => (type === 'content' ? '24px' : 'unset')};
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  ${breakpoint.xl} {
    margin-right: ${({ type }) => (type === 'content' ? 'auto' : '0')};
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
type CoverImageProps = {
  name: string
  type?: 'cover' | 'content'
  imagesSrc: ImagesSrc
  isFullSizeImage?: boolean
  shouldRespectImageWightAndHeight?: boolean
  imageCaption?: string
}

export default function ArticleImage({
  name,
  type = 'content',
  imagesSrc,
  isFullSizeImage = true,
  shouldRespectImageWightAndHeight = false,
  imageCaption = '',
}: CoverImageProps): JSX.Element {
  const hasImageCaption = !!imageCaption
  return (
    <Figure type={type}>
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

        <img
          alt={hasImageCaption ? imageCaption : name}
          src={imagesSrc.mobile}
        ></img>
      </Picture>
      {hasImageCaption && <ImageCaption>{imageCaption}</ImageCaption>}
    </Figure>
  )
}
