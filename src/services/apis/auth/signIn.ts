import {createSlice} from '@reduxjs/toolkit'
import {requestAsyncThunk, responseAsyncThunk} from '../../templates'
interface tokens {
  data: {
    tokens: {
      access: any
      refresh: any
    }
  }
}

interface UsersState {
  entities: tokens | any
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

export const signIn = () => {
  return requestAsyncThunk({
    storeName: 'auth',
    _url: `/auth/login`,
    method: 'POST',
  })
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
    setAccessToken: (state, {payload: {accessToken}}: any) => {
      state.entities.tokens.access = accessToken
      return state
    },
    setAccessTempToken: (state, {payload: {tempToken}}) => {
      state.tempToken = tempToken
      return state
    },
  },
  extraReducers: responseAsyncThunk(signIn()),
})

export const register = () => {
  return requestAsyncThunk({
    storeName: 'register',
    _url: `/auth/register`,
    method: 'POST',
  })
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(register()),
})

export const refreshToken = () => {
  return requestAsyncThunk({
    storeName: 'refreshToken',
    _url: `/auth/refresh-tokens`,
    method: 'POST',
  })
}

export const refreshTokenSlice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(refreshToken()),
})
