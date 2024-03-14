import styled, { createGlobalStyle } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'

/** @typedef {import('./StickyNote').CardType} CardType */

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.66);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
`

const Note = styled.div`
  position: relative;
  width: 272px;
  height: 264px;
  border-radius: 4px;
  padding: 24px 20px 48px;

  @media (min-width: 1200px) {
    width: 312px;
    height: 312px;
  }

  ${
    /**
     * @param {Object} props
     * @param {string} props.bgColor
     * @param {CardType} props.cardType
     */
    ({ bgColor, cardType }) => {
      if (cardType === 'image') {
        return 'background: transparent;'
      } else {
        return `background-color: ${bgColor};`
      }
    }
  }
`

const TextCard = styled.div`
  font-family: 'Noto Sans TC';
  font-weight: 350;
  font-size: 14px;
  line-height: 1.5;
`

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 12px;
  right: 20px;
  gap: 4px;
`

const Button = styled.button`
  outline: none;
  border-radius: 4px;
  display: flex;
  font-family: 'Noto Sans TC';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  background: black;
  cursor: pointer;
  border: 1px solid black;
  padding: 2px 8px;
  &:hover,
  &:active {
    background: rgba(70, 70, 70, 1);
  }
  ${
    /**
     *
     * @param {Object} props
     * @param {string} props.color
     */
    ({ color }) =>
      color &&
      `
    color: ${color};
  `
  }
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
 * @returns {JSX.Element}
 */
export default function FixedNote() {
  const expandMode = useAppSelector((state) => state.stickyNote.expandMode)
  const fixedNote = useAppSelector((state) => state.stickyNote.fixedNote)
  const { note: stickyNote, show } = fixedNote
  const dispatch = useAppDispatch()

  if (!show) {
    return null
  }
  const stickyNoteColor = stickyNote.color.code
  const cardType =
    stickyNote.type === 'empty'
      ? 'empty'
      : stickyNote.imageUrl
      ? 'image'
      : 'text'

  const btnColor = cardType === 'image' ? 'white' : stickyNoteColor

  const closeFixedNote = () => {
    dispatch(
      stickyNoteActions.changeFixedNote({
        show: false,
        note: null,
      })
    )
  }

  let cardJsx
  switch (cardType) {
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
    <>
      <GlobalStyle />
      <Wrapper
        onClick={() => {
          closeFixedNote()
        }}
      >
        <Note
          bgColor={stickyNoteColor}
          cardType={cardType}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {cardJsx}
          <ButtonWrapper>
            {!expandMode && (
              <Button
                color={btnColor}
                onClick={() => {
                  closeFixedNote()
                  dispatch(stickyNoteActions.changeExpandMode(true))
                  setTimeout(() => {
                    document
                      .querySelector('#sticky-notes-top')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  })
                }}
              >
                前往留言板
              </Button>
            )}
            <Button
              color={btnColor}
              onClick={() => {
                closeFixedNote()
              }}
            >
              關閉
            </Button>
          </ButtonWrapper>
        </Note>
      </Wrapper>
    </>
  )
}
