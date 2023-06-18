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

export const generateCredentials = () => {
  return requestAsyncThunk({
    storeName: 'generateCredentialsState',
    _url: `/auth/credentials`,
    method: 'PATCH',
    exact: 'generate_credentials',
  })
}

export const getgenerateCredentialsSlice = createSlice({
  name: 'generateCredentialsState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(generateCredentials()),
})

export const getCredentials = () => {
  return requestAsyncThunk({
    storeName: 'getCredentialsState',
    _url: `/auth/credentials`,
    method: 'GET',
    exact: 'get_credentials',
  })
}

export const getCredentialsSlice = createSlice({
  name: 'getCredentialsState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getCredentials()),
})
