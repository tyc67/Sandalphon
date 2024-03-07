import styled from 'styled-components'
import StickeyNote from './StickyNote'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 20px;
`

export default function StickyNotesLine({ stickyNotes }) {
  return (
    <Wrapper>
      {stickyNotes.map((stickyNote) => (
        <StickeyNote
          stickyNote={stickyNote}
          key={stickyNote.index + stickyNote.description}
        />
      ))}
    </Wrapper>
  )
}
