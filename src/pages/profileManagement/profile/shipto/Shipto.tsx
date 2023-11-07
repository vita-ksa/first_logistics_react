import {TableThemes} from 'components'
import {useLocales} from 'hooks'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'
import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import blankAvatar from 'assets/img/blank-avatar.png'
import {CardBody} from '../updateProfile/Theme'
import {IMAGE_URL_ENDPOINT} from 'constants/auth'

export const Shipto = () => {
  const {Trans, trans, formatDate} = useLocales()
  const data = useSelector(
    (state: any) => state?.userProfile?.entities?.deliveryCompany?.companyDetails?.shipto || []
  )

  const columns = [
    {
      Header: () => (
        <span className='text-nowrap'>
          <Trans i18nKey={'profile.user.shop.destination'}>Destination</Trans>
        </span>
      ),
      accessor: 'destination',
      Cell: ({row}: any) => (
        <TableThemes.TitlwBody>
          <div className='w-100'>{row?.original?.destination}</div>
        </TableThemes.TitlwBody>
      ),
    },
    {
      Header: () => <Trans i18nKey={'order.list.data'}>Date</Trans>,
      accessor: 'createdAt',
      Cell: ({row}: any) => {
        console.log(row, 'rowrowrowrowrow')
        return (
          <span className='text-nowrap'>
            {' '}
            {formatDate(row?.original?.createdAt, 'MMM D, YYYY')}
          </span>
        )
      },
      disableSortBy: true,
    },
  ]

  const fetchData = useCallback(async ({pageSize, pageIndex, search}: any) => {}, [])

  useEffect(() => {
    document.title = 'Categories'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  const noDataProps = {
    title: trans('No Data'),
    // desc: trans('orders.nodata.desc'),
    // clickHandler: () => {},
    // buttonText: trans('orders.nodata.add'),
    // Icon: UsersNoDataSVG,
  }
  console.log(data, 'datadatadatadata')
  return (
    <div className='bg-transparent card'>
      <CardBody className='bg-white card-body'>
        <div className='w-100'>
          <StyledTable
            {...{
              columns,
              data,
              fetchData,
              noDataProps,
              count: 0,
              loading: false,
              // Filter: PopoverMenu,
              exportData: false,
              reloadData: [],
            }}
            title={trans('sidebar.categories', {defaultValue: 'Shipto'})}
            // searchPlaceholder={'g.search'}
            searchInput={false}
            renderCount={false}
            footer={false}
          />
        </div>
      </CardBody>
    </div>
  )
}
