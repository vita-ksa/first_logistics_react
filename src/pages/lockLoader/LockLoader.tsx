import {useSelector} from 'react-redux'
import {TailSpin} from 'react-loader-spinner'
import {Box} from './Theme'

interface LockLoaderProps {
  loading?: boolean
}
export const LockLoader = ({loading = false}: LockLoaderProps) => {
  const {loader} = useSelector<any>((state) => state?.lockLoader) as any

  if (!loader && !loading) return null
  return (
    <Box>
      <TailSpin
        height='80'
        width='80'
        color='#ccc'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </Box>
  )
}
