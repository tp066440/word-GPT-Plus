import { defineStore } from 'pinia'
import ApiClient from '@/api/client'
import { ElMessage } from 'element-plus'

export type RootState = {
  user: any
  token: string | null
  isLoggedIn: boolean
}

export interface Auth {
  email: string
  password: string
  remember: boolean
}

export const checkLocalStorage = (
  key: string,
  defaultValue: any = null,
  json: boolean = true
) => {
  try {
    const item = localStorage.getItem(key)
    if (item) {
      return json ? JSON.parse(item) : item
    }
  } catch (error) {
    console.error(error)
  }
  return defaultValue
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: checkLocalStorage('user'),
      token: checkLocalStorage('token', null, false),
      isLoggedIn: checkLocalStorage('isLoggedIn', false)
    } as RootState),

  actions: {
    async logout (): Promise<void> {
      await ApiClient.post('/api/logout')
      this.user = null
      this.isLoggedIn = false
      this.token = null
    },
    async login (payload: Auth): Promise<void> {
      try {
        await ApiClient.get('/sanctum/csrf-cookie')
        const { data } = await ApiClient.post('/api/login', payload)

        console.log(data)
        this.isLoggedIn = true
        this.token = data.accessToken
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('isLoggedIn', 'true')
      } catch (error: any) {
        ElMessage.error(error.message || 'Login Failed')
      }
    }
  }
})
