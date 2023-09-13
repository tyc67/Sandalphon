import styled from 'styled-components'
import Image from '@readr-media/react-image'
import { breakpoint } from '~/styles/theme'

const ImageBlock = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }

  ${breakpoint.md} {
    height: auto;
  }
`

type HeroImage = {
  mobile: string
  tablet: string
  desktop: string
}
type HeroImageProps = {
  heroImageSrc: HeroImage
}

export default function HeroImage({
  heroImageSrc = { mobile: '', tablet: '', desktop: '' },
}: HeroImageProps): JSX.Element {
  const formattedImgSrc = {
    original: heroImageSrc.desktop,
    w480: heroImageSrc.mobile,
    w800: heroImageSrc.tablet,
    w1200: heroImageSrc.desktop,
  }

  return (
    <ImageBlock>
      <Image
        images={formattedImgSrc}
        defaultImage={'/default-og-img.svg'}
        alt="forum-hero-image"
        objectFit={'cover'}
        priority={true}
      />
    </ImageBlock>
  )
}
