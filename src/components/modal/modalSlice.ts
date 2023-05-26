import {store} from 'app/store'
import {createSlice, nanoid} from '@reduxjs/toolkit'
import {last, keys} from 'lodash'

const initialState = {
  show: false,
  Component: () => null,
  className: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleAction: (state: any, {payload: {show, component, ...rest}}) => {
      state[nanoid()] = {
        component,
        show: show !== undefined ? show : !state.show,
        ...rest,
      }
      return state
    },
    dismissAction: (state: any) => {
      delete state[last<any>(keys(state))]
      return state
    },
    resetAction: (state: any) => {
      return initialState
    },
  },
})

const {
  toggleAction: defaultToggleAction,
  dismissAction: defaultDismissAction,
  resetAction: defaultResetAction,
} = modalSlice.actions

export const dismissAction = () => {
  store.dispatch(defaultDismissAction())
}
export const resetAction = () => {
  store.dispatch(defaultResetAction())
}
export const toggleAction = (prams: any) => {
  store.dispatch(defaultToggleAction(prams))
}

export default modalSlice.reducer
