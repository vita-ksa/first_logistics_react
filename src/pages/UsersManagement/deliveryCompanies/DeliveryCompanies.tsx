import React, {useCallback, useEffect, useMemo} from 'react'
import {useLocales} from 'hooks'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {profileAPI, usersAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {useNotification} from 'hooks/useNotification'
import {ReactComponent as ViewSVG} from 'assets/icons/right-arr.svg'
import blankAvatar from 'assets/img/blank-avatar.png'
import {useNavigate} from 'react-router-dom'
import {TableThemes} from 'components'
import {StyledTable} from 'pages/managment/products/Theme'

export const DeliveryCompanies = () => {
  const {trans, Trans, formatDate} = useLocales()
  const navigate = useNavigate()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()

  const data = useSelector((state: any) => state?.userList?.entities?.userList || [])
  const count = useSelector((state: any) => state?.userList?.entities?.totalCount || 0)
  const loading = useSelector((state: any) => state?.userList?.loading === 'pending')

  const viewUser = (userinfo: any, commpName: string, orderList: any) => {
    const user = {...userinfo, deliveryCompany: {name: commpName}}
    dispatch(profileAPI.getUserProfileSlice.actions.setUserInfoAction({user, orderList}))
    navigate(`/profile-management/user`)
  }

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
                      ? `http://109.123.249.49:3006/logistics/images/${row?.original?.image}`
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
      Header: '',
      accessor: 'view',
      Cell: ({row}: any) => (
        <>
          <TableThemes.Label className='text-end'>
            <TableThemes.EditButton
              onClick={viewUser.bind(
                this,
                row?.original?.user,
                row?.original?.name,
                row?.original?.orders
              )}
            >
              <ViewSVG />
            </TableThemes.EditButton>
          </TableThemes.Label>
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
        }}
        title={trans('sidebar.users.management.delivery.company')}
        searchInput={false}
      />
    </div>
  )
}
