import {useLocales} from 'hooks'
import {StyledTable} from 'pages/managment/products/Theme'
import {PopoverMenu} from 'pages/ordersManagment/orders/popoverMenu'
import React from 'react'

export const OrdersTable = ({data, userType}: any) => {
  const {Trans, trans, formatDate} = useLocales()

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
          <div className='w-100'>{row.original?.status?.replaceAll('_', ' ')}</div>
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

  const noDataProps = {
    title: trans('orders.nodata.title'),
    // desc: trans('orders.nodata.desc'),
    // clickHandler: handelAddNewOrder,
    // buttonText: trans('orders.nodata.add'),
    // Icon: UsersNoDataSVG,
  }

  return (
    <>
      <div className='w-100'>
        <StyledTable
          {...{
            columns,
            data,
            fetchData: () => {},
            noDataProps,
            count: 0,
            loading: false,
            // Filter: PopoverMenu,
            exportData: false,
            reloadData: [],
          }}
          title={trans('sidebar.orders')}
          // searchPlaceholder={'g.search'}
          searchInput={false}
          renderCount={false}
          footer={false}
        />
      </div>
    </>
  )
}
