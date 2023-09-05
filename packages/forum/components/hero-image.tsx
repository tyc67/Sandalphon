import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import useWindowDimensions from '~/hook/use-window-dimensions'

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

// TODO: image-error 圖片有問題的處理方式
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
      <img src={selectedImageSrc} alt="hero-image" />
    </ImageBlock>
  )
}
