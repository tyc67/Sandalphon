// import Lottie from 'lottie-react'
import styled from 'styled-components'
import { imagePrefix } from '../../config'
import { headerHeight } from '../../styles/shared-style'
import { breakpoint } from '../../styles/theme'
const Wrapper = styled.div`
  padding-top: ${headerHeight};
  width: 100%;
  height: 100%;
  overflow: hidden;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  .lottie {
    padding-top: calc(${headerHeight} / 2);
    margin: 48px auto 0;
    transform: scale(2.5);
    width: 100%;
    height: 100%;
  }
  ${breakpoint.sm} {
    .lottie {
      transform: scale(2);
    }
  }
  ${breakpoint.md} {
    .lottie {
      transform: scale(1.75);
    }
  }
  ${breakpoint.xl} {
    .lottie {
      transform: scale(1.25);
    }
  }
  ${breakpoint.xxl} {
    .lottie {
      transform: scale(1);
    }
  }
`

import { DotLottiePlayer } from '@dotlottie/react-player'
import '@dotlottie/react-player/dist/index.css'
export default function Landing() {
  return (
    <Wrapper>
      <DotLottiePlayer
        src={`${imagePrefix}/landing_v2.2.lottie`}
        autoplay
        loop
        className="lottie"
        renderer="html"
      ></DotLottiePlayer>
    </Wrapper>
  )
}
