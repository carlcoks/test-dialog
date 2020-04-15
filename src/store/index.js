import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import * as TYPES from './types'
import * as actions from './actions'
import * as modules from './modules'

export function createStore(context) {
  const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    modules,
    actions,
    mutations
  })
  
  return store
}

export { TYPES }
