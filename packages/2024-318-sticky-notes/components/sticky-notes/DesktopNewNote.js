import { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'
import { insertNewRowToSheet } from '../../api/googlesheet'

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

const ErrorNote = styled.div`
  font-family: Noto Sans TC;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(246, 57, 57, 1);
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
  &:disabled {
    background: rgba(180, 180, 180, 1);
    color: rgba(141, 141, 141, 1);
  }
`

export default function DesktopNewNote() {
  const [isFolded, setIsFolded] = useState(true)
  const [noteContent, setNoteContent] = useState('')
  const [addingResult, setAddingResult] = useState('')
  const [isRequestInFlight, setIsRequestInFlight] = useState(false)
  const isStickyNotesExpanded = useAppSelector(
    (state) => state.stickyNote.expandMode
  )
  const newNote = useAppSelector((state) => state.stickyNote.newNote)
  const emptyStickyNotes = useAppSelector(
    (state) => state.stickyNote.emptyStickyNotes
  )
  const isRecaptchaVerified = useAppSelector(
    (state) => state.stickyNote.isRecaptchaVerified
  )

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
    dispatch(stickyNoteActions.resetNewNote())
    setNoteContent('')
    setAddingResult('')
  }

  const onSubmit = () => {
    if (!isRecaptchaVerified) {
      setAddingResult('error')
      // show error hint
      return
    }
    if (isRequestInFlight || !noteContent) {
      return
    }

    let noteToAdd = newNote.note || emptyStickyNotes[0]
    noteToAdd = {
      ...noteToAdd,
      description: noteContent,
      type: 'user',
    }

    const newRow = {
      id: noteToAdd.id,
      time: new Date().toLocaleString(),
      text: noteToAdd.description,
      image: noteToAdd.imageUrl,
      promote: noteToAdd.fixed,
      type: noteToAdd.type,
    }
    insertNewRowToSheet(newRow)
      .then(() => {
        localStorage.addedNote = JSON.stringify([newRow])

        dispatch(
          stickyNoteActions.stickyNoteAdded({
            stickyNote: noteToAdd,
          })
        )

        setAddingResult('success')
      })
      .catch((e) => {
        setAddingResult('error')
        console.error(e)
      })
      .finally(() => {
        setIsRequestInFlight(false)
      })

    setIsRequestInFlight(true)
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
          {!addingResult && <Button onClick={onSubmit}>送出</Button>}
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
      let leftButtonJsx
      if (!addingResult) {
        leftButtonJsx = <Button onClick={onSubmit}>送出</Button>
      } else if (addingResult === 'success') {
        leftButtonJsx = !isStickyNotesExpanded ? (
          <Button
            onClick={() => {
              dispatch(stickyNoteActions.changeExpandMode(true))
              setTimeout(() => {
                // todo: 改成滑動到剛新增的 note 上
                document
                  .querySelector('#sticky-notes-top')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              })
              setAddingResult('')
              setNoteContent('')
            }}
          >
            前往留言板
          </Button>
        ) : (
          <></>
        )
      } else if (addingResult === 'error') {
        leftButtonJsx = <Button disabled>送出</Button>
      }
      return (
        <ButtonWrapper>
          {leftButtonJsx}
          <Button
            onClick={() => {
              setIsFolded(true)
              if (addingResult) {
                setAddingResult('')
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
            {!addingResult ? (
              <TextArea
                placeholder={`在這裡輸入你的便利貼:\n（若留言涉及惡意攻擊或廣告，管理者會逕行刪除。）`}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                maxLength={100}
                ref={textAreaRef}
              />
            ) : addingResult === 'success' ? (
              <CompleteNote>送出成功！</CompleteNote>
            ) : (
              <ErrorNote>新增失敗，請稍後再試</ErrorNote>
            )}
            {buttonsJsx}
          </NewNoteWrapper>
        </Wrapper>
      </FixedLayer>
    </>
  )
}
