import styled from 'styled-components'

import Image from 'next/image'

import { css } from 'styled-components'

const pictureCoverCSS = css`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding-top: 75%; //fallback for aspect-ratio
`
const pictureContentCSS = css<{ shouldObjectFitContain: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  padding-top: 75%; //fallback for aspect-ratio
  img {
    object-fit: ${({ shouldObjectFitContain }) =>
      shouldObjectFitContain ? 'contain' : 'initial'};
  }
`
const Picture = styled.picture<{
  type: 'cover' | 'content'
  shouldObjectFitContain: boolean
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

type CoverImageProps = {
  name: string
  type?: 'cover' | 'content'
  imagesSrc: {
    desktop: string
    tablet: string
    mobile: string
    desktopWebP: string
    tabletWebP: string
    mobileWebP: string
  }
  imageDirection?: 'horizontal' | 'vertical'
}

export default function ArticleImage({
  name,
  type = 'content',
  imagesSrc,
  imageDirection = 'horizontal',
}: CoverImageProps): JSX.Element {
  const shouldObjectFitContain = imageDirection === 'vertical'
  return (
    <>
      <Picture type={type} shouldObjectFitContain={shouldObjectFitContain}>
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

        <Image alt={name} src={imagesSrc.mobile} fill></Image>
      </Picture>
    </>
  )
}
