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
 * @property {FixedNote} fixedNote
 * @property {NewNote} newNote
 * @property {boolean} expandMode
 */

/** @type {StickyNoteState} */
const initialState = {
  fixedNote: {
    show: false,
    note: null,
  },
  newNote: {
    show: false,
    note: null,
  },
  expandMode: false,
}

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState,
  reducers: {
    changeFixedNote(state, action) {
      state.fixedNote = action.payload
    },
    changeNewNote(state, action) {
      state.newNote = action.payload
    },
    changeExpandMode(state, action) {
      state.expandMode = action.payload
    },
  },
})

export const stickyNoteActions = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
