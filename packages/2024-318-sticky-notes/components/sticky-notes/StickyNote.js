import { useRef } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'

/**
 * @typedef {import('~/data/mockData').RawNoteType | 'empty'} NoteType
 * @typedef {import('../../const/sticky-notes').StickyNoteColor} StickyNoteColor
 *
 * @typedef {Object} Position
 * @property {number} line
 * @property {number} index
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
 * @property {Position} position
 *
 * @typedef {'text' | 'empty' | 'image'} CardType
 */

// .attrs((props) => ({
//   style: {
//     background: props.backgroundColor,
//     transform: `rotate(${props.rotateDegree}deg)`,
//   },
// }))
const Wrapper = styled.div`
  position: relative;
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

  ${({ rotateDegree }) =>
    rotateDegree &&
    `
    transform: rotate(${rotateDegree}deg);
  `}

  ${
    /**
     * @param {Object} props
     * @param {string} props.backgroundColor
     * @param {string} props.rotateDegree
     * @param {CardType} props.cardType
     */
    ({ cardType, backgroundColor }) => {
      if (cardType === 'empty') {
        return `
          background: ${backgroundColor};
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
      } else if (cardType === 'image') {
        return `
          border-radius: unset;
          background: transparent;
        `
      } else if (cardType === 'text') {
        return `
          background: ${backgroundColor};
        `
      }
    }
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

const ImageCard = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

/**
 *
 * @param {Object} props
 * @param {StickyNote} props.stickyNote
 * @returns {JSX.Element}
 */
export default function StickeyNote({ stickyNote }) {
  const wrapperRef = useRef()
  const dispatch = useAppDispatch()

  const cardType =
    stickyNote.type === 'empty'
      ? 'empty'
      : stickyNote.imageUrl
      ? 'image'
      : 'text'

  const onNoteClicked = () => {
    if (stickyNote.type !== 'empty') {
      dispatch(
        stickyNoteActions.changeFixedNote({
          show: true,
          note: stickyNote,
        })
      )
    } else {
      dispatch(stickyNoteActions.showFixedNewNote(stickyNote))
    }
  }

  let cardJsx
  switch (cardType) {
    case 'empty':
    case 'text':
      cardJsx = <TextCard>{stickyNote.description}</TextCard>
      break
    case 'image':
      cardJsx = <ImageCard src={stickyNote.imageUrl} />
      break
    default:
      break
  }
  return (
    <Wrapper
      ref={wrapperRef}
      id={'id-' + stickyNote.id}
      backgroundColor={stickyNote.color.code}
      rotateDegree={stickyNote.rotateAngle}
      cardType={cardType}
      onClick={onNoteClicked}
    >
      {cardJsx}
    </Wrapper>
  )
}
