import type { RootState } from '../../store'

export const selectIsLogined = (state: RootState) => state.userData.isLogined

export const selectUid = (state: RootState) => state.userData.uid

export const selectToken = (state: RootState) => state.userData.token

export const selectPurchasedClassIDs = (state: RootState) =>
  state.userData.purchasedClassIDs
