import {TableThemes} from 'components/table'
import {SUCCESS_STATUS} from 'constants/auth'
import {useLocales, useNotification} from 'hooks'
import React, {Fragment, useCallback, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {ordersAPI} from 'services/apis'
import {StyledTable} from './Theme'
import {PopoverMenu} from './popoverMenu'
import {DropdownController} from 'components'
import {useForm} from 'react-hook-form'
import {capitalize} from 'lodash'

const statusList = [
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Delivered',
    value: 'Delivered',
  },
  {
    label: 'Inprogress',
    value: 'Inprogress',
  },
  {
    label: 'Returned',
    value: 'Returned',
  },
  {
    label: 'Canceled',
    value: 'Canceled',
  },
]
export const Orders = () => {
  const methods = useForm({mode: 'onChange'})

  const {Trans, trans, formatDate} = useLocales()
  const dispatch = useDispatch<any>()
  const {success, error} = useNotification()
  const navigateTo = useNavigate()

  const data = useSelector((state: any) => state?.ordersList?.entities?.orderList || [])
  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type) as string
  const count = useSelector((state: any) => state?.ordersList?.entities?.totalCount || 0)
  const loading = useSelector((state: any) => state?.ordersList?.loading === 'pending')

  const updateOrderStatusAction = async (value: any, orderId: any) => {
    console.log(value, 'valuevaluevaluevalue')
    const {payload} = await dispatch(
      ordersAPI.updateOrderStatus()({urlParams: `?orderId=${orderId}`, status: value?.value})
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      console.log(payload, 'payloadpayload')
      success({
        message: capitalize(payload?.data?.message),
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }

  const columns = [
    {
      Header: () => (
        <span className='text-nowrap'>
          <Trans i18nKey={'order.list.number'}>Order #</Trans>
        </span>
      ),
      accessor: 'number',
      Cell: ({row}: any) => (
        <>
          <div className='w-100'>{row?.original?.number}</div>
        </>
      ),
    },
    {
      Header: () => <Trans i18nKey={'order.list.data'}>Date</Trans>,
      accessor: 'data',
      Cell: ({row}: any) => (
        <span className='text-nowrap'> {formatDate(row?.original?.date, 'MMM D, YYYY')}</span>
      ),
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'order.list.status'}>Status</Trans>,
      accessor: 'statusId',
      Cell: ({row}: any) => (
        <>
          {userType?.toLowerCase() === 'shop' ? (
            row.original.status.replaceAll('_', ' ')
          ) : (
            <>
              {' '}
              <DropdownController
                name='trainerName'
                // label={trans('general.trainer.name', {defaultValue: 'Trainer Name'})}
                items={statusList || []}
                control={methods?.control}
                // placeholder={trans('deal.add.trainer.placeholder')}
                required
                // rules={{required: 'This is required.'}}
                defaultValue={statusList?.find(
                  (el) => el?.value?.toLowerCase() === row.original.status?.toLowerCase()
                )}
                setExternalValue={(value: any) => updateOrderStatusAction(value, row?.original?.id)}
              />
            </>
          )}
        </>
      ),
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'order.list.content'}>Content</Trans>,
      accessor: 'content',
      Cell: ({row}: any) => <>{row.original.Shipment?.content}</>,
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'order.list.quantity'}>Quantity</Trans>,
      accessor: 'quantity',
      Cell: ({row}: any) => <>{row.original.Shipment?.quantity}</>,
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'order.list.type'}>Type</Trans>,
      accessor: 'type',
      Cell: ({row}: any) => <>{row.original.Shipment?.type}</>,
      disableSortBy: true,
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: ({row}: any) => (
        <>
          <PopoverMenu
            id={row?.original?.id}
            orderNumber={row?.original?.number}
            userType={userType}
          />
        </>
      ),
      disableSortBy: true,
    },
  ]

  const fetchData = useCallback(async ({pageSize, pageIndex, search}: any) => {
    const page = pageIndex + 1

    const url: any = `${
      userType?.toLowerCase() === 'shop'
        ? `/order/?page=${page}&perPage=${pageSize}${search ? `&name=${search}` : ''}`
        : `/delivery-company/orders/?page=${page}&perPage=${pageSize}${
            search ? `&name=${search}` : ''
          }`
    }`

    const {payload} = await dispatch(
      ordersAPI.getOrdersList()({
        urlParams: url,
        // filters: filters || {},
      })
    )
    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  const handelAddNewOrder = () => {
    navigateTo('/orders/addOrder')
  }
  const noDataProps = {
    title: trans('orders.nodata.title'),
    desc: trans('orders.nodata.desc'),
    clickHandler: handelAddNewOrder,
    buttonText: trans('orders.nodata.add'),
    // Icon: UsersNoDataSVG,
  }

  return (
    <Fragment>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className='w-100'>
        <StyledTable
          {...{
            columns,
            data,
            fetchData,
            noDataProps,
            count,
            loading,
            // Filter: PopoverMenu,
            exportData: false,
            reloadData: [],
          }}
          title={trans('sidebar.orders')}
          searchPlaceholder={'g.search'}
          onClickAction={userType?.toLowerCase() === 'shop' ? handelAddNewOrder : false}
          searchInput
          overFlowX={userType?.toLowerCase() !== 'shop'}
        />
      </div>
    </Fragment>
  )
}
