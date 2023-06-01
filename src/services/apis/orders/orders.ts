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

export const getOrdersList = () => {
  return requestAsyncThunk({
    storeName: 'ordersList',
    _url: `/order/`,
    method: 'GET',
    exact: 'orders_list',
  })
}

export const getOrdersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getOrdersList()),
})

export const addOrder = () => {
  return requestAsyncThunk({
    storeName: 'addOrderState',
    _url: `/Order/`,
    method: 'POST',
    exact: 'add_Order',
  })
}

export const addOrderSlice = createSlice({
  name: 'addOrderState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(addOrder()),
})

export const UpdateOrder = () => {
  return requestAsyncThunk({
    storeName: 'UpdateOrderState',
    _url: `/Order/`,
    method: 'PATCH',
    exact: 'update_Order',
  })
}

export const UpdateOrderSlice = createSlice({
  name: 'UpdateOrderState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(UpdateOrder()),
})

export const getOrderDetails = () => {
  return requestAsyncThunk({
    storeName: 'orderDetailsState',
    _url: `/order/details`,
    method: 'GET',
    exact: 'order_Details',
  })
}

export const getOrderDetailsSlice = createSlice({
  name: 'orderDetailsState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getOrderDetails()),
})

export const getCategoriesList = () => {
  return requestAsyncThunk({
    storeName: 'categoriesList',
    _url: `/order/category`,
    method: 'GET',
    exact: 'categories_list',
  })
}

export const getCategoriesListSlice = createSlice({
  name: 'categoriesList',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
    getOptions: (state: any) => {
      const data = state?.entities?.categories

      const newData = data?.map((item: any) => {
        return {
          value: item?.id,
          label: item?.name,
        }
      })
      state.options = newData
      return state
    },
  },
  extraReducers: responseAsyncThunk(getCategoriesList()),
})

export const getDeliveryCompanyList = () => {
  return requestAsyncThunk({
    storeName: 'deliveryCompanyList',
    _url: `/order/delivery-company`,
    method: 'POST',
    exact: 'delivery_Company_list',
  })
}

export const getDeliveryCompanyListSlice = createSlice({
  name: 'deliveryCompanyList',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
    getOptions: (state: any) => {
      const data = state?.entities?.deliveryCompany

      const newData = data?.map((item: any) => {
        return {
          value: item?.id,
          label: item?.name,
        }
      })
      state.options = newData
      return state
    },
  },
  extraReducers: responseAsyncThunk(getDeliveryCompanyList()),
})
