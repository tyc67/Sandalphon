import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { useAppSelector } from '../../hooks/useRedux'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 375px;
  left: calc(50vw - (375px) / 2);
  height: 100vh;
  pointer-events: none;
  @media (min-width: 744px) {
    width: 744px;
    left: calc(50vw - (744px) / 2);
  }
  @media (min-width: 1200px) {
    width: 1200px;
    left: calc(50vw - (1200px) / 2);
  }
`

const NewNoteWrapper = styled.div`
  position: absolute;
  right: 28px;
  bottom: 24px;
  pointer-events: auto;
  border: 1px solid black;
  width: 272px;
  height: 264px;
  padding: 16px 24px 56px;
  border-radius: 4px;
  background: white;
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
  ${
    /**
     * @param {Object} props
     * @param {boolean} props.isFolded
     */
    ({ isFolded }) =>
      isFolded
        ? `
      transform: translateY(178px);
    `
        : `
      transform: translateY(0);
    `
  }
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-family: Noto Sans TC;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  border: none;
  cursor: pointer;
  resize: none;
  &::placeholder {
    color: rgba(194, 194, 194, 1);
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 16px;
  display: flex;
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
  background: white;
  color: black;
  cursor: pointer;
  border: 1px solid black;
  padding: 2px 16px;
  &:hover,
  &:active {
    background: black;
    color: white;
  }
`

export default function DesktopNewNote() {
  const [isFolded, setIsFolded] = useState(true)
  const [noteContent, setNoteContent] = useState('')
  const isStickyNotesExpanded = useAppSelector(
    (state) => state.stickyNote.expandMode
  )
  const desktopNewNoteRef = useRef(null)
  useClickOutside(desktopNewNoteRef, () => {
    if (!isStickyNotesExpanded) {
      setIsFolded(true)
    }
  })

  useEffect(() => {
    if (isStickyNotesExpanded) {
      setIsFolded(false)
    } else {
      setIsFolded(true)
    }
  }, [isStickyNotesExpanded])

  return (
    <Wrapper>
      <NewNoteWrapper
        isFolded={isFolded}
        onClick={() => {
          if (isFolded) {
            setIsFolded(false)
          }
        }}
        ref={desktopNewNoteRef}
      >
        <TextArea
          placeholder={`在這裡輸入你的便利貼:           （若留言涉及惡意攻擊或廣告，管理者會逕行刪除。）`}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          maxLength={100}
        />
        <ButtonWrapper>
          <Button>送出</Button>
          <Button
            onClick={() => {
              setIsFolded(true)
            }}
          >
            收合
          </Button>
        </ButtonWrapper>
      </NewNoteWrapper>
    </Wrapper>
  )
}
