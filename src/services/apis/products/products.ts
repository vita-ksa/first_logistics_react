import {createSlice} from '@reduxjs/toolkit'
import {requestAsyncThunk, responseAsyncThunk} from '../../templates'

interface UsersState {
  entities: any
  tempToken: any
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  currentRequestId: undefined
  error: []
}

const initialState = {
  loading: 'idle',
  entities: {},
  currentRequestId: undefined,
  error: [],
} as UsersState

export const getProductList = () => {
  return requestAsyncThunk({
    storeName: 'productList',
    _url: `/product/`,
    method: 'GET',
    exact: 'product_list',
  })
}

export const getProductListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getProductList()),
})

export const addProduct = () => {
  return requestAsyncThunk({
    storeName: 'addProduct',
    _url: `/product/`,
    method: 'UPLOAD',
    exact: 'add_product',
  })
}

export const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(addProduct()),
})

export const UpdateProduct = () => {
  return requestAsyncThunk({
    storeName: 'UpdateProductState',
    _url: `/product/`,
    method: 'PATCH_UPLOAD',
    exact: 'update_product',
  })
}

export const UpdateProductSlice = createSlice({
  name: 'UpdateProductState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(UpdateProduct()),
})

export const getProductDetails = () => {
  return requestAsyncThunk({
    storeName: 'productDetailsState',
    _url: `/product/details`,
    method: 'GET',
    exact: 'product_Details',
  })
}

export const getProductDetailsSlice = createSlice({
  name: 'productDetailsState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getProductDetails()),
})

export const deleteProduct = () => {
  return requestAsyncThunk({
    storeName: 'deleteProductState',
    _url: `/product/`,
    method: 'DELETE',
    exact: 'delete_product',
  })
}

export const deleteProductSlice = createSlice({
  name: 'deleteProductState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(deleteProduct()),
})
