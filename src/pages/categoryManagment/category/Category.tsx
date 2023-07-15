import {TableThemes} from 'components'
import {SUCCESS_STATUS} from 'constants/auth'
import {useLocales, useNotification} from 'hooks'
import {StyledTable} from 'pages/ordersManagment/orders/Theme'
import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {categoriesAPI} from 'services/apis'
import blankAvatar from 'assets/img/blank-avatar.png'
import {AddCategoryModal} from './addCategorytModal'
import {toggleAction} from 'components/modal/modalSlice'
import {ReactComponent as DeleteSVG} from 'assets/icons/table/delete.svg'
import {Loader} from 'components/loader'

export const Category = () => {
  const dispatch = useDispatch<any>()
  const {success, error} = useNotification()
  const {Trans, trans, formatDate} = useLocales()

  const data = useSelector((state: any) => state?.categoriesListState?.entities?.categories || [])
  const loading = useSelector((state: any) => state?.categoriesListState?.loading === 'pending')
  const reloadData = useSelector<any>((state) => [
    state.addCategoryState?.entities?.id,
    state.deleteCategoryState?.entities,
  ])
  const deleteloading = useSelector<any>((state) => state.deleteCategoryState.loading === 'pending')

  const handelAddNewModal = () => {
    toggleAction({
      show: true,
      component: <AddCategoryModal type={'add'} />,
    })
  }

  const handelDeleteAction = async (id: string, name: string) => {
    const {payload} = await dispatch(
      categoriesAPI.deleteCategory()({
        urlParams: `?id=${id}`,
      })
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({message: trans('g.delete.success')})
    } else {
      error({message: payload?.message?.message})
    }
  }

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
    },

    {
      Header: '',
      accessor: 'view',
      Cell: ({row}: any) => (
        <>
          <TableThemes.Label className='text-end'>
            <TableThemes.EditButton
              onClick={handelDeleteAction.bind(this, row?.original?.id, row?.original?.name)}
            >
              {deleteloading ? <Loader width={'15px'} height={'15px'} /> : <DeleteSVG />}
            </TableThemes.EditButton>
          </TableThemes.Label>
        </>
      ),
      disableSortBy: true,
    },
  ]
  console.log(deleteloading ? '..loading' : 'not', 'deleteloadingdeleteloading')
  const fetchData = useCallback(async ({pageSize, pageIndex, search}: any) => {
    const page = pageIndex + 1

    const {payload} = await dispatch(
      categoriesAPI.getCategoriesList()({
        // urlParams: `/?page=${page}&perPage=${pageSize}${search ? `&name=${search}` : ''}`,
        // filters: filters || {},
      })
    )
    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  useEffect(() => {
    document.title = 'Categories'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  const noDataProps = {
    title: trans('orders.nodata.title'),
    // desc: trans('orders.nodata.desc'),
    clickHandler: handelAddNewModal,
    // buttonText: trans('orders.nodata.add'),
    // Icon: UsersNoDataSVG,
  }

  return (
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
          reloadData: reloadData,
        }}
        onClickAction={handelAddNewModal}
        title={trans('sidebar.categories', {defaultValue: 'Categories'})}
        // searchPlaceholder={'g.search'}
        searchInput={false}
        renderCount={false}
        footer={false}
      />
    </div>
  )
}
