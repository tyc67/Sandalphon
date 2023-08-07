// import Lottie from 'lottie-react'
import styled from 'styled-components'
import { imagePrefix } from '../../config'
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
`

import { DotLottiePlayer } from '@dotlottie/react-player'
import '@dotlottie/react-player/dist/index.css'
export default function Landing() {
  return (
    <Wrapper>
      <DotLottiePlayer
        src={`${imagePrefix}/landing_v2.lottie`}
        autoplay
        loop
        renderer="html"
        style={{
          width: '600px',
          height: '500px',
          transform: 'scale(2.5)',
        }}
      ></DotLottiePlayer>
    </Wrapper>
  )
}
