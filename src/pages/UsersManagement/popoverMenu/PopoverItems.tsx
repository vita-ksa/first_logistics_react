import React, {useState} from 'react'
import {useLocales} from 'hooks/locales'
import {PopoverBody, ItemPopover, ViewSVGStyled} from './Theme'
import {profileAPI, usersAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {useDispatch} from 'react-redux'
import {useNotification} from 'hooks'
import {Loader} from 'components/loader'
import {useNavigate} from 'react-router-dom'

interface PopoverItemsProps {
  layerProps?: any
  isOpen?: boolean
  setOpen?: any
  id?: string
  orderNumber?: number
  userType?: string
  row?: any
}

export const PopoverItems = ({
  layerProps,
  isOpen,
  setOpen,
  id,
  orderNumber,
  userType,
  row,
}: PopoverItemsProps) => {
  const {trans, Trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const navigateTo = useNavigate()

  const [loading, setLoading] = useState<any>(false)

  const handelEditAction = (userinfo: any, commpName: string, orderList: any) => {
    const user = {...userinfo, shop: {name: commpName}}
    dispatch(profileAPI.getUserProfileSlice.actions.setUserInfoAction({user, orderList}))
    navigateTo(`/profile-management/user`)
  }

  const handelApproveAction = async (userId: any) => {
    setLoading(true)
    // const {payload} = await dispatch(
    //   usersAPI.approveUser()({
    //     // urlParams: `?userId=${userId} : ''}`,
    //     // isApproved: true,
    //   })
    // )
    const {payload} = await dispatch(
      usersAPI.approvedUser()({
        urlParams: `userId=${userId}`,
        isApproved: true,
      })
    )
    console.log(payload, userId, 'payloadpayloadpayload')
    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
    setLoading(false)
    setOpen(false)
  }

  if (!isOpen) return null

  console.log(row, 'rowrowrow')
  return (
    <PopoverBody
      className={`menu menu-sub menu-sub-dropdown ${isOpen ? 'show' : ''}`}
      {...layerProps}
    >
      <ItemPopover
        disabled={row?.user?.isApproved}
        onClick={handelApproveAction.bind(this, row?.userId)}
      >
        {loading?.loading && loading?.type === 'view' ? (
          <Loader width={'15px'} height={'15px'} />
        ) : null}
        <Trans i18nKey='popover.view'>{trans('g.approve', {defaultValue: 'Approve'})}</Trans>
      </ItemPopover>

      <ItemPopover onClick={handelEditAction.bind(this, row?.user, row?.name, row?.orders)}>
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
