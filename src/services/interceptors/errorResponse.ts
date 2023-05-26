import {CONFIG_ROUTES, SUCCESS_STATUS} from 'constants/auth'
import get from 'lodash/get'
import {authAPI} from 'services/apis'
import {refreshTokenSelector} from './selectors'

const errorResponse = (store: any) => {
  return [
    (response: any) => {
      return response
    },
    async (error: any) => {
      const responseStatus = get(error, 'response.status')
      const originalConfig = error.config

      if (!CONFIG_ROUTES.includes(originalConfig.url) && error.response) {
        const refreshToken = refreshTokenSelector(store?.getState?.())
        if (responseStatus === 401) {
          try {
            store.dispatch(authAPI.refreshToken()({refreshToken})).then(({payload}: any) => {
              if (SUCCESS_STATUS.includes(payload?.status)) {
                store.dispatch(
                  authAPI.authSlice.actions.setAccessTempToken({
                    tempToken: payload?.data?.access,
                  } as any)
                )
              }
              else {
                store.dispatch(authAPI.authSlice.actions.resetAction())
              }
            })
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(error)
    },
  ]
}

export default errorResponse
