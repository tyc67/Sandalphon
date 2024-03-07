import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { fixedStickyHeight } from '../../const/sticky-notes'
import StickyNotes from './StickyNotes'

const TransformWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: ${fixedStickyHeight}px;
  bottom: 0;
  background: transparent;
  transition: transform 0.8s ease-in-out;
  pointer-events: none;

  ${({ expandMode }) =>
    expandMode &&
    `
    position: relative;
    top: -${fixedStickyHeight}px;
    transform: translateY(${fixedStickyHeight}px);
    min-height: 90vh;
    height: auto;
    bottom: unset;
  `}
`

const ContainWrapper = styled.div`
  width: 375px;
  margin: 0 auto;
  @media (min-width: 744px) {
    width: 744px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
`

export default function TransformContainer() {
  const [expandMode, setExpandMode] = useState(false)
  const divRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      const isIntersection = entry.isIntersecting
      const targetTop = entry.target.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      console.log({ isIntersection, windowHeight, targetTop })

      // target below the screen
      if (!isIntersection && targetTop > windowHeight) {
        console.log(
          'target below the screen, set position: fixed to the bottom'
        )
        setExpandMode(false)
      } // target shows on the bottom of the screen
      else if (isIntersection && targetTop > 0 && targetTop <= windowHeight) {
        console.log('target top shows the screen, set position: relative')
        setExpandMode(true)
      }
    })
    if (divRef.current) {
      observer.observe(divRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={divRef} />
      <TransformWrapper expandMode={expandMode}>
        <ContainWrapper>
          <StickyNotes expandMode={expandMode} />
        </ContainWrapper>
      </TransformWrapper>
    </>
  )
}
