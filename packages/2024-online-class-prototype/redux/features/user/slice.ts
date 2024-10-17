import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserData = {
  isLogined: boolean
  uid: string
  token: string
  purchasedClassIDs: string[]
}

const initialState: UserData = {
  isLogined: false,
  uid: '',
  token: '',
  purchasedClassIDs: [],
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetAll: () => initialState,
    setIsLogined: (state, action: PayloadAction<boolean>) => {
      state.isLogined = action.payload
    },
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setPurchasedClassIDs: (state, action: PayloadAction<string[]>) => {
      state.purchasedClassIDs = action.payload.sort()
    },
  },
})

export const {
  resetAll,
  setIsLogined,
  setUid,
  setToken,
  setPurchasedClassIDs,
} = userDataSlice.actions

export default userDataSlice.reducer
