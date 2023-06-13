import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import localforage from 'localforage'
import {authAPI, ordersAPI, productAPI, profileAPI} from '../services/apis'
import notificationReducer from 'pages/notification/notificationSlice'
import modalReducer from 'components/modal/modalSlice'
import localesReducers from 'locales/localesSlice'
import lockLoaderReducer from 'pages/lockLoader/lockLoaderSlice'

const authPersistConfig = {
  key: 'auth',
  storage: localforage,
  whiteList: ['entities'],
}

const localesPersistConfig = {
  key: 'locales',
  storage: localforage,
  whiteList: ['lang'],
}

const localesPersistReducer = persistReducer(localesPersistConfig, localesReducers)

const authPersistReducer = persistReducer(authPersistConfig, authAPI.authSlice.reducer)

const reducers = combineReducers({
  auth: authPersistReducer,
  notification: notificationReducer,
  modal: modalReducer,
  locales: localesPersistReducer,
  lockLoader: lockLoaderReducer,
  refreshToken: authAPI.refreshTokenSlice.reducer,
  register: authAPI.registerSlice.reducer,
  productList: productAPI.getProductListSlice.reducer,
  addProduct: productAPI.addProductSlice.reducer,
  UpdateProductState: productAPI.UpdateProductSlice.reducer,
  productDetailsState: productAPI.getProductDetailsSlice.reducer,
  deleteProductState: productAPI.deleteProductSlice.reducer,
  ordersList: ordersAPI.getOrdersListSlice.reducer,
  addOrderState: ordersAPI.addOrderSlice.reducer,
  updateOrderState: ordersAPI.UpdateOrderSlice.reducer,
  categoriesList: ordersAPI.getCategoriesListSlice.reducer,
  deliveryCompanyList: ordersAPI.getDeliveryCompanyListSlice.reducer,
  orderDetailsState: ordersAPI.getOrderDetailsSlice.reducer,
  userProfile: profileAPI.getUserProfileSlice.reducer,
  UpdateDeliveryCompanyState: profileAPI.UpdateDeliveryCompanySlice.reducer,
})

export default reducers
