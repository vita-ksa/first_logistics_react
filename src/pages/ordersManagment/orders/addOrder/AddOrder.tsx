import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {Stepper} from 'components'
import {useLocales, useNotification} from 'hooks'
import {find} from 'lodash'
import {useForm, FormProvider} from 'react-hook-form'
import styled from 'styled-components'
import {OrderInformation} from './orderInformation'
import {ordersAPI} from 'services/apis'
import {useDispatch, useSelector} from 'react-redux'
import {SenderInformation} from './senderInformation'
import {ReceiverInformation} from './receiverInformation'
import {BackButton, CancelButton, SubmitButton} from './Theme'
import {useNavigate} from 'react-router-dom'
import {SUCCESS_STATUS} from 'constants/auth'

export const CardBody = styled.div`
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
`

export const AddOrder = () => {
  const dispatch = useDispatch<any>()
  const navigateTo = useNavigate()
  const {Trans, trans} = useLocales()
  const [page, setPage] = useState(1)
  const {success, error} = useNotification()
  const methods = useForm({mode: 'onChange'})

  const {lang} = useSelector<any>((state) => state?.locales) as any
  const loading = useSelector<any>((state) => state.addOrderState.loading === 'pending')
  const categoryId = methods.watch('categoryId')?.value

  const pages = useMemo(
    () => [
      {
        id: 1,
        title: 'Order Information',
        text: '',
        page: <OrderInformation />,
      },
      {
        id: 2,
        title: 'Sender Information',
        text: '',
        page: <SenderInformation />,
      },
      {
        id: 3,
        title: 'Receiver Information',
        text: '',
        page: <ReceiverInformation />,
      },
    ],
    []
  )

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

  const handelCancelAction = () => {
    navigateTo('/orders')
  }
  const handelNext = () => {
    setPage((currPage) => currPage + 1)
  }

  const onSubmit = async (_data: any) => {
    const data = {
      categoryId: _data?.categoryId?.value,
      shipmentDetails: {
        shipmentDestination: _data?.shipmentDestination?.value,
        content: _data?.content,
        height: _data?.height,
        weight: _data?.weight,
        quantity: _data?.quantity,
        type: _data?.type?.value,
        deliveryCompanyId: _data?.deliveryCompanyId?.value,
        paymentMethod: _data?.paymentMethod,
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
    const {payload} = await dispatch(ordersAPI.addOrder()({...data}))

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
  const PageComponent = find(pages, (_page) => _page?.id === page)?.page || pages[0]?.page

  useEffect(() => {
    document.title = 'Add Order'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  return (
    <Fragment>
      <FormProvider {...methods}>
        <div className='bg-transparent card'>
          <Stepper pages={pages} initialValue={page} />
          <CardBody className='bg-white card-body'>
            <div>{PageComponent}</div>
          </CardBody>
          <div className='pt-8 d-flex flex-stack'>
            <BackButton
              className='text-gray-700 btn btn-lg btn-gray me-3'
              show={page !== 1}
              disabled={page === 1}
              onClick={() => {
                setPage((currPage) => currPage - 1)
              }}
            >
              <Trans i18nKey={'g.back'}>Back</Trans>
            </BackButton>
            <div>
              <CancelButton onClick={handelCancelAction} className='text-gray-700'>
                <Trans i18nKey={'g.cancel'}>Cancel</Trans>
              </CancelButton>
              {page !== pages.length ? (
                <SubmitButton onClick={methods.handleSubmit(handelNext)}>
                  <Trans i18nKey={'g.next'}>Next</Trans>
                </SubmitButton>
              ) : (
                <SubmitButton
                  loading={Boolean(loading)}
                  disabled={Boolean(loading)}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  <Trans i18nKey={'order.add.order'}>Add Order</Trans>
                </SubmitButton>
              )}
            </div>
          </div>
        </div>
      </FormProvider>
    </Fragment>
  )
}
