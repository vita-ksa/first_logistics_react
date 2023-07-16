import React from 'react'
import {useLocales} from 'hooks'
import {ReactComponent as WarningSVG} from 'assets/icons/warning.svg'
import {ReactComponent as ActiveTrainerSVG} from 'assets/icons/active-trainer.svg'
import {dismissAction} from 'components/modal/modalSlice'
import {Button, ConfirmMsg} from './Theme'
import {useDispatch, useSelector} from 'react-redux'
import {SUCCESS_STATUS} from 'constants/auth'
import {useNotification} from 'hooks/useNotification'
import {profileAPI} from 'services/apis'
import {capitalize} from 'lodash'
import {useNavigate} from 'react-router-dom'

interface ActivateTrainerModalProps {
  id: string
  name: string
  isActive: boolean
}

export const ActiveTrainerModal = ({isActive, name, id}: ActivateTrainerModalProps) => {
  const {Trans, trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {success, error} = useNotification()
  const loading = useSelector<any>((state) => state.activeUserState.loading === 'pending')
  const navigateTo = useNavigate()

  const onSubmit = async () => {
    const {payload} = await dispatch(
      profileAPI.activeUser()({
        urlParams: `userId=${id}`,
      })
    )
    if (SUCCESS_STATUS.includes(payload?.status)) {
      const message = payload?.data?.isActive
        ? trans('trainer.has.been.activated.successfully')
        : trans('trainer.has.been.deactivated.successfully')
      handleClose()
      success({
        message: `${name} ${message}`,
      })
      navigateTo(-1)
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }
  const handleClose = () => {
    dismissAction()
  }

  return (
    <div className='p-8 text-center'>
      <div>
        <div className='w-100 mb-8 mt-4 d-flex justify-content-center align-items-center '>
          {isActive ? <ActiveTrainerSVG /> : <WarningSVG />}
        </div>
        <h2>
          {!isActive ? (
            <Trans i18nKey={'activate.trainer.modal.title.inactive'}>Inactive Trainer !</Trans>
          ) : (
            <Trans i18nKey={'activate.trainer.modal.title.active'}>Active Trainer !</Trans>
          )}
        </h2>
      </div>
      <ConfirmMsg className='mb-12 px-10'>
        {!isActive ? (
          <Trans i18nKey={'trainer.details.inactive.program.message'} values={{value: name}}>
            Are you sure that you want to inactive{' '}
            {<strong className='text-dark font-weight-bold'> {name}</strong>} ?
          </Trans>
        ) : (
          <Trans i18nKey={'trainer.details.active.program.message'} values={{value: name}}>
            Are you sure that you want to change status to Active for{' '}
            {<strong className='text-dark'> {capitalize(name)}</strong>} ?
          </Trans>
        )}
      </ConfirmMsg>

      <div className='d-flex gap-5'>
        <button
          type='button'
          className='btn btn-lg bg-light text-gray-700 w-50'
          onClick={handleClose}
        >
          <Trans i18nKey={'g.cancel'} />
        </button>
        <Button
          type='button'
          loading={loading}
          className='btn btn-lg text-white w-50 btn-active'
          color={'black'}
          onClick={onSubmit}
        >
          {!isActive ? <Trans i18nKey={'g.inactive'} /> : <Trans i18nKey={'g.yes'} />}
        </Button>
      </div>
    </div>
  )
}
