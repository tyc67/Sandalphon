import styled from 'styled-components'
import Image from '@readr-media/react-image'
import { breakpoint } from '~/styles/theme'
import { imagePrefix } from '~/config'
import type { FormattedHeroImage } from '~/types'
import useWindowDimensions from '~/hook/use-window-dimensions'

const ImageBlock = styled.div`
  width: 100%;
  height: calc(100vh - 53px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
  /* .readr-media-react-image {
    object-fit: contain !important;
  } */

  ${breakpoint.md} {
    height: auto;
  }
`

type HeroImageProps = {
  heroImageSrc: FormattedHeroImage
}

export default function HeroImage({
  heroImageSrc = { mobile: '', tablet: '', desktop: '' },
}: HeroImageProps): JSX.Element {
  const windowDimensions = useWindowDimensions()

  // FIXME: 這邊要重構，避免太多 if
  let selectedImageSrc = ''

  if (windowDimensions?.width) {
    if (windowDimensions?.width >= 1200) {
      selectedImageSrc = heroImageSrc.desktop
    } else if (windowDimensions?.width >= 768) {
      selectedImageSrc = heroImageSrc.tablet
    } else {
      selectedImageSrc = heroImageSrc.mobile
    }
  }

  return (
    <ImageBlock>
      <Image
        images={{ original: selectedImageSrc }}
        alt="forum-hero-image"
        objectFit={'contain'}
        priority={true}
        defaultImage={`${imagePrefix}/images/default-hero-image-bg.svg`}
      />
    </ImageBlock>
  )
}
