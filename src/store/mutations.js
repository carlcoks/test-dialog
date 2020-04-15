import * as TYPES from './types'

export default {
  [TYPES.SET_ERROR_RESPONSE](state, payload) {
    console.log('err response', payload)
    state.errorResponse = payload
  },

  [TYPES.CLEAN_ERROR_RESPONSE](state) {
    state.errorResponse = null
  },
}
