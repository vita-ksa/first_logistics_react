import React, {useEffect, useMemo, useState} from 'react'
import {useLocales} from 'hooks'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {dismissAction} from 'components/modal/modalSlice'
import {InputFormController, Button, DropdownController} from 'components'
import {schema} from './schema'
import {ReactComponent as CloseSVG} from 'assets/icons/close_modal.svg'
import {useDispatch, useSelector} from 'react-redux'
import {capitalize, isEmpty} from 'lodash'
import {useNotification} from 'hooks/useNotification'
import {SUCCESS_STATUS} from 'constants/auth'
import {FormBody} from './Theme'
import {categoriesAPI, ordersAPI, productAPI} from 'services/apis'

export const UpdatePaymentLinkModal = ({type = 'add', id, link}: any) => {
  const VIEW_MODE = type === 'view'
  const dispatch = useDispatch<any>()
  const {trans} = useLocales()
  const {success, error} = useNotification()

  const loading = useSelector<any>((state) => state.updateOrderStatusState.loading === 'pending')
  console.log(link, 'linklinklink')
  const initialValues = {
    paymentLink: link,
  }

  const {
    control,
    handleSubmit,
    formState: {isValid, dirtyFields},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  })

  const handleClose = () => {
    dismissAction()
  }

  const onSubmit = async (_data: any) => {
    const {payload} = await dispatch(
      ordersAPI.updateOrderStatus()({urlParams: `?orderId=${id}`, paymentLink: _data?.paymentLink})
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      handleClose()
      success({
        message: capitalize(payload?.data?.message),
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }
  return (
    <div className='p-8 w-100'>
      <div className='p-0 m-0 d-flex justify-content-between align-items-end'>
        {/* <h2>{trans(`product.${type}.title`)}</h2> */}
        <div className='btn btn-sm btn-icon' onClick={handleClose}>
          <CloseSVG />
        </div>
      </div>
      <form className='mt-5'>
        <div className='w-100'>
          <FormBody className='gap-8 d-flex'>
            <InputFormController
              //   disabled={VIEW_MODE}
              label={trans('payment.link', {defaultValue: 'Payment Link'})}
              name='paymentLink'
              control={control}
              required
              placeholder={''}
              type={'link'}
            />
          </FormBody>
        </div>
        <div className='d-flex justify-content-end mt-15'>
          <button
            type='button'
            className='mx-5 text-gray-700 btn btn-lg bg-light'
            onClick={handleClose}
          >
            {trans('g.cancel')}
          </button>

          <Button
            type='submit'
            className='text-white btn btn-lg bg-dark'
            disabled={!isValid || isEmpty(dirtyFields) || Boolean(loading)}
            loading={Boolean(loading)}
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            {type === 'add' ? trans('g.add') : trans('g.edit')}
          </Button>
        </div>
      </form>
    </div>
  )
}
