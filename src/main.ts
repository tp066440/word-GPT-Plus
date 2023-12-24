import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import router from './router'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

window.Office.onReady(() => {
  const app = createApp(App)
  const debounce = (fn: { apply: (arg0: any, arg1: IArguments) => void }, delay: number | undefined) => {
    let timer: any = null
    return function () {
      // @ts-ignore
      const context = this
      // eslint-disable-next-line prefer-rest-params
      const args = arguments as IArguments
      clearTimeout(timer as number)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }

  const _ResizeObserver = window.ResizeObserver
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor (callback: ResizeObserverCallback) {
      callback = debounce(callback, 16)
      super(callback)
    }
  }
  app.use(i18n)
  app.use(router)
  app.use(pinia)
  app.use(ElementUI)
  app.mount('#app')
})
