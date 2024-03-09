import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef {import('../components/sticky-notes/StickyNote').StickyNote} StickyNote
 *
 * @typedef {Object} FixedNote
 * @property {boolean} show
 * @property {StickyNote} note
 *
 * @typedef {Object} StickyNoteState
 * @property {FixedNote} fixedNote
 * @property {boolean} expandMode
 */

/** @type {StickyNoteState} */
const initialState = {
  fixedNote: {
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
    changeExpandMode(state, action) {
      state.expandMode = action.payload
    },
  },
})

export const stickyNoteActions = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
