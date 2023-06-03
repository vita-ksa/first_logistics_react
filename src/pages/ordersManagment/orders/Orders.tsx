import {TableThemes} from 'components/table'
import {SUCCESS_STATUS} from 'constants/auth'
import {useLocales, useNotification} from 'hooks'
import React, {Fragment, useCallback, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {ordersAPI} from 'services/apis'
import {Name, SenderInfo, StyledTable} from './Theme'
import {ReactComponent as EditSVG} from 'assets/icons/table/edit.svg'
import {Loader} from 'components/loader'

export const Orders = () => {
  const [editLoading, setEditLoading] = useState<any>({
    loading: false,
    type: '',
  })

  const {Trans, trans, formatDate} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const navigateTo = useNavigate()

  const data = useSelector((state: any) => state?.ordersList?.entities?.orderList || [])
  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type) as string
  const count = useSelector((state: any) => state?.ordersList?.entities?.totalCount || 0)
  const loading = useSelector((state: any) => state?.ordersList?.loading === 'pending')

  const handleEdit = useCallback(async (id: string, number: number) => {
    setEditLoading({
      loading: true,
      type: '',
    })
    const {payload} = await dispatch(
      ordersAPI.getOrderDetails()({
        urlParams: `?orderId=${id}`,
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    } else {
      navigateTo('/orders/editOrder', {state: {orderNumber: number}})
    }
    setEditLoading({
      loading: false,
      type: '',
    })
  }, [])

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
      accessor: 'status',
      // Cell: ({row}: any) => (
      //   <>
      //     {row.original.price} <span>{row.original.currancy}</span>
      //   </>
      // ),
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
      Header: () => <Trans i18nKey={'order.list.sender'}>Sender</Trans>,
      accessor: 'sender',
      Cell: ({row}: any) => (
        <TableThemes.TitlwBody>
          <div className='d-flex justify-content-start flex-column'>
            <TableThemes.Label className='mb-1 fs-6'>
              <Name>{row?.original?.Shipment?.sender?.name}</Name>
              <SenderInfo className='gray-text'>
                {row?.original?.Shipment?.sender?.phone}
              </SenderInfo>
              <SenderInfo className='gray-text'>
                {row?.original?.Shipment?.sender?.email}
              </SenderInfo>
            </TableThemes.Label>
          </div>
        </TableThemes.TitlwBody>
      ),
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'order.list.receiver'}>Receiver</Trans>,
      accessor: 'receiver',
      Cell: ({row}: any) => (
        <TableThemes.TitlwBody>
          <div className='d-flex justify-content-start flex-column'>
            <TableThemes.Label className='mb-1 fs-6'>
              <Name>{row?.original?.Shipment?.receiver?.name}</Name>
              <SenderInfo className='gray-text'>
                {row?.original?.Shipment?.receiver?.phone}
              </SenderInfo>
              <SenderInfo className='gray-text'>
                {row?.original?.Shipment?.receiver?.email}
              </SenderInfo>
            </TableThemes.Label>
          </div>
        </TableThemes.TitlwBody>
      ),
      disableSortBy: true,
    },
    {
      Header: '',
      // () => <Trans i18nKey={'view'} />,
      accessor: 'actions',
      Cell: ({row}: any) => (
        <>
          <TableThemes.Label>
            <TableThemes.EditButton
              onClick={handleEdit.bind(this, row?.original?.id, row?.original?.number)}
            >
              {editLoading?.loading ? <Loader width={'15px'} height={'15px'} /> : <EditSVG />}
            </TableThemes.EditButton>
          </TableThemes.Label>
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
          onClickAction={handelAddNewOrder}
          searchInput
        />
      </div>
    </Fragment>
  )
}
