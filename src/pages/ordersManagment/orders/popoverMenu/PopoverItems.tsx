import React, {useState} from 'react'
import {useLocales} from 'hooks/locales'
import {PopoverBody, ItemPopover, DeleteSVGStyled, EditSVGStyled, ViewSVGStyled} from './Theme'
import {ordersAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {useDispatch} from 'react-redux'
import {useNotification} from 'hooks'
import {Loader} from 'components/loader'
import {useNavigate} from 'react-router-dom'
import {UpdatePaymentLinkModal} from './updatePaymentLinkModal'
import {toggleAction} from 'components/modal/modalSlice'

interface PopoverItemsProps {
  layerProps?: any
  isOpen?: boolean
  setOpen?: any
  id?: string
  orderNumber?: number
  userType?: string
  link?: any
}

export const PopoverItems = ({
  layerProps,
  isOpen,
  setOpen,
  id,
  orderNumber,
  userType,
  link,
}: PopoverItemsProps) => {
  const {trans, Trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const navigateTo = useNavigate()

  const [loading, setLoading] = useState<any>({
    loading: false,
    type: '',
  })

  const handelEditAction = async (type: string) => {
    setLoading({
      loading: true,
      type,
    })
    const {payload} = await dispatch(
      ordersAPI.getOrderDetails()({
        urlParams: `?orderId=${id}`,
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    } else {
      navigateTo('/orders/editOrder', {state: {orderNumber, type}})
    }
    setLoading({
      loading: false,
      type: '',
    })
  }

  const handelAddNewModal = () => {
    toggleAction({
      show: true,
      component: <UpdatePaymentLinkModal type={'add'} id={id} link={link} />,
    })
    setOpen(false)
  }

  if (!isOpen) return null

  return (
    <PopoverBody
      className={`menu menu-sub menu-sub-dropdown ${isOpen ? 'show' : ''}`}
      {...layerProps}
    >
      {userType?.toLowerCase() === 'shop' ? (
        <ItemPopover onClick={handelEditAction.bind(this, 'edit')}>
          {loading?.loading && loading?.type === 'edit' ? (
            <Loader width={'15px'} height={'15px'} />
          ) : (
            <EditSVGStyled />
          )}
          <Trans i18nKey='popover.edit'>{trans('g.edit')}</Trans>
        </ItemPopover>
      ) : (
        <ItemPopover onClick={handelAddNewModal.bind(this)}>
          <Trans i18nKey='popover.update.payment.link'>Edit Payment Link</Trans>
        </ItemPopover>
      )}
      <ItemPopover onClick={handelEditAction.bind(this, 'view')}>
        {loading?.loading && loading?.type === 'view' ? (
          <Loader width={'15px'} height={'15px'} />
        ) : (
          <ViewSVGStyled />
        )}
        <Trans i18nKey='popover.view'>{trans('g.view')}</Trans>
      </ItemPopover>
    </PopoverBody>
  )
}
