import {TableThemes} from 'components'
import {useLocales} from 'hooks'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'
import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import blankAvatar from 'assets/img/blank-avatar.png'
import {CardBody} from '../updateProfile/Theme'
import {IMAGE_URL_ENDPOINT} from 'constants/auth'

export const Category = () => {
  const {Trans, trans, formatDate} = useLocales()
  const data = useSelector(
    (state: any) => state?.userProfile?.entities?.deliveryCompany?.category || []
  )

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
          {row?.original?.image && (
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
          )}
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

  const fetchData = useCallback(async ({pageSize, pageIndex, search}: any) => {}, [])

  useEffect(() => {
    document.title = 'Categories'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  const noDataProps = {
    title: trans('orders.nodata.title'),
    // desc: trans('orders.nodata.desc'),
    clickHandler: () => {},
    // buttonText: trans('orders.nodata.add'),
    // Icon: UsersNoDataSVG,
  }

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
            title={trans('sidebar.categories', {defaultValue: 'Categories'})}
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
