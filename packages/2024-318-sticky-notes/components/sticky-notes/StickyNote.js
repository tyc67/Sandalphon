import { useRef } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'

const Wrapper = styled.div.attrs(
  /**
   * @param {Object} props
   * @param {string} props.bgColor
   * @param {string} props.rotateDegree
   * @returns
   */
  (props) => ({
    style: {
      background: props.bgColor,
      transform: `rotate(${props.rotateDegree}deg)`,
    },
  })
)`
  width: 136px;
  height: 136px;
  border-radius: 4px;
  pointer-events: auto;
`

/**
 * @typedef {import('../../data/mockData').RawNoteType | 'empty'} NoteType
 * @typedef {import('../../const/sticky-notes').StickyNoteColor} StickyNoteColor
 *
 * @typedef {Object} StickyNoteBgColor
 * @property {string} name
 * @property {string} code - css color syntax like '
 *
 * @typedef {Object} StickyNote
 * @property {string} id
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} fixed
 * @property {NoteType} type
 * @property {StickyNoteColor} color
 * @property {string} rotateAngle
 */

/**
 *
 * @param {Object} props
 * @param {StickyNote} props.stickyNote
 * @returns {JSX.Element}
 */
export default function StickeyNote({ stickyNote }) {
  const wrapperRef = useRef()
  const dispatch = useAppDispatch()

  const onNoteClicked = () => {
    dispatch(
      stickyNoteActions.changeFixedNote({
        show: true,
        note: stickyNote,
      })
    )
  }

  return (
    <Wrapper
      ref={wrapperRef}
      id={stickyNote.id}
      bgColor={stickyNote.color.code}
      rotateDegree={stickyNote.rotateAngle}
      onClick={onNoteClicked}
    ></Wrapper>
  )
}
