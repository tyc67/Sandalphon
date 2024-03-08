import styled, { createGlobalStyle } from 'styled-components'
import TransformContainer from '../components/sticky-notes/TransformContainer'
import { useAppSelector } from '../hooks/useRedux'
import FixedNote from '../components/sticky-notes/FixedNote'

const GlobalStyle = createGlobalStyle`
  body{
    background:  black;
    margin: 0;
  }
`

const MockArticle = styled.div`
  background: transparent;
  color: white;

  overflow: hidden;
`

export default function Home() {
  const fixedNote = useAppSelector((state) => state.stickyNote.fixedNote)

  return (
    <>
      <GlobalStyle />
      <MockArticle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, enim
        voluptatem esse consequatur quisquam? Aperiam? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Modi, enim debitis unde ratione a
        assumenda beatae laboriosam expedita eum quia ab accusamus, saepe quam
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
        dolor sit amet consectetur adipisicing elit. Modi, enim debitis unde
        ratione a assumenda beatae laboriosam expedita eum quia ab accusamus,
        saepe quam tenetur, voluptatem esse consequatur quisquam? Aperiam? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Modi, enim debitis
        unde ratione a assumenda beatae laboriosam expedita eum quia ab Aperiam?
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam saepe quam tenetur, voluptatem esse
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam saepe quam tenetur, voluptatem esse
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam Lorem ipsum dolor sit amet consectetur
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
        quia ab accusamus, saepe quam
      </MockArticle>
      <TransformContainer />
      {fixedNote.show && <FixedNote stickyNote={fixedNote.note} />}
    </>
  )
}
