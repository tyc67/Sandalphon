import { useRef } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'

const Wrapper = styled.div.attrs((props) => ({
  style: {
    background: props.backgroundColor,
    transform: `rotate(${props.rotateDegree}deg)`,
  },
}))`
  width: 136px;
  height: 136px;
  border-radius: 4px;
  pointer-events: auto;
  padding: 12px 8px;
  cursor: pointer;
  &:active {
    scale: 1.088;
  }
  transition: scale 0.3s ease-in-out;

  @media (hover: hover) {
    &:hover {
      scale: 1.088;
    }
  }

  ${
    /**
     * @param {Object} props
     * @param {string} props.backgroundColor
     * @param {string} props.rotateDegree
     * @param {boolean} props.empty
     * @returns
     */
    ({ empty }) =>
      empty &&
      `
      box-shadow: 2px 2px 6px 0px rgba(255, 255, 255, 0.85);

      @keyframes scale {
        0% {
          scale: none;
        }
        50% {
          scale: 1.1;
        }
        100% {
          scale: none;
        }
      }

      animation: scale 2s infinite;

      &:active {
        scale: 1.1;
        animation: unset;
      }    
      @media (hover: hover) {
        &:hover {
          scale: 1.1;
          animation: unset;
        }
      }
        
  `
  }
`

const TextCard = styled.div`
  font-family: 'Noto Sans TC';
  font-weight: 350;
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
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

  const isEmptyCard = stickyNote.type === 'empty' && !stickyNote.description

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
      backgroundColor={stickyNote.color.code}
      rotateDegree={stickyNote.rotateAngle}
      empty={isEmptyCard}
      onClick={onNoteClicked}
    >
      <TextCard>{stickyNote.description}</TextCard>
    </Wrapper>
  )
}
