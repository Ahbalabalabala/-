import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Map'
  },
  {
    path: '/Map',
    name: 'Map',
    component: Map,
    children: [
      {
        path: '/Map/shopkeeper/:category',
        component: () => import('../views/around/Shopkeeper'),
      },
    ],
  },
  {
    path: '/Line',
    name: 'Line',
    component: () => import('../views/Line.vue'),
    redirect: '/Line/drive',
    children: [
      {
        path: '/Line/drive',
        component: () => import('../views/routemode/Drive'),

      }, {
        path: '/Line/transit',
        component: () => import('../views/routemode/Transit'),

      }, {
        path: '/Line/steps',
        component: () => import('../views/routemode/Steps'),

      }, {
        path: '/Line/riding',
        component: () => import('../views/routemode/Riding'),
      }
    ]
  },
  {
    path: '/Nearby',
    name: 'Nearby',
    component: () => import('../views/Nearby.vue'),
    redirect: '/Nearby/my',
    children: [
      {
        path: '/Nearby/my',
        component: () => import('../views/my/my'),
      },
      {
        path: '/Nearby/chat/:id',
        component: () => import('../views/my/chat'),
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'exact-active',
  linkActiveClass: 'active'

})

export default router
