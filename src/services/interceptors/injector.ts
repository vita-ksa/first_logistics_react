import {clientAction} from '../templates/axios'
import {authRequest, errorResponse} from '.'

export const injector = (store: any) => {
  clientAction.interceptors.request.use(...authRequest(store))
  clientAction.interceptors.response.use(...errorResponse(store))
}
