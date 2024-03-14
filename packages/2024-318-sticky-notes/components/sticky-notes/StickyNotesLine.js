import styled from 'styled-components'
import StickeyNote from './StickyNote'
import { useAppSelector } from '~/hooks/useRedux'

/**
 * @typedef {import('./StickyNote').StickyNote} StickyNote
 */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 20px;
  transition: padding-top 1s ease-in-out;
  ${
    /**
     * @param {Object} props
     * @param {boolean} props.expandMode
     */
    ({ expandMode }) =>
      expandMode
        ? `
          &:nth-child(2) {
            padding-top: 83px;
          }
          &:nth-child(3) {
            padding-top: 5px;
          }
          &:nth-child(4) {
            padding-top: 219px;
          }
          &:nth-child(5) {
            padding-top: 146px;
          }
      `
        : `
        @media (max-width: 743px) {
          &:nth-child(2) > *:nth-child(1) {
            opacity: 0;
            pointer-events: none;
          }
        }
      `
  }
`

/**
 *
 * @param {Object} props
 * @param {StickyNote[]} props.stickyNotes
 * @returns {JSX.Element}
 */
export default function StickyNotesLine({ stickyNotes }) {
  const expandMode = useAppSelector((state) => state.stickyNote.expandMode)
  return (
    <Wrapper expandMode={expandMode}>
      {stickyNotes.map((stickyNote) => (
        <StickeyNote stickyNote={stickyNote} key={stickyNote.id} />
      ))}
    </Wrapper>
  )
}
