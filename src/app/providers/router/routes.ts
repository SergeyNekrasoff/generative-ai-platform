import { HomeLayout } from '@/shared/ui/layouts'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home')
  },
  //   {
  //     path: '/project/:id',
  //     component: () => import('@/pages/project')
  //   },
  //   {
  //     path: '/history',
  //     component: () => import('@/pages/history')
  //   },
  //   {
  //     path: '/account',
  //     name: 'account',
  //     component: () => import('@/pages/account')
  //   },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/not-found'),
    meta: {
      layout: HomeLayout
    }
  }
]
