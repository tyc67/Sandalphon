import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'

// TODO: image-error 處理
const ImageBlock = styled.div<{ link: HeroImage }>`
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.link.mobile});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: ${(props) =>
    props.link.mobile ? 'transparent' : '#d9d9d9'};

  ${breakpoint.md} {
    max-height: 290px;
    background-image: url(${(props) => props.link.tablet});
    background-color: ${(props) =>
      props.link.tablet ? 'transparent' : '#d9d9d9'};
  }
  ${breakpoint.xl} {
    max-height: 450px;
    background-image: url(${(props) => props.link.desktop});
    background-color: ${(props) =>
      props.link.desktop ? 'transparent' : '#d9d9d9'};
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
  return <ImageBlock link={heroImageSrc} />
}
