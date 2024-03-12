import styled from 'styled-components'
import StickeyNote from './StickyNote'

/**
 * @typedef {import('./StickyNote').StickyNote} StickyNote
 */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 20px;
`

/**
 *
 * @param {Object} props
 * @param {number} props.line
 * @param {StickyNote[]} props.stickyNotes
 * @returns {JSX.Element}
 */
export default function StickyNotesLine({ line, stickyNotes }) {
  return (
    <Wrapper>
      {stickyNotes.map((stickyNote, i) => (
        <StickeyNote
          position={{ line, index: i }}
          stickyNote={stickyNote}
          key={stickyNote.id}
        />
      ))}
    </Wrapper>
  )
}
