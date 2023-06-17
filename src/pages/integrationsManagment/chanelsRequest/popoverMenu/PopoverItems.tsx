import React, {useState} from 'react'
import {useLocales} from 'hooks/locales'
import {PopoverBody, ItemPopover} from './Theme'
import {integrationsAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {useDispatch} from 'react-redux'
import {useNotification} from 'hooks'
import {Loader} from 'components/loader'

interface PopoverItemsProps {
  layerProps?: any
  isOpen?: boolean
  setOpen?: any
  id?: string
  orderNumber?: number
}

export const PopoverItems = ({layerProps, isOpen, setOpen, id, orderNumber}: PopoverItemsProps) => {
  const {trans, Trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {error, success} = useNotification()

  const [loading, setLoading] = useState<any>(false)

  const handelApproveAction = async (type: string) => {
    setLoading(true)
    const {payload} = await dispatch(
      integrationsAPI.approveShopRequest()({
        urlParams: `?id=${id}`,
      })
    )

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    } else {
      success({
        message: trans('g.connect.message'),
      })
    }
    setLoading(false)
    setOpen(false)
  }

  if (!isOpen) return null

  return (
    <PopoverBody
      className={`menu menu-sub menu-sub-dropdown ${isOpen ? 'show' : ''}`}
      {...layerProps}
    >
      <ItemPopover onClick={handelApproveAction.bind(this, 'edit')}>
        {loading ? (
          <Loader width={'15px'} height={'15px'} />
        ) : (
          // <EditSVGStyled />

          <Trans i18nKey='popover.edit'>{trans('g.approve')}</Trans>
        )}
      </ItemPopover>
    </PopoverBody>
  )
}
