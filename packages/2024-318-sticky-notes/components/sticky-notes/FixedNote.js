import styled, { createGlobalStyle } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'

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
     */
    ({ bgColor }) =>
      bgColor &&
      `
      background-color: ${bgColor};
    `
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

/**
 * @returns {JSX.Element}
 */
export default function FixedNote() {
  const expandMode = useAppSelector((state) => state.stickyNote.expandMode)
  const stickyNote = useAppSelector((state) => state.stickyNote.fixedNote.note)
  const dispatch = useAppDispatch()
  const stickyNoteColor = stickyNote.color.code

  const closeFixedNote = () => {
    dispatch(
      stickyNoteActions.changeFixedNote({
        show: false,
        note: null,
      })
    )
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
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <TextCard>{stickyNote.description}</TextCard>
          <ButtonWrapper>
            {!expandMode && (
              <Button
                color={stickyNoteColor}
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
              color={stickyNoteColor}
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
