import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { fixedHeight } from '../../const/sticky-notes'

const StickyNotesA = styled.div`
  position: fixed;
  width: 100%;
  height: ${fixedHeight}px;
  bottom: 0;
  background: transparent;
  transition: transform 1s ease-in-out;

  ${({ expandMode }) =>
    expandMode &&
    `
    position: relative;
    top: -${fixedHeight}px;
    transform: translateY(${fixedHeight}px);
    min-height: 90vh;
    height: auto;
    bottom: unset;
  `}
`

const Card = styled.div`
  position: absolute;
  top: 30px;
  left: 150px;
  height: 150px;
  width: 150px;
  border: 2px solid black;
  transform: rotate(84deg);
  background: white;
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
      <StickyNotesA expandMode={expandMode}>
        <Card />
      </StickyNotesA>
    </>
  )
}
