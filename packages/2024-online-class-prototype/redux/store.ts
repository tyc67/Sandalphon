import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './features/user/slice'

export const makeStore = () =>
  configureStore({
    reducer: {
      userData: userDataReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
