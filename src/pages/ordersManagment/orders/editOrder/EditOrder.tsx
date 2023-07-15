import React, {useEffect} from 'react'
import {useLocales, useNotification} from 'hooks'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import {CancelButton, CardBody, SubmitButton} from './Theme'
import {isEmpty} from 'lodash'
import {ordersAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {OrderInformation} from './orderInformation'
import {SenderInformation} from './senderInformation'
import {ReceiverInformation} from './receiverInformation'

export const EditOrder = () => {
  const {Trans, trans} = useLocales()
  const navigateTo = useNavigate()
  const {state}: any = useLocation()
  const dispatch = useDispatch<any>()
  const {success, error} = useNotification()
  console.log(state, 'statestate')

  const VIEW_MODE = state?.type === 'view'
  const userRole = useSelector((state: any) => state?.auth?.entities?.user?.role)

  const data = useSelector((state: any) => state.orderDetailsState?.entities?.order || {})
  const loading = useSelector<any>((state) => state.updateOrderState.loading === 'pending')
  console.log(data, 'datadatadata')
  const methods = useForm({
    mode: 'onChange',
    // resolver: yupResolver(schema),

    defaultValues: {
      categoryId: {label: data?.category?.name, value: data?.category?.id},
      deliveryCompanyId: {
        label: data?.Shipment?.deliveryCompany?.name,
        value: data?.deliveryCompany?.id,
      },
      paymentMethod: data?.Shipment?.paymentMethod || 'CashOnDelivery',
      quantity: data?.Shipment?.quantity,
      content: data?.Shipment?.content,
      height: data?.Shipment?.height,
      weight: data?.Shipment?.weight,
      sender_name: data?.Shipment?.sender?.name,
      sender_email: data?.Shipment?.sender?.email,
      sender_phone: data?.Shipment?.sender?.phone,
      sender_country: data?.Shipment?.sender?.country,
      sender_city: data?.Shipment?.sender?.city,
      sender_street: data?.Shipment?.sender?.street,
      sender_additionalInfo: data?.Shipment?.sender?.additionalInfo,
      sender_buildingName: data?.Shipment?.sender?.buildingName,
      receiver_name: data?.Shipment?.receiver?.name,
      receiver_email: data?.Shipment?.receiver?.email,
      receiver_phone: data?.Shipment?.receiver?.phone,
      receiver_country: data?.Shipment?.receiver?.country,
      receiver_city: data?.Shipment?.receiver?.city,
      receiver_street: data?.Shipment?.receiver?.street,
      receiver_additionalInfo: data?.Shipment?.receiver?.additionalInfo,
      receiver_buildingName: data?.Shipment?.receiver?.buildingName,
    },
  } as any)

  const categoryId = methods.watch('categoryId')?.value

  const handelCancelAction = () => {
    navigateTo(-1)
  }

  const onSubmit = async (_data: any) => {
    const Updateddata = {
      categoryId: _data?.categoryId?.value,
      shipmentDetails: {
        shipmentDestination: _data?.shipmentDestination?.value,
        content: _data?.content,
        height: _data?.height,
        weight: _data?.weight,
        quantity: _data?.quantity,
        type: _data?.type?.value,
        deliveryCompanyId: _data?.deliveryCompanyId?.value,
        sender: {
          name: _data?.sender_name,
          email: _data?.sender_email,
          phone: _data?.sender_phone,
          country: _data?.sender_country,
          city: _data?.sender_city,
          street: _data?.sender_street,
          additionalInfo: _data?.sender_additionalInfo,
          buildingName: _data?.sender_buildingName,
        },
        receiver: {
          name: _data?.receiver_name,
          email: _data?.receiver_email,
          phone: _data?.receiver_phone,
          country: _data?.receiver_country,
          city: _data?.receiver_city,
          street: _data?.receiver_street,
          additionalInfo: _data?.receiver_additionalInfo,
          buildingName: _data?.receiver_buildingName,
        },
      },
    }
    const {payload} = await dispatch(
      ordersAPI.UpdateOrder()({
        urlParams: `?orderId=${data?.id}`,
        ...Updateddata,
      })
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({
        message: `${_data?.program_name_en}${trans('program.add.success.msg')}`,
      })
      navigateTo('/orders', {
        replace: true,
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }

  useEffect(() => {
    dispatch(ordersAPI.getCategoriesList()({})).then(() =>
      dispatch(ordersAPI.getCategoriesListSlice.actions.getOptions())
    )
    return () => {
      dispatch(ordersAPI.getCategoriesListSlice.actions.resetAction())
    }
  }, [])

  useEffect(() => {
    if (!categoryId) return
    dispatch(
      ordersAPI.getDeliveryCompanyList()({
        categoryId,
      })
    ).then(() => dispatch(ordersAPI.getDeliveryCompanyListSlice.actions.getOptions()))
    return () => {
      dispatch(ordersAPI.getDeliveryCompanyListSlice.actions.resetAction())
    }
  }, [categoryId])

  return (
    <FormProvider {...methods}>
      <div className='bg-transparent card'>
        <CardBody className='bg-white card-body'>
          <OrderInformation
            {...{
              categoryId: data?.categoryId,
              shipmentDestination: data?.Shipment?.shipmentDestination,
              type: data?.Shipment?.type,
              deliveryCompanyId: data?.Shipment?.deliveryCompanyId,
              disabled: VIEW_MODE,
            }}
          />
        </CardBody>
        <CardBody className='mt-5 bg-white card-body'>
          <SenderInformation viewMode={VIEW_MODE} />
        </CardBody>
        <CardBody className='mt-5 bg-white card-body'>
          <ReceiverInformation viewMode={VIEW_MODE} />
        </CardBody>
      </div>
      <div className='pt-8 d-flex align-items-center justify-content-end'>
        <>
          <CancelButton onClick={handelCancelAction} className='text-gray-700'>
            <Trans i18nKey={'g.cancel'}>Cancel</Trans>
          </CancelButton>
          {userRole === 'ADMIN' ? null : (
            <SubmitButton
              onClick={methods.handleSubmit(onSubmit)}
              disabled={
                Boolean(loading) ||
                !methods?.formState?.isValid ||
                isEmpty(methods?.formState?.dirtyFields) ||
                VIEW_MODE
              }
              loading={Boolean(loading)}
            >
              <Trans i18nKey={'g.save.changes'}>Save Changes</Trans>
            </SubmitButton>
          )}
        </>
      </div>
    </FormProvider>
  )
}
