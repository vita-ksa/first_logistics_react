import {createSlice} from '@reduxjs/toolkit'
import {requestAsyncThunk, responseAsyncThunk} from '../../templates'

interface IInitialState {
  entities: any
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  currentRequestId: undefined
  error: []
}

const initialState = {
  loading: 'idle',
  entities: {},
  currentRequestId: undefined,
  error: [],
} as IInitialState

export const getUsersList = () => {
  return requestAsyncThunk({
    storeName: 'userList',
    _url: `/user/list`,
    method: 'GET',
  })
}

export const getUsersListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getUsersList()),
})
