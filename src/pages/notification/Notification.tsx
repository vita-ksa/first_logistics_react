import React from 'react'
import {useSelector} from 'react-redux'
import {ReactComponent as CloseSVG} from 'assets/icons/close_modal.svg'
import {Body} from './Theme'
import {dismissAction} from './notificationSlice'

export const Notification = () => {
  const {text, show, type, color} = useSelector((state: any) => state.notification)
  return (
    <Body
      show={show}
      className={`notice d-flex bg-light-${type} rounded border-${type} border border-dashed`}
    >
      <div className='d-flex flex-stack flex-grow-1'>
        <div className='fw-bold '>{text}</div>
      </div>
      <button className='p-0 bg-transparent btn' onClick={dismissAction}>
        <CloseSVG stroke={color} />
      </button>
    </Body>
  )
}
