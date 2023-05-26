import {includes} from 'lodash'
import {tokenSelector, tempTokenSelector} from './selectors'

const AUTH_CHECK_METHODS = ['post', 'put', 'patch', 'delete', 'get']

const authRequest = (store: any) => {
  return [
    (config: any) => {
      if (includes(AUTH_CHECK_METHODS, config.method)) {
        const authToken = tokenSelector(store?.getState?.())
        const authTempToken = tempTokenSelector(store.getState())
        if (authTempToken || authToken)
          config.headers['Authorization'] = `Bearer ${authTempToken || authToken}`
      }

      return config
    },
    (error: any) => {
      return Promise.reject(error.data.error.message)
    },
  ]
}

export default authRequest
