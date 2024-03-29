import React, {useCallback, useEffect, useMemo} from 'react'
import {useLocales} from 'hooks'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {usersAPI} from 'services/apis'
import {IMAGE_URL_ENDPOINT, SUCCESS_STATUS} from 'constants/auth'
import {useNotification} from 'hooks/useNotification'
import blankAvatar from 'assets/img/blank-avatar.png'
import {TableThemes} from 'components'
import {StyledTable} from 'pages/managment/products/Theme'
import {PopoverMenu} from '../popoverMenu'

export const DeliveryCompanies = () => {
  const {trans, Trans, formatDate} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()

  const data = useSelector((state: any) => state?.userList?.entities?.userList || [])
  const count = useSelector((state: any) => state?.userList?.entities?.totalCount || 0)
  const loading = useSelector((state: any) => state?.userList?.loading === 'pending')
  const reloadData = useSelector((state: any) => state?.approveUserState?.entities || [])

  useEffect(() => {
    return () => {
      dispatch(usersAPI.getUsersListSlice.actions.resetAction())
    }
  }, [])

  const sortType = useMemo(
    () => (rowA: any, rowB: any) => {
      if (moment(rowA.original.createdAt) > moment(rowB.original.createdAt)) {
        return 1
      } else {
        return -1
      }
    },
    []
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
      sortType,
    },

    {
      Header: () => <Trans i18nKey={'order.list.isApproved'}>is Approved</Trans>,
      accessor: 'isApproved',
      Cell: ({row}: any) => {
        console.log(row?.original, 'row?.originalrow?.original')
        const isApproved = row?.original?.user?.isApproved
        return (
          <>
            <TableThemes.TitlwBody>
              <div
                className='w-100'
                style={{
                  color: isApproved ? 'green' : 'red',
                }}
              >
                {isApproved ? 'Approved' : 'Not Approved'}
              </div>
            </TableThemes.TitlwBody>
          </>
        )
      },
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
            // userType={userType}
            row={row?.original}
          />
        </>
      ),
      disableSortBy: true,
    },
  ]
  const fetchData = useCallback(async ({pageSize, pageIndex, search, filters}: any) => {
    console.log(pageIndex, 'pageIndexpageIndex')
    const page = pageIndex + 1

    const {payload} = await dispatch(
      usersAPI.getUsersList()({
        urlParams: `?page=${page}&perPage=${pageSize}&type=Delivery${
          search ? `&name=${search}` : ''
        }`,
        filters: filters || {},
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  // props for nodata
  const noDataProps = {
    title: trans('users.nodata.title'),
    desc: trans('users.nodata.desc'),

    buttonText: trans('users.nodata.add'),
    // Icon: UsersNoDataSVG,
  }

  useEffect(() => {
    document.title = 'Delivery Companies'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  return (
    <div className='w-100'>
      <StyledTable
        {...{
          columns,
          data,
          fetchData,
          noDataProps,
          count,
          loading,
          exportData: false,
          reloadData: [reloadData],
        }}
        title={trans('sidebar.users.management.delivery.company')}
        searchInput={false}
      />
    </div>
  )
}
