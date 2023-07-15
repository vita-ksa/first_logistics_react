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

export const getCategoriesList = () => {
  return requestAsyncThunk({
    storeName: 'categoriesListState',
    _url: `/order/category`,
    method: 'GET',
    exact: 'categories_list',
  })
}

export const getCategoriesListSlice = createSlice({
  name: 'categoriesListState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(getCategoriesList()),
})

export const addCategory = () => {
  return requestAsyncThunk({
    storeName: 'addCategoryState',
    _url: `/order/category`,
    method: 'POST',
    exact: 'add_category',
  })
}

export const addCategorySlice = createSlice({
  name: 'addCategoryState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(addCategory()),
})

export const deleteCategory = () => {
  return requestAsyncThunk({
    storeName: 'deleteCategoryState',
    _url: `/order/category`,
    method: 'DELETE',
    exact: 'delete_category',
  })
}

export const deleteCategorySlice = createSlice({
  name: 'deleteCategoryState',
  initialState,
  reducers: {
    resetAction: () => {
      return initialState
    },
  },
  extraReducers: responseAsyncThunk(deleteCategory()),
})
