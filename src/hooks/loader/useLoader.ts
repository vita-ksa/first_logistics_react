import {lockLoaderSlice} from 'pages/lockLoader/lockLoaderSlice'
import {useDispatch} from 'react-redux'

export const useLoader = () => {
  const dispatch = useDispatch()
  const {loader} = lockLoaderSlice.actions

  const handleToggleLoader = (state: any) => {
    dispatch(loader(state))
  }

  return {lockLoader: handleToggleLoader}
}
