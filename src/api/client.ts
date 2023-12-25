import axios from 'axios'
// @ts-ignore
import { useUserStore } from '@/store/authStore'
const API_URL: string = 'https://web.aiapp.gg'

export const ApiClient = axios.create({
  baseURL: API_URL
//   withCredentials: true // required to handle the CSRF token
})
// Add a request interceptor
ApiClient.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    const token = store.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/*
 * Add a response interceptor
 */
ApiClient.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const store = useUserStore()
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.user && store.isLoggedIn
    ) {
      store.logout()
    }
    return Promise.reject(error)
  }
)

export default ApiClient
