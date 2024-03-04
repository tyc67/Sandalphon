import { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const fixedHeight = 200
const GlobalStyle = createGlobalStyle`
  body{
    background:  blue;
  }
`

const MockArticle = styled.div`
  background: blue;

  overflow: hidden;
`

const MockArticle2 = styled.div`
  background: blue;
  height: 150vh;
`

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

function VersionA() {
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
      <GlobalStyle />
      <MockArticle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? saepe
        quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam
      </MockArticle>
      <div ref={divRef} />
      <StickyNotesA expandMode={expandMode}>
        <Card />
      </StickyNotesA>
      <MockArticle2 />
    </>
  )
}

const StickyNotesB = styled.div`
  position: fixed;
  width: 100%;
  height: ${fixedHeight}px;
  bottom: 0;
  background: transparent;

  ${({ expandMode }) =>
    expandMode &&
    `
    position: relative;
    min-height: 90vh;
    height: auto;
    bottom: unset;
  `}
`

const PlaceHolder1 = styled.div`
  position: relative;
  height: ${fixedHeight}px;
  background: blue;
  ${({ expandMode }) =>
    expandMode &&
    `
    display: none;
  `}
`

const IBTarget1 = styled.div`
  position: absolute;
  bottom: 0;
`

const PlaceHolder2 = styled.div`
  position: absolute;
  top: 0;
  height: ${fixedHeight}px;
  display: none;
  background: transparent;
  ${({ expandMode }) =>
    expandMode &&
    `
    display: block;
  `}
`

const IBTarget2 = styled.div`
  position: absolute;
  bottom: 0;
`

function VersionB() {
  const [expandMode, setExpandMode] = useState(false)
  const div1Ref = useRef()
  const div2Ref = useRef()

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
    if (div1Ref.current) {
      observer.observe(div1Ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

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
          'target2 below the screen, set position: fixed to the bottom'
        )
        setExpandMode(false)
      }
    })
    if (div2Ref.current) {
      observer.observe(div2Ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <>
      <GlobalStyle />
      <MockArticle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
        expedita eum quia ab accusamus, saepe quam tenetur, voluptatem esse
        consequatur quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi, enim debitis unde ratione a assumenda beatae
        laboriosam expedita eum quia ab accusamus, saepe quam tenetur,
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        debitis unde ratione a assumenda beatae laboriosam expedita eum quia ab
        accusamus, saepe quam tenetur, voluptatem esse consequatur quisquam?
        Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
        enim debitis unde ratione a assumenda beatae laboriosam expedita eum
        quia ab accusamus, saepe quam tenetur, voluptatem esse consequatur
        quisquam? Aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Modi, enim debitis unde ratione a assumenda beatae laboriosam
      </MockArticle>
      <PlaceHolder1 expandMode={expandMode}>
        <IBTarget1 ref={div1Ref} />
      </PlaceHolder1>
      <StickyNotesB expandMode={expandMode}>
        <PlaceHolder2 expandMode={expandMode}>
          <IBTarget2 ref={div2Ref} />
        </PlaceHolder2>
        <Card />
      </StickyNotesB>
      <MockArticle2 />
    </>
  )
}

export default VersionA
export { VersionA, VersionB }
