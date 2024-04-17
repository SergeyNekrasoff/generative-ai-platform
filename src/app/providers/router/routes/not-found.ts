import type { RouteRecordRaw } from 'vue-router'
import { HomeLayout } from '@/shared/ui/layouts'

export const routeName = 'NotFoundPage'

export const route: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: routeName,
  component: () => import('@/pages/not-found'),
  meta: {
    head: 'NOT FOUND'
  }
}
