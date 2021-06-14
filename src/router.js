import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import { AppState } from '../src/AppState.js'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}
function isProfilePost(trueFalse) {
  AppState.isProfilePost = trueFalse
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: isProfilePost(false)
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: isProfilePost(true)
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
