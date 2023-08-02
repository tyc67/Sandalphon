import styled from 'styled-components'

import Image from 'next/image'
const Picture = styled.picture`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding-top: 75%; //fallback for aspect-ratio
`

type CoverImageProps = {
  name: string
  imagesSrc: {
    desktop: string
    tablet: string
    mobile: string
    desktopWebP: string
    tabletWebP: string
    mobileWebP: string
  }
}

export default function CoverImage({
  name,
  imagesSrc,
}: CoverImageProps): JSX.Element {
  return (
    <Picture>
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
