import Vue from 'vue'
import * as TYPES from './types'

export function setErrorResponse({ commit }, error) {
  if (error) {
    commit(TYPES.SET_ERROR_RESPONSE, error)
  } else {
    commit(TYPES.CLEAN_ERROR_RESPONSE)
  }
}
