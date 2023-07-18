import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/AuthSlice'
import usersSlice from './reducers/UsersSlice'

const rootReducer = combineReducers({
  authSlice,
  usersSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
