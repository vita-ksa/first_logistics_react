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

export const getUserProfile = () => {
  return requestAsyncThunk({
    storeName: 'userProfile',
    _url: `/user/details`,
    method: 'GET',
    exact: 'user_profile',
  })
}

export const getUserProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getUserProfile()),
})

export const UpdateDeliveryCompany = () => {
  return requestAsyncThunk({
    storeName: 'UpdateDeliveryCompanyState',
    _url: `/delivery-company/details`,
    method: 'PATCH_UPLOAD',
    exact: 'update_delivery_company',
  })
}

export const UpdateDeliveryCompanySlice = createSlice({
  name: 'UpdateDeliveryCompanyState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(UpdateDeliveryCompany()),
})
