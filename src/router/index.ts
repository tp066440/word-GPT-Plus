import { createMemoryHistory, createRouter } from 'vue-router'
import { useUserStore } from '@/store/authStore'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: 'home' */ '../pages/HomePage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: 'login' */ '../pages/LoginPage.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () =>
        import(/* webpackChunkName: 'settings' */ '../pages/SettingsPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const authUser = store.user
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (reqAuth && !authUser) {
    next(loginQuery)
  } else {
    next() // make sure to always call next()!
  }
})

export default router
