import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fixedStickyHeight } from '../../const/sticky-notes'
import StickyNotes from './StickyNotes'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'
import NewNote from './NewNote'

const TransformWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: ${fixedStickyHeight}px;
  bottom: 0;
  background: transparent;
  transition: transform 1s ease-in-out;
  pointer-events: none;

  ${
    /**
     *
     * @param {Object} props
     * @param {boolean} props.expandMode
     */
    ({ expandMode }) =>
      expandMode &&
      `
    position: relative;
    top: -${fixedStickyHeight}px;
    transform: translateY(${fixedStickyHeight}px);
    min-height: 90vh;
    height: auto;
    bottom: unset;
  `
  }
`

const StickyNotesPlaceHolder = styled.div`
  height: 100vh;
  ${
    /**
     * @param {Object} props
     * @param {boolean} props.expandMode
     */
    ({ expandMode }) =>
      expandMode &&
      `
      height: 0;
      
    `
  }
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
  const expandMode = useAppSelector((state) => state.stickyNote.expandMode)
  const dispatch = useAppDispatch()

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
        dispatch(stickyNoteActions.changeExpandMode(false))
      } // target shows on the bottom of the screen
      else if (isIntersection && targetTop > 0 && targetTop <= windowHeight) {
        console.log('target top shows the screen, set position: relative')
        dispatch(stickyNoteActions.changeExpandMode(true))
      }
    })
    if (divRef.current) {
      observer.observe(divRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [dispatch])

  return (
    <>
      <div ref={divRef} id="sticky-notes-top" />
      <StickyNotesPlaceHolder expandMode={expandMode} />
      <TransformWrapper expandMode={expandMode}>
        <ContainWrapper>
          <StickyNotes />
        </ContainWrapper>
      </TransformWrapper>
      <NewNote />
    </>
  )
}
