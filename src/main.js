import './extensions/array'
import './extensions/object'
import './plugins/global-components'

import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import Meta from 'vue-meta'

import App from './App'
import { createRouter } from './router'
import { createStore } from './store'

Vue.use(Meta)

import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

export default {}

export function createApp(context) {
  const store = createStore(context)
  const router = createRouter(store)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  return { app, router, store }
}
