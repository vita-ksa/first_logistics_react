import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import localforage from 'localforage'
import {authAPI, productAPI} from '../services/apis'
import notificationReducer from 'pages/notification/notificationSlice'
import modalReducer from 'components/modal/modalSlice'

const authPersistConfig = {
  key: 'auth',
  storage: localforage,
  whiteList: ['entities'],
}

const authPersistReducer = persistReducer(authPersistConfig, authAPI.authSlice.reducer)

const reducers = combineReducers({
  auth: authPersistReducer,
  notification: notificationReducer,
  modal: modalReducer,
  refreshToken: authAPI.refreshTokenSlice.reducer,
  register: authAPI.registerSlice.reducer,
  productList: productAPI.getProductListSlice.reducer,
  addProduct: productAPI.addProductSlice.reducer,
  UpdateProductState: productAPI.UpdateProductSlice.reducer,
  productDetailsState: productAPI.getProductDetailsSlice.reducer,
  deleteProductState: productAPI.deleteProductSlice.reducer,
})

export default reducers
