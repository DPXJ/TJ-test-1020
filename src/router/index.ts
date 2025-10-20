import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Chat.vue'),
    meta: {
      title: 'AI视频混剪助手'
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/Chat.vue'),
    meta: {
      title: '对话'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/History.vue'),
    meta: {
      title: '历史记录'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：设置页面标题
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - AI视频混剪助手`
  }
  next()
})

export default router

