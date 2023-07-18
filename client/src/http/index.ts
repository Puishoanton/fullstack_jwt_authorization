import axios from 'axios'
import { TUserResponse } from '../models/TUser'

export const API_URL = 'http://localhost:5000/api'

export const $api = axios.create({ withCredentials: true, baseURL: API_URL })

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const orgignalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      orgignalRequest._isRetry = true
      try {
        const response = await axios.get<TUserResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(orgignalRequest)
      } catch (e) {
        console.log('Unauthorized')
      }
    }
    throw error
  }
)

export default $api
