import { TUserResponse } from '../../models/TUser'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TState = {
  isAuth: boolean
  user: TUserResponse
}

const initialState: TState = {
  isAuth: false,
  user: {} as TUserResponse,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    register(state, action: PayloadAction<TUserResponse>) {
      state.isAuth = true
      state.user = action.payload
    },
    login(state, action: PayloadAction<TUserResponse>) {
      state.isAuth = true
      state.user = action.payload
    },
    checkAuth(state, action: PayloadAction<TUserResponse>) {
      state.isAuth = true
      state.user = action.payload
    },
    logout(state) {
      state.isAuth = false
      state.user = {} as TUserResponse
    },
  },
})

export const { register, login, logout, checkAuth } = authSlice.actions
export default authSlice.reducer
