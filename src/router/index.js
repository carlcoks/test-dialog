import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => console.log('router', err))
}

const Index = () => import('../views/Index')

const Dialogs = () => import('../views/Dialogs')
const Messages = () => import('../views/Messages')

const NotFound = () => import('../views/NotFound')

Vue.use(Router)

export function createRouter(store) {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/dialogs',
        name: 'dialogs',
        component: Dialogs,
        children: [
          {
            path: ':id',
            component: Messages,
            props: true
          }
        ]
      },
      {
        path: '/404',
        name: 'notfound',
        component: NotFound
      },
      {
        path: '*',
        redirect: '/404'
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    next()
  })

  return router
}
