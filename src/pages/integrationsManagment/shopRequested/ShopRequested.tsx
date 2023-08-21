import React, {Fragment, useCallback, useEffect} from 'react'
import {useLocales, useNotification} from 'hooks'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'
import {Helmet} from 'react-helmet-async'
import {useDispatch, useSelector} from 'react-redux'
import {integrationsAPI} from 'services/apis'
import {IMAGE_URL_ENDPOINT, SUCCESS_STATUS} from 'constants/auth'
import {PopoverMenu} from './popoverMenu'
import {TableThemes} from 'components'
import blankAvatar from 'assets/img/blank-avatar.png'

export const ShopRequested = () => {
  const {Trans, trans, formatDate} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const {lang} = useSelector<any>((state) => state?.locales) as any
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
        <TableThemes.TitlwBody>
          <div className='symbol symbol-50px me-5'>
            <span className='overflow-hidden symbol-label bg-light'>
              <TableThemes.Image
                src={`${
                  row?.original?.image
                    ? `${IMAGE_URL_ENDPOINT}/${row?.original?.image}`
                    : blankAvatar
                }`}
                className='align-self-end'
                alt=''
              />
            </span>
          </div>
          <div className='w-100'>{row?.original?.name}</div>
        </TableThemes.TitlwBody>
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

  useEffect(() => {
    document.title = 'Requests'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  return (
    <Fragment>
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
