import { configureStore } from '@reduxjs/toolkit'
import stickyNoteReducer from './sticky-note-slice'

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**
 * @typedef  {typeof store.dispatch} AppDispatch
 */

const store = configureStore({
  reducer: { stickyNote: stickyNoteReducer },
})

export default store
