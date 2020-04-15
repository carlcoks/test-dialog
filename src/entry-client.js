import Vue from 'vue'
import 'babel-polyfill'
import 'es6-promise/auto'

import { vueTopprogress } from 'vue-top-progress'
import { createApp } from './main'
import { createAsyncDataGuard } from './router/guards'

const progressBar = new Vue({
  ...vueTopprogress,
  propsData: { color: 'red', height: 2 },
}).$mount()

const state = window.__INITIAL_STATE__
const { app, router, store } = createApp({ state })

router.onReady(() => {
  router.beforeResolve(createAsyncDataGuard(store, router, progressBar))
  document.body.appendChild(progressBar.$el)
  app.$mount('#app')
})
