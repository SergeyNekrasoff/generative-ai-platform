import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'AccountPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/account',
  component: () => import('@/pages/account'),
  meta: {
    head: 'ACCOUNT'
  }
}
