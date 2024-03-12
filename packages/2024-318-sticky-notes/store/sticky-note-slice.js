import { createSlice } from '@reduxjs/toolkit'

/**
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
 * @property {StickyNote[][]} stickyNotesInLines
 * @property {StickyNote[]} emptyStickyNotes
 * @property {FixedNote} fixedNote
 * @property {NewNote} newNote
 * @property {boolean} expandMode
 * @property {boolean} isRecaptchaVerified
 */

/** @type {NewNote} */
const initialNewNote = {
  show: false,
  note: null,
}

/** @type {StickyNoteState} */
const initialState = {
  stickyNotesInLines: [],
  emptyStickyNotes: [],
  fixedNote: {
    show: false,
    note: null,
  },
  newNote: initialNewNote,
  expandMode: false,
  isRecaptchaVerified: false,
}

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState,
  reducers: {
    changeStickyNotesInLines(state, action) {
      state.stickyNotesInLines = action.payload
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
