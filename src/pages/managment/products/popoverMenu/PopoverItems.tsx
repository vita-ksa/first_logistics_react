import React, {useState, useTransition} from 'react'
import {useLocales} from 'hooks/locales'
import {PopoverBody, ItemPopover, DeleteSVGStyled, EditSVGStyled, ViewSVGStyled} from './Theme'
import {toggleAction} from 'components/modal/modalSlice'
import {AddProductModal} from '../addProductModal'
import {productAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {useDispatch, useSelector} from 'react-redux'
import {useNotification} from 'hooks'
import {Loader} from 'components/loader'

interface PopoverItemsProps {
  layerProps?: any
  isOpen?: boolean
  setOpen?: any
  id?: string
}

export const PopoverItems = ({layerProps, isOpen, setOpen, id}: PopoverItemsProps) => {
  const {trans, Trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {error, success} = useNotification()

  const [loading, setLoading] = useState<any>({
    loading: false,
    type: '',
  })

  const deleteloading = useSelector<any>((state) => state.deleteProductState.loading === 'pending')

  const handelEditAction = async (type: string) => {
    setLoading({
      loading: true,
      type,
    })
    const {payload} = await dispatch(
      productAPI.getProductDetails()({
        urlParams: `?productId=${id}`,
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    } else {
      toggleAction({
        show: true,
        component: <AddProductModal type={type} id={id} />,
        size: 'xl',
        className: 'trainer-modal',
      })
      setOpen(false)
    }
    setLoading({
      loading: false,
      type: '',
    })
  }

  const handelDeleteAction = async () => {
    const {payload} = await dispatch(
      productAPI.deleteProduct()({
        urlParams: `?productId=${id}`,
      })
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({message: payload?.message?.message})
      setOpen(false)
    } else {
      error({message: payload?.message?.message})
    }
  }

  if (!isOpen) return null

  return (
    <PopoverBody
      className={`menu menu-sub menu-sub-dropdown ${isOpen ? 'show' : ''}`}
      {...layerProps}
    >
      <ItemPopover onClick={handelEditAction.bind(this, 'edit')}>
        {loading?.loading && loading?.type === 'edit' ? (
          <Loader width={'15px'} height={'15px'} />
        ) : (
          <EditSVGStyled />
        )}
        <Trans i18nKey='popover.edit'>{trans('g.edit')}</Trans>
      </ItemPopover>
      <ItemPopover onClick={handelEditAction.bind(this, 'view')}>
        {loading?.loading && loading?.type === 'view' ? (
          <Loader width={'15px'} height={'15px'} />
        ) : (
          <ViewSVGStyled />
        )}
        <Trans i18nKey='popover.view'>{trans('g.view')}</Trans>
      </ItemPopover>
      <ItemPopover onClick={handelDeleteAction.bind(this)}>
        {deleteloading ? <Loader width={'15px'} height={'15px'} /> : <DeleteSVGStyled />}
        <Trans i18nKey='popover.delete'>{trans('g.delete')}</Trans>
      </ItemPopover>
    </PopoverBody>
  )
}
