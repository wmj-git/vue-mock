import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import TableManage from '@/router/module/table.js'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/* export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'video1',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  /!* TableManage*!/
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router*/

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      name: 'gameManage',
      redirect: '/dynamic-table',
      alwaysShow: true,
      meta: {
        title: '游戏管理',
        icon: 'component'
      },
      children: [
        {
          path: 'dynamic-table',
          component: () => import('@/views/tabledata/version-table'),
          name: '版本管理',
          meta: { title: '版本管理', icon: 'table' }
        },
        {
          path: 'drag-table',
          component: () => import('@/views/tabledata/drag-table'),
          name: '分享卡片',
          meta: { title: '分享卡片', icon: 'table' }
        },
        {
          path: 'sidebar-table',
          component: () => import('@/views/tabledata/sidebar-manage'),
          name: '侧边栏管理',
          meta: { title: '侧边栏管理', icon: 'table' }
        },
        {
          path: 'integral-wall',
          component: () => import('@/views/tabledata/Integral-wall'),
          name: '积分墙管理',
          meta: { title: '积分墙管理', icon: 'table' }
        },
        {
          path: 'custom-settings',
          component: () => import('@/views/tabledata/custom-settings'),
          name: '自定义配置',
          meta: { title: '自定义配置', icon: 'table' }
        },
        {
          path: 'share-video',
          component: () => import('@/views/tabledata/share-video'),
          name: '分享视频管理',
          meta: { title: '分享视频管理', icon: 'table' }
        },
        {
          path: 'event-name',
          component: () => import('@/views/tabledata/event-name'),
          name: '事件名称管理',
          meta: { title: '事件名称管理', icon: 'table' }
        },
        {
          path: 'lost-path',
          component: () => import('@/views/tabledata/lost-path'),
          name: '流失路径管理',
          meta: { title: '流失路径管理', icon: 'table' }
        },
        {
          path: 'custom-space',
          component: () => import('@/views/tabledata/custom-space'),
          name: '自定义空间',
          meta: { title: '自定义空间', icon: 'table' }
        },
        {
          path: 'source-manage',
          component: () => import('@/views/tabledata/source-manage'),
          name: '资源管理',
          meta: { title: '资源管理', icon: 'table' }
        },
        {
          path: 'game-manage',
          component: () => import('@/views/tabledata/game-manage'),
          name: '小游戏管理',
          meta: { title: '小游戏管理', icon: 'table' }
        }
      ]
    }
  ],
  mode: 'history' // 去除#号
})

