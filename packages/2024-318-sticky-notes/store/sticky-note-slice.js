import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef {import('../components/sticky-notes/StickyNote').StickyNote} StickyNote
 *
 * @typedef {Object} Position
 * @property {number} line
 * @property {number} index
 *
 * @typedef {StickyNote & {position: Position}} StickyNoteWithPosition
 *
 * @typedef {Object} FixedNote
 * @property {boolean} show
 * @property {StickyNote} note
 *
 * @typedef {Object} NewNote
 * @property {boolean} show
 * @property {StickyNoteWithPosition} note
 *
 * @typedef {Object} StickyNoteState
 * @property {StickyNote[][]} stickyNotesInLines
 * @property {StickyNoteWithPosition[]} emptyStickyNotes
 * @property {FixedNote} fixedNote
 * @property {NewNote} newNote
 * @property {boolean} expandMode
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
}

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState,
  reducers: {
    changeStickyNotesInLines(state, action) {
      state.stickyNotesInLines = action.payload
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
  },
})

export const stickyNoteActions = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
