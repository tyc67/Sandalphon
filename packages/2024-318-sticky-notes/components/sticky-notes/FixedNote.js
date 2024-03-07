import styled, { createGlobalStyle } from 'styled-components'
import { useAppDispatch } from '../../hooks/useRedux'
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
  width: 272px;
  height: 264px;

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
/**
 *
 * @param {Object} props
 * @param {import('./StickyNote').StickyNote} props.stickyNote
 * @returns {JSX.Element}
 */
export default function FixedNote({ stickyNote }) {
  const dispatch = useAppDispatch()
  return (
    <>
      <GlobalStyle />
      <Wrapper
        onClick={() => {
          console.log('gray shallow on cliced')
          dispatch(
            stickyNoteActions.changeFixedNote({
              show: false,
              note: null,
            })
          )
        }}
      >
        <Note bgColor={stickyNote.color.code} />
      </Wrapper>
    </>
  )
}
