import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/auth/sign-in'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/merchant/index',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard' },
        hidden: true
      }
    ]
  },
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/index',
    name: 'MerchantManagement',
    meta: { title: '商户管理', icon: 'list' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/merchant/index'),
        name: 'MerchantIndex',
        meta: { title: '商户列表', icon: 'list', noCache: true }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/merchant/edit'),
        name: 'MerchantEdit',
        meta: { title: '编辑商户', activeMenu: '/merchant/index', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    redirect: '/products/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/products/index'),
        name: 'Products',
        meta: { title: '产品列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'Activity',
    meta: {
      title: '活动管理',
      icon: 'shopping'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/activity/index'),
        name: 'ActivityIndex',
        meta: { title: '活动列表', icon: 'list', noCache: true }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/activity/edit'),
        name: 'ActivityEdit',
        meta: { title: '编辑活动', activeMenu: '/activity/index' },
        hidden: true
      }
    ]
  },
  {
    path: '/shop-users',
    component: Layout,
    redirect: '/shop-users/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/shop-users/index'),
        name: 'ShopUsers',
        meta: { title: '商店用户', icon: 'user' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
