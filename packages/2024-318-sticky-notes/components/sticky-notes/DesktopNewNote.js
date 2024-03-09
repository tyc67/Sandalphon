import { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const FixedLayer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
  ${
    /**
     * @param {Object} props
     * @param {boolean} [props.fixedMode]
     */
    ({ fixedMode }) =>
      fixedMode &&
      `
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.66);
    pointer-events: auto;  
  `
  }
`

const Wrapper = styled.div`
  position: relative;
  top: 0;
  width: 375px;
  left: calc(50vw - (375px) / 2);
  height: 100vh;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
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
     * @param {boolean} props.fixedMode
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
  ${({ fixedMode }) =>
    fixedMode &&
    `
      transform: unset;
      position: relative;
      right: unset;
      bottom: unset;

  `}
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

const CompleteNote = styled.div`
  font-family: Noto Sans TC;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
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
  const [addingCompleted, setAddingCompleted] = useState(false)
  const isStickyNotesExpanded = useAppSelector(
    (state) => state.stickyNote.expandMode
  )
  const newNote = useAppSelector((state) => state.stickyNote.newNote)
  const fixedMode = newNote.show
  const desktopNewNoteRef = useRef(null)
  const textAreaRef = useRef(null)

  useClickOutside(desktopNewNoteRef, () => {
    if (!isStickyNotesExpanded) {
      setIsFolded(true)
    }
  })
  const dispatch = useAppDispatch()

  const closeFixedNewNote = () => {
    dispatch(
      stickyNoteActions.changeNewNote({
        show: false,
        note: null,
      })
    )
    setNoteContent('')
    setAddingCompleted(false)
  }

  useEffect(() => {
    if (isStickyNotesExpanded) {
      setIsFolded(false)
    } else {
      setIsFolded(true)
    }
  }, [isStickyNotesExpanded])

  useEffect(() => {
    if (fixedMode && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [fixedMode])

  const buttonsJsx = (() => {
    if (fixedMode) {
      return (
        <ButtonWrapper>
          {!addingCompleted && (
            <Button
              onClick={() => {
                // todo: send api
                setTimeout(() => {
                  setAddingCompleted(true)
                }, 500)
              }}
            >
              送出
            </Button>
          )}
          <Button
            onClick={() => {
              setTimeout(() => {
                closeFixedNewNote()
              }, 100)
            }}
          >
            關閉
          </Button>
        </ButtonWrapper>
      )
    } else {
      return (
        <ButtonWrapper>
          {!addingCompleted ? (
            <Button
              onClick={() => {
                // todo: send api
                setTimeout(() => {
                  setAddingCompleted(true)
                }, 500)
              }}
            >
              送出
            </Button>
          ) : !isStickyNotesExpanded ? (
            <Button
              onClick={() => {
                dispatch(stickyNoteActions.changeExpandMode(true))
                setTimeout(() => {
                  // todo: 改成滑動到剛新增的 note 上
                  document
                    .querySelector('#sticky-notes-top')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                setAddingCompleted(false)
                setNoteContent('')
              }}
            >
              前往留言板
            </Button>
          ) : (
            <></>
          )}

          <Button
            onClick={() => {
              setIsFolded(true)
              if (addingCompleted) {
                setAddingCompleted(false)
                setNoteContent('')
              }
            }}
          >
            收合
          </Button>
        </ButtonWrapper>
      )
    }
  })()

  return (
    <>
      {fixedMode && <GlobalStyle />}
      <FixedLayer
        fixedMode={fixedMode}
        onClick={() => {
          closeFixedNewNote()
        }}
      >
        <Wrapper>
          <NewNoteWrapper
            isFolded={isFolded}
            fixedMode={fixedMode}
            onClick={(e) => {
              e.stopPropagation()
              if (isFolded) {
                setIsFolded(false)
              }
            }}
            ref={desktopNewNoteRef}
          >
            {!addingCompleted ? (
              <TextArea
                placeholder={`在這裡輸入你的便利貼:           （若留言涉及惡意攻擊或廣告，管理者會逕行刪除。）`}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                maxLength={100}
                ref={textAreaRef}
              />
            ) : (
              <CompleteNote>送出成功！</CompleteNote>
            )}
            {buttonsJsx}
          </NewNoteWrapper>
        </Wrapper>
      </FixedLayer>
    </>
  )
}
