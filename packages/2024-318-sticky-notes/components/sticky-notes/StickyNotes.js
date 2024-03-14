import styled from 'styled-components'
import StickyNotesLine from './StickyNotesLine'
import { useAppSelector } from '../../hooks/useRedux'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 320px;
  pointer-events: ;
  justify-content: center;
  margin-bottom: 30px;

  @media (min-width: 744px) {
    width: 480px;
    padding-left: 49px;
    margin-bottom: 50px;
  }
  @media (min-width: 1200px) {
    padding-left: 56px;
    width: 800px;
    margin-bottom: 80px;
  }
  transition: padding-top 0.5s ease-in-out;

  ${
    /**
     * @param {Object} props
     * @param {boolean} props.expandMode
     */
    ({ expandMode }) =>
      expandMode
        ? `
          padding-top: 48px;
          @media (min-width: 744px) {
            padding-top: 63px;
          }
          @media (min-width: 1200px) {
            padding-top: 91px;
          }
        `
        : `
          padding-top: 0;
        `
  }
`

/**
 * @returns {JSX.Element}
 */
export default function StickyNotes() {
  const expandMode = useAppSelector((state) => state.stickyNote.expandMode)
  const stickyNotesInLines = useAppSelector(
    (state) => state.stickyNote.stickyNotesInLines
  )

  return (
    <>
      <Wrapper expandMode={expandMode}>
        {stickyNotesInLines.map((stickeyNotesInLine, i) => (
          <StickyNotesLine key={i} stickyNotes={stickeyNotesInLine} />
        ))}
      </Wrapper>
    </>
  )
}
