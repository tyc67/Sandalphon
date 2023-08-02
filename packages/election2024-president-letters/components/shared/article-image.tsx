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
const Picture = styled.picture<{ type: 'cover' | 'content' }>`
  ${({ type }) => {
    switch (type) {
      case 'cover':
        return pictureCoverCSS
      case 'content':
        return null //todo
      default:
        return null //todo
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
}

export default function ArticleImage({
  name,
  type = 'content',
  imagesSrc,
}: CoverImageProps): JSX.Element {
  return (
    <Picture type={type}>
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

      <Image src={imagesSrc.mobile} fill alt={name} />
    </Picture>
  )
}
