import React, {Fragment, useCallback, useEffect} from 'react'
import {useLocales} from 'hooks'
import {useSelector} from 'react-redux'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'
import {TableThemes} from 'components'
import blankAvatar from 'assets/img/blank-avatar.png'

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
        <TableThemes.TitlwBody>
          <div className='symbol symbol-50px me-5'>
            <span className='overflow-hidden symbol-label bg-light'>
              <TableThemes.Image
                src={`${
                  row?.original?.image
                    ? `http://109.123.249.49:3006/logistics/images/${row?.original?.image?.url}`
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
  ]

  const fetchData = useCallback(async ({search}: any) => {}, [])

  useEffect(() => {
    document.title = 'Connected'
    return () => {
      document.title = 'First Logistics'
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
