import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fixedStickyHeight } from '../../const/sticky-notes'
import StickyNotes from './StickyNotes'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'
import NewNote from './NewNote'
import FixedNote from './FixedNote'
import useRecaptcha from '../../hooks/useRecaptcha'
import { useStickyNotesInLines } from '~/hooks/useStickyNotes'
import gtag from '~/utils/gtag'

const TransformWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: ${fixedStickyHeight}px;
  bottom: 0;
  background: transparent;
  transition: transform 0.8s ease-in-out;
  pointer-events: none;
  transform: translateY(200%);

  ${
    /**
     *
     * @param {Object} props
     * @param {boolean} props.expandMode
     * @param {boolean} props.showStickyNotesPanel
     */
    ({ expandMode, showStickyNotesPanel }) => {
      if (showStickyNotesPanel) {
        return expandMode
          ? `
              position: relative;
              top: -${fixedStickyHeight}px;
              transform: translateY(${fixedStickyHeight}px);
              height: auto;
              bottom: unset;
            `
          : `transform: translateY(0);`
      }
    }
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

const EndDiv = styled.div`
  position: relative;
  top: -100px;
`

export default function TransformContainer() {
  const stickyNotesTop = useRef(null)
  const endRef = useRef(null)

  const expandMode = useAppSelector((state) => state.stickyNote.expandMode)
  const dispatch = useAppDispatch()
  const { verified } = useRecaptcha()
  const showStickyNotesPanel = useAppSelector(
    (state) => state.stickyNote.showStickyNotesPanel
  )

  useStickyNotesInLines(endRef)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      const isIntersection = entry.isIntersecting
      const targetTop = entry.target.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      // target below the screen
      if (!isIntersection && targetTop > windowHeight) {
        dispatch(stickyNoteActions.changeExpandMode(false))
      } // target shows on the bottom of the screen
      else if (isIntersection && targetTop > 0 && targetTop <= windowHeight) {
        dispatch(stickyNoteActions.changeExpandMode(true))
        gtag.sendGAEvent('scroll', {
          projects: `scroll to 便利貼`,
        })
      }
    })
    if (stickyNotesTop.current) {
      observer.observe(stickyNotesTop.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(stickyNoteActions.changeIsRecaptchaVerified(verified))
  }, [dispatch, verified])

  return (
    <>
      <div ref={stickyNotesTop} id="sticky-notes-top" />
      <TransformWrapper
        expandMode={expandMode}
        showStickyNotesPanel={showStickyNotesPanel}
      >
        <ContainWrapper>
          <StickyNotes />
        </ContainWrapper>
      </TransformWrapper>
      <FixedNote />
      <NewNote />
      <StickyNotesPlaceHolder expandMode={expandMode} />
      <EndDiv ref={endRef} id="end-of-sticky-notes" />
    </>
  )
}
