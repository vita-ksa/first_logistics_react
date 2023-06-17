import React, {Fragment, useCallback} from 'react'
import {useLocales, useNotification} from 'hooks'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'
import {Helmet} from 'react-helmet-async'
import {useDispatch, useSelector} from 'react-redux'
import {integrationsAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {PopoverMenu} from './popoverMenu'

export const ShopRequested = () => {
  const {Trans, trans, formatDate} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const loading = useSelector(
    (state: any) => state?.deliveryConnectRequestState?.loading === 'pending'
  )
  const data = useSelector(
    (state: any) => state?.deliveryConnectRequestState?.entities?.requests || []
  )
  const reloadData = useSelector((state: any) => state?.approveToDeliveryState?.entities || [])

  const columns = [
    {
      Header: () => (
        <span className='text-nowrap'>
          <Trans i18nKey={'profile.user.shop.name'}>Order #</Trans>
        </span>
      ),
      accessor: 'name',
      Cell: ({row}: any) => (
        <>
          <div className='w-100'>{row?.original?.name}</div>
        </>
      ),
    },
    {
      Header: () => <Trans i18nKey={'order.list.data'}>Date</Trans>,
      accessor: 'createdAt',
      Cell: ({row}: any) => (
        <span className='text-nowrap'> {formatDate(row?.original?.createdAt, 'MMM D, YYYY')}</span>
      ),
      disableSortBy: true,
    },

    {
      Header: '',
      accessor: 'actions',
      Cell: ({row}: any) => (
        <>
          <PopoverMenu id={row?.original?.id} isApproved={row?.original?.isApproved} />
        </>
      ),
      disableSortBy: true,
    },
  ]

  const fetchData = useCallback(async ({search}: any) => {
    const {payload} = await dispatch(
      integrationsAPI.getDeliveryConnectRequest()({
        // urlParams: `?page=${page}&perPage=${pageSize}${search ? `&name=${search}` : ''}`,
        // filters: filters || {},
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  const noDataProps = {
    title: trans('orders.nodata.title'),
    // desc: trans('orders.nodata.desc'),
    // clickHandler: () => {},
    // buttonText: trans('orders.nodata.add'),
    // Icon: UsersNoDataSVG,
  }

  return (
    <Fragment>
      <Helmet>
        <title>Connected</title>
      </Helmet>
      <div className='w-100'>
        <StyledTable
          {...{
            columns,
            data,
            fetchData,
            noDataProps,
            count: 0,
            loading,
            // Filter: PopoverMenu,
            exportData: false,
            reloadData: [reloadData],
          }}
          title={trans('sales.channels', {defaultValue: 'Requests sales channels'})}
          // searchPlaceholder={'g.search'}
          searchInput={false}
          renderCount={false}
          footer={false}
        />
      </div>
    </Fragment>
  )
}
