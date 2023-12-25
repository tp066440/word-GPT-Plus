import { defineStore } from 'pinia'
import ApiClient from '@/api/client'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { localStorageKey } from '@/utils/constant'

export type RootState = {
  user: any
  token: string | null
  isLoggedIn: boolean
  balance: number | null
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
      isLoggedIn: checkLocalStorage('isLoggedIn', false),
      balance: checkLocalStorage('balance', 0)
    } as RootState),

  actions: {
    async logout (): Promise<void> {
      await ApiClient.post('/api/logout')
      this.user = null
      this.isLoggedIn = false
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      localStorage.removeItem('balance')
      localStorage.removeItem(localStorageKey.apiKey)
      router.push('/login')
    },
    async login (payload: Auth): Promise<void> {
      try {
        const { data } = await ApiClient.post('/api/login', payload)

        this.isLoggedIn = true
        this.token = data.accessToken
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/')
      } catch (error: any) {
        ElMessage.error(error.message || 'Login Failed')
      }
    },
    async getUser (): Promise<void> {
      try {
        const { data } = await ApiClient.get('/api/user')
        if (data) {
          this.user = data
          localStorage.setItem('user', JSON.stringify(data))
          const response = await ApiClient.post('/api/api_key')
          if (response.data && response.data.key) {
            localStorage.setItem(localStorageKey.apiKey, response.data.key)
          }
          this.checkBalance()
        }
      } catch (error: any) {
        ElMessage.error(error.message || 'User Not Found')
      }
    },
    async checkBalance (): Promise<void> {
      try {
        const { data } = await ApiClient.get('/api/check-balance')
        if (data && data.balance) {
          this.balance = data.balance
          localStorage.setItem('balance', JSON.stringify(data.balance))
        }
      } catch (error: any) {
        ElMessage.error(error.message || 'Something Went Wrong')
      }
    },
    async syncBalance (words: Number): Promise<void> {
      try {
        const { data } = await ApiClient.post('/api/update-balance', { words })
        if (data && data.balance) {
          this.balance = data.balance
          localStorage.setItem('balance', JSON.stringify(data.balance))
        }
      } catch (error: any) {
        ElMessage.error(error.message || 'Something Went Wrong')
      }
    }
  }
})
