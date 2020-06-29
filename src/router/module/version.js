import Layout from '@/layout'

const VersionManage = {
  path: '/tabledata',
  component: Layout,
  redirect: '/tabledata/complex-table',
  name: 'gameManage',
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
    }
  ]
}

export default VersionManage
