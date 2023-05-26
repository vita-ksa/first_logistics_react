import {delay} from 'lodash'
import {dismissAction, toggleAction} from 'pages/notification/notificationSlice'

interface notificationStateProps {
  message: string | any
}
export const useNotification = () => {
  const success = ({message}: notificationStateProps) => {
    toggleAction({
      type: 'success',
      color: '#83C567',
      text: message,
    })

    delay(() => dismissAction(), 3000)
  }

  const error = ({message}: notificationStateProps) => {
    toggleAction({
      type: 'danger',
      color: 'red',
      text: message,
    })

    delay(() => dismissAction(), 5000)
  }

  return {success, error}
}
