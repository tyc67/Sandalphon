import styled from 'styled-components'

// import Image from 'next/image'

import { css } from 'styled-components'

const pictureCoverCSS = css`
  position: relative;
  display: block;
  width: 100%;
  height: fit-content;
`
const pictureContentCSS = css<{ isFullSizeImage: boolean }>`
  position: relative;
  display: block;
  img {
    width: 100%;
    height: fit-content;
    object-fit: ${({ isFullSizeImage }) =>
      isFullSizeImage ? 'initial' : 'cover'};
    max-width: ${({ isFullSizeImage }) =>
      isFullSizeImage ? 'initial' : '600px'};
    margin: 0 auto;
  }
`
const Picture = styled.picture<{
  type: 'cover' | 'content'
  isFullSizeImage: boolean
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
}

export default function ArticleImage({
  name,
  type = 'content',
  imagesSrc,
  isFullSizeImage = true,
}: CoverImageProps): JSX.Element {
  return (
    <>
      <Picture type={type} isFullSizeImage={isFullSizeImage}>
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
