import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import $api, { API_URL } from '../../http'
import { TAuth } from '../../models/TAuth'
import { TUser, TUserResponse } from '../../models/TUser'
import { checkAuth, login, logout, register } from './AuthSlice'
import { fetchUser } from './UsersSlice'

export const registerAction = createAsyncThunk(
  'user/register',
  async ({ email, password }: TAuth, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.post<TUserResponse>('/register', { email, password })
      dispatch(register(response.data))
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)
export const loginAction = createAsyncThunk(
  'user/login',
  async ({ email, password }: TAuth, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.post<TUserResponse>('/login', { email, password })
      dispatch(login(response.data))
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)
export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
      dispatch(checkAuth(response.data))
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)
export const logoutAction = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await $api.post('/logout')
      dispatch(logout())
      localStorage.removeItem('token')
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)
export const getUsersAction = createAsyncThunk(
  'user/getUsers ',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.get<TUser[]>('/users')
      dispatch(fetchUser(response.data))
      return response.data
    } catch (e: any) {
      dispatch(fetchUser([]))
      return rejectWithValue(e)
    }
  }
)
