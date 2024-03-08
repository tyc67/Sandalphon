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
 */
const initialState = {
  fixedNote: {
    show: false,
    note: null,
  },
}

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState,
  reducers: {
    changeFixedNote(state, action) {
      state.fixedNote = action.payload
    },
  },
})

export const stickyNoteActions = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
