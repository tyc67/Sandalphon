import { useState } from 'react'
import { InView } from 'react-intersection-observer'

export default function Detector() {
  const [isTopDetectorInView, setIsTopDetectorInView] = useState(false)

  return {
    state: !isTopDetectorInView,
    component: (
      <InView
        as="div"
        onChange={(inView) => {
          if (inView) {
            setIsTopDetectorInView(inView)
          }
        }}
        style={{
          position: 'absolute',
          zIndex: '1',
          height: '10px',
          width: '100%',
          top: '5vh',
          backgroundColor: 'transparent',
        }}
      ></InView>
    ),
  }
}
