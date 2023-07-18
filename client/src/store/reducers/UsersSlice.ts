import { TUser } from '../../models/TUser'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TState = {
  users: TUser[]
}

const initialState: TState = {
  users: [] as TUser[],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    fetchUser(state, action: PayloadAction<TUser[]>) {
      state.users = action.payload
    },
  },
})

export const { fetchUser } = usersSlice.actions
export default usersSlice.reducer
