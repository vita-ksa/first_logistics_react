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

export const getDeliveryList = () => {
  return requestAsyncThunk({
    storeName: 'deliveryListState',
    // _url: `/order/delivery-list`,
    method: 'GET',
    exact: 'delivery_list',
  })
}

export const getDeliveryListSlice = createSlice({
  name: 'deliveryListState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
    getConnectdList: (state: any) => {
      const data = state.entities.deliveryList

      const approvedData = data?.map((item: any) => item)?.filter((el: any) => el?.isApproved)
      state.approvedList = approvedData
      return state
    },
    getConnectdSalesChanelsList: (state: any) => {
      const data = state.entities.shops

      const approvedData = data?.map((item: any) => item)?.filter((el: any) => el?.isApproved)
      state.approvedList = approvedData
      return state
    },
  },
  extraReducers: responseAsyncThunk(getDeliveryList()),
})

export const getDeliveryConnectRequest = () => {
  return requestAsyncThunk({
    storeName: 'deliveryConnectRequestState',
    _url: `/order/delivery/request`,
    method: 'GET',
    exact: 'delivery_ConnectRequest',
  })
}

export const getDeliveryConnectRequestSlice = createSlice({
  name: 'deliveryConnectRequestState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getDeliveryConnectRequest()),
})

export const connectToDelivery = () => {
  return requestAsyncThunk({
    storeName: 'connectToDeliveryState',
    _url: `/order/delivery-list`,
    method: 'POST',
    exact: 'connect_to_delivery',
  })
}

export const connectToDeliverySlice = createSlice({
  name: 'connectToDeliveryState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(connectToDelivery()),
})

export const approveToDelivery = () => {
  return requestAsyncThunk({
    storeName: 'approveToDeliveryState',
    _url: `/order/delivery/request`,
    method: 'PATCH',
    exact: 'approve_to_delivery',
  })
}

export const approveToDeliverySlice = createSlice({
  name: 'approveToDeliveryState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(approveToDelivery()),
})

export const connectToShop = () => {
  return requestAsyncThunk({
    storeName: 'connectToShopState',
    _url: `/delivery-company/shops`,
    method: 'POST',
    exact: 'connect_to_shop',
  })
}

export const connectToShopSlice = createSlice({
  name: 'connectToShopState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(connectToShop()),
})

export const getDeliveryShopRequest = () => {
  return requestAsyncThunk({
    storeName: 'deliveryShopRequestState',
    _url: `/delivery-company/shops/request`,
    method: 'GET',
    exact: 'delivery_shop_request',
  })
}

export const getDeliveryShopRequestSlice = createSlice({
  name: 'deliveryShopRequestState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getDeliveryShopRequest()),
})

export const approveShopRequest = () => {
  return requestAsyncThunk({
    storeName: 'approveShopRequestState',
    _url: `/delivery-company/shops/request`,
    method: 'PATCH',
    exact: 'approve_to_shop',
  })
}

export const approveShopRequestSlice = createSlice({
  name: 'approveShopRequestState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(approveShopRequest()),
})
