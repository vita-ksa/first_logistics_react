import React, {Fragment, useCallback} from 'react'
import {Helmet} from 'react-helmet-async'
import {Table} from 'components/table'
import {useLocales, useNotification} from 'hooks'
import {ReactComponent as UsersNoDataSVG} from 'assets/icons/default-small.svg'
import styled from 'styled-components'
import {SUCCESS_STATUS} from 'constants/auth'
import {useDispatch, useSelector} from 'react-redux'
import {productAPI} from 'services/apis'
import {AddProductModal} from './addProductModal'
import {toggleAction} from 'components/modal/modalSlice'
import {PopoverMenu} from './popoverMenu'

export const StyledTable = styled(Table)`
  th:nth-last-child(2),
  td:nth-last-child(2) {
    width: auto !important;
  }
`

const fackData = [
  {
    id: 1,
    name: 'Product 1',
    price: 1000,
    sku: 'Product',
    Price: '500',
    currancy: 'SAR',
    Barcode: 'BAR001',
  },
  {
    id: 1,
    name: 'Product 2',
    price: 1000,
    sku: 'Product2',
    Price: '500',
    currancy: 'SAR',
    Barcode: 'BAR002',
  },
]

export const Products = () => {
  const {Trans, trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const reloadData = useSelector<any>((state) => [
    state.addProduct?.entities?.id,
    state.UpdateProductState?.entities,
    state.deleteProductState?.entities,
  ])

  const data = useSelector((state: any) => state?.productList?.entities?.productList || [])
  const count = useSelector((state: any) => state?.productList?.entities?.totalCount || 0)
  const loading = useSelector((state: any) => state?.productList?.loading === 'pending')

  console.log(data, 'productList')

  const handelAddNewModal = () => {
    toggleAction({
      show: true,
      component: <AddProductModal type={'add'} />,
      size: 'xl',
      className: 'trainer-modal',
    })
  }

  const columns = [
    // {
    //   Header: () => <Trans i18nKey={'products.list.id'}>ID</Trans>,
    //   accessor: 'id',
    //   // Cell: ({row}: any) => <></>,
    //   disableSortBy: true,
    // },
    {
      Header: () => <Trans i18nKey={'products.product.name'}>Product Name</Trans>,
      accessor: 'name',
      // Cell: ({row}: any) => <></>,
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'product.barcode'}>Barcode</Trans>,
      accessor: 'barcode',
      // Cell: ({row}: any) => <></>,
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'product.price'}>price</Trans>,
      accessor: 'price',
      Cell: ({row}: any) => (
        <>
          {row.original.price} <span>{row.original.currancy}</span>
        </>
      ),
      disableSortBy: true,
    },
    {
      Header: () => <Trans i18nKey={'product.sku'}>SKU</Trans>,
      accessor: 'sku',
      // Cell: ({row}: any) => <></>,
      disableSortBy: true,
    },

    {
      Header: () => <Trans i18nKey={'view'} />,
      accessor: 'view',
      Cell: ({row}: any) => (
        <>
          <PopoverMenu id={row.original.id} />
        </>
      ),
      disableSortBy: true,
    },
  ]

  const fetchData = useCallback(async ({pageSize, pageIndex, search}: any) => {
    const page = pageIndex + 1

    const {payload} = await dispatch(
      productAPI.getProductList()({
        urlParams: `?page=${page}&perPage=${pageSize}${search ? `&name=${search}` : ''}`,
        // filters: filters || {},
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  const noDataProps = {
    title: trans('products.nodata.title'),
    desc: trans('products.nodata.desc'),
    clickHandler: handelAddNewModal,
    buttonText: trans('product.nodata.add'),
    Icon: UsersNoDataSVG,
  }
  console.log(reloadData, 'addProductaddProduct')
  return (
    <Fragment>
      <Helmet>
        <title>Products</title>
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
            reloadData,
          }}
          title={trans('breadcrumb.dashboard')}
          searchPlaceholder={'g.search'}
          onClickAction={handelAddNewModal}
          searchInput
        />
      </div>
    </Fragment>
  )
}
