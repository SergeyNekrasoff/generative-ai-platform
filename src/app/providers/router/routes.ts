import { HomeLayout } from '@/shared/ui/layouts'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home'),
    meta: {
      head: 'HOME'
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/projects'),
    meta: {
      head: 'PROJECTS'
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/chat'),
    meta: {
      head: 'CHAT'
    }
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import('@/pages/project'),
    meta: {
      head: 'PROJECT'
    }
  },
  {
    path: '/templates',
    name: 'templates',
    component: () => import('@/pages/templates'),
    meta: {
      head: 'TEMPLATES'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/pages/history'),
    meta: {
      head: 'HISTORY'
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account'),
    meta: {
      head: 'ACCOUNT'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/settings'),
    meta: {
      head: 'SETTINGS'
    }
  },
  {
    path: '/ui-kit',
    name: 'ui-kit',
    component: () => import('@/pages/ui-kit'),
    meta: {
      head: 'UI Kit'
    }
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/not-found'),
    meta: {
      layout: HomeLayout
    }
  }
]
