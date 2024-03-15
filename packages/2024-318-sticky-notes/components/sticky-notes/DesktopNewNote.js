import { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { stickyNoteActions } from '../../store/sticky-note-slice'
import { insertNewRowToSheet } from '../../api/googlesheet'
import {
  extractWordingWithKey,
  saveNewRowToLocalStorage,
} from '~/utils/sticky-notes'
import gtag from '~/utils/gtag'

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
  transition: transform 0.8s ease-in-out;
  cursor: pointer;
  transform: translateY(200%);
  ${
    /**
     * @param {Object} props
     * @param {boolean} props.isFolded
     * @param {boolean} props.fixedMode
     * @param {boolean} props.showStickyNotesPanel
     */
    ({ isFolded, showStickyNotesPanel }) => {
      if (showStickyNotesPanel) {
        return isFolded
          ? `
              transform: translateY(178px);
            `
          : `
              transform: translateY(0);
            `
      }
    }
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
  const showStickyNotesPanel = useAppSelector(
    (state) => state.stickyNote.showStickyNotesPanel
  )
  const wordings = useAppSelector((state) => state.stickyNote.wordings)
  const {
    show: fixedMode,
    note,
    content: noteContent,
    addingResult,
    isRequestInFlight,
  } = newNote

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
  }

  const onSubmit = () => {
    if (!isRecaptchaVerified) {
      // show error hint
      dispatch(stickyNoteActions.changeNewNoteAddingResult('error'))
      return
    }
    if (isRequestInFlight || !noteContent) {
      return
    }
    gtag.sendGAEvent('click', {
      projects: `便利貼-送出`,
    })

    let noteToAdd = note || emptyStickyNotes[0]
    noteToAdd = {
      ...noteToAdd,
      description: noteContent,
      type: 'user',
    }

    /** @type {import('~/data/mockData').RawStickyNote} */
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
        saveNewRowToLocalStorage(newRow)

        dispatch(
          stickyNoteActions.stickyNoteAdded({
            stickyNote: noteToAdd,
          })
        )

        if (fixedMode) {
          closeFixedNewNote()
        }
        dispatch(
          stickyNoteActions.changeFixedNote({
            show: true,
            note: noteToAdd,
            status: 'added',
          })
        )

        dispatch(stickyNoteActions.changeNewNoteAddingResult('success'))

        if (isStickyNotesExpanded) {
          document.querySelector(`#id-${noteToAdd.id}`).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          })
        }
      })
      .catch((e) => {
        dispatch(stickyNoteActions.changeNewNoteAddingResult('error'))
        console.error(e)
      })
      .finally(() => {
        dispatch(stickyNoteActions.changeNewNoteRequestInFlight(false))
      })
    dispatch(stickyNoteActions.changeNewNoteRequestInFlight(true))
  }

  useEffect(() => {
    if (isStickyNotesExpanded) {
      setIsFolded(false)
    } else {
      setIsFolded(true)
    }
  }, [isStickyNotesExpanded])

  useEffect(() => {
    if (fixedMode) {
      textAreaRef.current?.focus()
    }
  }, [fixedMode])

  const buttonsJsx = (() => {
    let leftButtonJsx = null
    if (!addingResult) {
      leftButtonJsx = (
        <Button onClick={onSubmit}>
          {extractWordingWithKey('submit', wordings) || '送出'}
        </Button>
      )
    } else if (addingResult === 'error') {
      leftButtonJsx = (
        <Button disabled>
          {extractWordingWithKey('submit', wordings) || '送出'}
        </Button>
      )
    }

    if (fixedMode) {
      return (
        <ButtonWrapper>
          {leftButtonJsx}
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
          {leftButtonJsx}
          <Button
            onClick={() => {
              setIsFolded(true)
            }}
          >
            {extractWordingWithKey('fold', wordings) || '收合'}
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
            showStickyNotesPanel={showStickyNotesPanel}
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
                placeholder={
                  extractWordingWithKey('placeholder', wordings) ||
                  `在這裡輸入你的便利貼：\n（若留言涉及惡意攻擊或廣告，管理者會逕行刪除。）`
                }
                value={noteContent}
                onChange={(e) =>
                  dispatch(
                    stickyNoteActions.changeNewNoteContent(e.target.value)
                  )
                }
                maxLength={100}
                ref={textAreaRef}
              />
            ) : addingResult === 'success' ? (
              <CompleteNote>
                {extractWordingWithKey('submit-success', wordings) ||
                  '送出成功！'}
              </CompleteNote>
            ) : (
              <ErrorNote>
                {extractWordingWithKey('submit-fail', wordings) ||
                  '新增失敗，請稍後再試'}
              </ErrorNote>
            )}
            {buttonsJsx}
          </NewNoteWrapper>
        </Wrapper>
      </FixedLayer>
    </>
  )
}
