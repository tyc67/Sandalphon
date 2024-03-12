import { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
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
  position: relative;
  pointer-events: auto;
  border: 1px solid black;
  width: 272px;
  height: 264px;
  padding: 16px 24px 56px;
  border-radius: 4px;
  background: white;
  cursor: pointer;
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
  &:active {
    background: black;
    color: white;
  }
  @media (hover: hover) {
    &:hover {
      background: black;
      color: white;
    }
  }
`

const NewNoteButton = styled.button`
  outline: none;
  border: none;
  pointer-events: auto;
  position: absolute;
  right: 28px;
  bottom: 52px;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  &:active {
    background: rgba(93, 93, 93, 1);
  }
  @media (hover: hover) {
    &:hover {
      transform: translate(-2px, -2px);
    }
  }
  @media (min-width: 744px) {
    right: 72px;
    bottom: 28px;
  }
`

const EditSvg = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5644 1.43493C25.7214 0.601081 24.5832 0.133362 23.3971 0.133362C22.2111 0.133362 21.0729 0.601081 20.2298 1.43493L2.94326 18.6747C2.24427 19.3789 1.75536 20.2638 1.53133 21.2301L0.157568 26.9132C0.12872 27.0248 0.125548 27.1414 0.148289 27.2544C0.17103 27.3674 0.219094 27.4738 0.288871 27.5656C0.358647 27.6573 0.448321 27.7321 0.551156 27.7843C0.653991 27.8364 0.767314 27.8646 0.882612 27.8667H1.07341L6.75928 26.4555C7.72613 26.2316 8.61146 25.7429 9.31601 25.0443L26.5644 7.76635C27.3987 6.92371 27.8666 5.78611 27.8666 4.60064C27.8666 3.41517 27.3987 2.27757 26.5644 1.43493ZM8.20937 23.9382C7.71319 24.426 7.09298 24.7689 6.41584 24.9298L1.9511 26.0359L3.01958 21.5734C3.18055 20.8966 3.52365 20.2767 4.01175 19.7808L20.039 3.76154L24.2366 7.95705L8.20937 23.9382ZM25.4959 6.6984L25.3433 6.85096L21.1457 2.65544L21.2983 2.50288C21.8549 1.94652 22.6099 1.63396 23.3971 1.63396C24.1843 1.63396 24.9393 1.94652 25.4959 2.50288C26.0526 3.05924 26.3653 3.81383 26.3653 4.60064C26.3653 5.38745 26.0526 6.14204 25.4959 6.6984Z"
      fill="black"
    />
  </svg>
)

export default function MobileNewNote() {
  const [noteContent, setNoteContent] = useState('')
  const [addingCompleted, setAddingCompleted] = useState(false)
  const isStickyNotesExpanded = useAppSelector(
    (state) => state.stickyNote.expandMode
  )
  const emptyStickyNotes = useAppSelector(
    (state) => state.stickyNote.emptyStickyNotes
  )
  const newNote = useAppSelector((state) => state.stickyNote.newNote)
  const fixedMode = newNote.show
  const textAreaRef = useRef(null)
  const dispatch = useAppDispatch()

  const openFixedNewNote = () => {
    dispatch(
      stickyNoteActions.changeNewNote({ show: true, note: emptyStickyNotes[0] })
    )
  }

  const closeFixedNewNote = () => {
    dispatch(stickyNoteActions.resetNewNote())
    setNoteContent('')
    setAddingCompleted(false)
  }

  useEffect(() => {
    if (fixedMode && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [fixedMode])

  const buttonsJsx = (() => {
    if (!addingCompleted) {
      return (
        <ButtonWrapper>
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
          {!isStickyNotesExpanded && (
            <Button
              onClick={() => {
                closeFixedNewNote()
                dispatch(stickyNoteActions.changeExpandMode(true))
                setTimeout(() => {
                  // todo: 改成滑動到剛新增的 note 上
                  document
                    .querySelector('#sticky-notes-top')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
              }}
            >
              前往留言板
            </Button>
          )}
          <Button
            onClick={() => {
              closeFixedNewNote()
            }}
          >
            關閉
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
          <NewNoteButton
            onClick={(e) => {
              e.stopPropagation()
              openFixedNewNote()
            }}
          >
            {EditSvg}
          </NewNoteButton>
          {fixedMode && (
            <NewNoteWrapper
              onClick={(e) => {
                e.stopPropagation()
              }}
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
          )}
        </Wrapper>
      </FixedLayer>
    </>
  )
}
