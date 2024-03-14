import { createSlice } from '@reduxjs/toolkit'
import {
  initializeDisplayStickyNotes,
  refillDisplayStickyNotes,
} from '~/utils/stikcy-notes'

/**
 * @typedef {import('~/data/mockData').RawStickyNote} RawStickyNote
 * @typedef {import('../components/sticky-notes/StickyNote').StickyNote} StickyNote
 *
 * @typedef {Object} FixedNote
 * @property {boolean} show
 * @property {StickyNote} note
 *
 * @typedef {Object} NewNote
 * @property {boolean} show
 * @property {StickyNote} note
 *
 * @typedef {Object} StickyNoteState
 * @property {RawStickyNote[]} rawStickyNotes
 * @property {StickyNote[][]} stickyNotesInLines
 * @property {StickyNote[]} emptyStickyNotes
 * @property {FixedNote} fixedNote
 * @property {NewNote} newNote
 * @property {boolean} expandMode
 * @property {boolean} isRecaptchaVerified
 * @property {number} randomEmptyNoteInsertIndex
 */

/** @type {NewNote} */
const initialNewNote = {
  show: false,
  note: null,
}

/** @type {StickyNoteState} */
const initialState = {
  rawStickyNotes: [],
  stickyNotesInLines: [],
  emptyStickyNotes: [],
  fixedNote: {
    show: false,
    note: null,
  },
  newNote: initialNewNote,
  expandMode: false,
  isRecaptchaVerified: false,
  randomEmptyNoteInsertIndex: null,
}

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState,
  reducers: {
    initialStickyNotes(state, action) {
      const { rawStickyNotes, device } = action.payload

      const { stickyNotesLines, emptyStickyNotes, randomEmptyNoteInsertIndex } =
        initializeDisplayStickyNotes(rawStickyNotes, device)

      state.rawStickyNotes = rawStickyNotes
      state.stickyNotesInLines = stickyNotesLines
      state.emptyStickyNotes = emptyStickyNotes
      state.randomEmptyNoteInsertIndex = randomEmptyNoteInsertIndex
    },
    appendStickyNotes(state, action) {
      const { newRawStickyNotes, device } = action.payload
      const { stickyNotesLines, emptyStickyNotes } = refillDisplayStickyNotes(
        state.stickyNotesInLines,
        state.emptyStickyNotes,
        newRawStickyNotes,
        device,
        state.randomEmptyNoteInsertIndex
      )
      state.stickyNotesInLines = stickyNotesLines
      state.emptyStickyNotes = emptyStickyNotes
      state.rawStickyNotes = state.rawStickyNotes.concat(newRawStickyNotes)
    },
    stickyNoteAdded(state, action) {
      const { stickyNote } = action.payload
      const { position } = stickyNote
      state.stickyNotesInLines[position.line][position.index] = stickyNote
      state.emptyStickyNotes = state.emptyStickyNotes.filter(
        (emptyStickyNote) => emptyStickyNote.id !== stickyNote.id
      )
    },
    changeEmptyNotes(state, action) {
      state.emptyStickyNotes = action.payload
    },
    changeFixedNote(state, action) {
      state.fixedNote = action.payload
    },
    changeNewNote(state, action) {
      state.newNote = action.payload
    },
    resetNewNote(state) {
      state.newNote = initialNewNote
    },
    changeExpandMode(state, action) {
      state.expandMode = action.payload
    },
    changeIsRecaptchaVerified(state, action) {
      state.isRecaptchaVerified = action.payload
    },
  },
})

export const stickyNoteActions = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
