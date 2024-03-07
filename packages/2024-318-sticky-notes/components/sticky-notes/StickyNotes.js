import styled from 'styled-components'
import { useStickyNotesInLines } from '../../hooks/useStickyNotes'
import StickyNotesLine from './StickyNotesLine'
import { mockStickyNotes } from '../../data/mockData'

const Wrapper = styled.div`
  display: flex;
  // width: 320px;
  pointer-events: ;
  justify-content: center;

  @media (min-width: 744px) {
    width: 480px;
    padding-left: 49px;
    margin: unset;
  }
  @media (min-width: 1200px) {
    padding-left: 56px;
    width: 800px;
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
 *
 * @param {Object} props
 * @param {boolean} props.expandMode
 * @returns {JSX.Element}
 */
export default function StickyNotes({ expandMode }) {
  const stickyNotesInLines = useStickyNotesInLines(mockStickyNotes)

  return (
    <Wrapper expandMode={expandMode}>
      {stickyNotesInLines.map((stickeyNotesInLine, i) => (
        <StickyNotesLine key={i} stickyNotes={stickeyNotesInLine} />
      ))}
    </Wrapper>
  )
}
