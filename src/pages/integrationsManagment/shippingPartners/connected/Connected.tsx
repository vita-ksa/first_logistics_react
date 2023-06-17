import React, {Fragment, useCallback} from 'react'
import {useLocales} from 'hooks'
import {useSelector} from 'react-redux'
import {Helmet} from 'react-helmet-async'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'

export const Connected = () => {
  const {Trans, trans, formatDate} = useLocales()
  const loading = useSelector(
    (state: any) => state?.deliveryConnectRequestState?.loading === 'pending'
  )
  const data = useSelector((state: any) => state?.deliveryListState?.approvedList || [])
  console.log(data, 'datadatadatadata')
  const columns = [
    {
      Header: () => (
        <span className='text-nowrap'>
          <Trans i18nKey={'profile.user.shop.name'}>Name</Trans>
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
  ]
  console.log(data, 'requestrequestrequestrequest')
  const fetchData = useCallback(async ({search}: any) => {}, [])

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
            reloadData: [],
          }}
          title={trans('sales.delivery', {defaultValue: 'Connected Delivery Companies'})}
          // searchPlaceholder={'g.search'}
          searchInput={false}
          renderCount={false}
          footer={false}
        />
      </div>
    </Fragment>
  )
}
