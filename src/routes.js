import { defineAsyncComponent } from 'vue'
import * as i18n_utils from '@/modules/components/i18n/src/utils'
import { defaultLocale } from '@/config.js'
import { i18n } from '@/main.js'
import { createWebHistory, createRouter } from 'vue-router'
import LabIndex from '@/apps/lab/IndexPage.vue'
import Login from '@/views/LoginPage.vue'
import Index from '@/views/IndexPage.vue'
import NotFound from '@/views/NotFound.vue'
import { loginGuard } from '@/modules/auth/plugins/auth'

const isLoginPageEnabled = import.meta.env.VITE_APP_IS_LOGIN_ENABLED

const routes = [
  {
    path: '/login',
    component: Login
  },

  {
    path: '/lab',
    component: LabIndex
  },

  {
    path: '/',
    component: Index,
    children: [
      {
        // Home will be rendered inside Index's <router-view>
        // when / is matched
        path: '',
        component: () => import(`@/views/HomePage.vue`)
      },
      {
        path: 'amend',
        component: defineAsyncComponent(() => import(`@/views/AmendPage.vue`))
      }
    ]
  },
  { path: '/:catchAll(.*)', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  // base: import.meta.env.BASE_URL,
  routes
})

// First `beforeEach` guard: Ensure a `lang` query parameter is always present in the URL
// This guard checks if the `lang` query parameter exists in the URL. If it's missing, it redirects the user to the same
// path but with a default language set as `lang`. If the provided `lang` parameter is invalid (not found in the list of available locales),
// it also redirects to the same path with the default language. If `lang` is valid, it sets the locale in `i18n` and allows navigation to continue.
router.beforeEach((to, from, next) => {
  // Check if `lang` is already in the URL
  if (!to.query.lang) {
    // If `lang` is missing, redirect with the default locale
    next({
      path: to.path,
      query: { ...to.query, lang: i18n.global.locale.value }
    })
  } else {
    const urlLocaleCode = to.query.lang
    const isLocaleValid = i18n_utils.isLocaleInLocalesFolder(
      i18n.global.availableLocales,
      urlLocaleCode
    )

    // If `lang` is not valid, redirect with the default locale
    if (!isLocaleValid) {
      next({
        path: to.path,
        query: { ...to.query, lang: defaultLocale }
      })
    } else {
      next() // Proceed if `lang` is already valid
    }
  }
})

if (isLoginPageEnabled === 'true') {
  let loginPath = routes[0].path
  // Second `beforeEach` guard: Login authorization guard
  // This guard checks if the user is authorized to access certain routes, redirecting them to the login page if not authenticated.
  // It leverages the `loginGuard` function, which encapsulates the logic for determining if a user should be redirected based on the current authentication state.
  router.beforeEach(loginGuard(loginPath))
}

export default router
