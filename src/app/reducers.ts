import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import localforage from 'localforage'
import {
  authAPI,
  categoriesAPI,
  credentialsAPI,
  integrationsAPI,
  ordersAPI,
  productAPI,
  profileAPI,
  usersAPI,
} from '../services/apis'
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

const userProfilePersistConfig = {
  key: 'userProfile',
  storage: localforage,
  whiteList: ['entities', 'userInfo', 'orderList'],
}

const localesPersistReducer = persistReducer(localesPersistConfig, localesReducers)

const authPersistReducer = persistReducer(authPersistConfig, authAPI.authSlice.reducer)
const userProfilePersistReducer = persistReducer(
  userProfilePersistConfig,
  profileAPI.getUserProfileSlice.reducer
)

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
  userProfile: userProfilePersistReducer,
  UpdateDeliveryCompanyState: profileAPI.UpdateDeliveryCompanySlice.reducer,
  UpdateShopInfoState: profileAPI.UpdateShopInfoSlice.reducer,
  imageUrlState: profileAPI.getImageUrlSlice.reducer,
  deliveryListState: integrationsAPI.getDeliveryListSlice.reducer,
  deliveryConnectRequestState: integrationsAPI.getDeliveryConnectRequestSlice.reducer,
  connectToDeliveryState: integrationsAPI.connectToDeliverySlice.reducer,
  approveToDeliveryState: integrationsAPI.approveToDeliverySlice.reducer,
  connectToShopState: integrationsAPI.connectToShopSlice.reducer,
  deliveryShopRequestState: integrationsAPI.getDeliveryShopRequestSlice.reducer,
  approveShopRequestState: integrationsAPI.approveShopRequestSlice.reducer,
  generateCredentialsState: credentialsAPI.getgenerateCredentialsSlice.reducer,
  getCredentialsState: credentialsAPI.getCredentialsSlice.reducer,
  updateOrderStatusState: ordersAPI.updateOrderStatusSlice.reducer,
  categoriesListState: categoriesAPI.getCategoriesListSlice.reducer,
  addCategoryState: categoriesAPI.addCategorySlice.reducer,
  deleteCategoryState: categoriesAPI.deleteCategorySlice.reducer,
  userList: usersAPI.getUsersListSlice.reducer,
  documentationState: credentialsAPI.getDocumentationSlice.reducer,
  documentationLinksState: credentialsAPI.SaveDocumentationLinksSlice.reducer,
  activeUserState: profileAPI.activeUserSlice.reducer,
})

export default reducers
