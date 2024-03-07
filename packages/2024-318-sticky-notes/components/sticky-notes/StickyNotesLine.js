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
 * @param {StickyNote[]} props.stickyNotes
 * @returns {JSX.Element}
 */
export default function StickyNotesLine({ stickyNotes }) {
  return (
    <Wrapper>
      {stickyNotes.map((stickyNote) => (
        <StickeyNote
          stickyNote={stickyNote}
          key={stickyNote.type + stickyNote.description}
        />
      ))}
    </Wrapper>
  )
}
