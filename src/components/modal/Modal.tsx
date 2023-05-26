import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { keys, last, map } from 'lodash'
import { dismissAction } from './modalSlice'

import { Modal as ModalBody } from 'react-bootstrap'

export const Modal = ({ className: styledClassName }: any): any => {
  const modalState = useSelector<any>((state) => state?.modal) as any

  const handelCloseAction = () => {
    dismissAction()
  }

  useEffect(() => {
    return () => {
      dismissAction()
    }
  }, [])

  return (
    <>
      {map(keys(modalState), (key: any, index: any) => {
        const { show, component: Component, className = "", ...rest } = modalState[key]

        return (

          <ModalBody
            id='kt_modal_create_app'
            key={key}
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName={`modal-dialog modal-dialog-centered ${styledClassName}`}
            contentClassName={`${className}`}
            show={show && last(keys(modalState)) === key}
            onHide={handelCloseAction}
            backdrop={true}
            {...rest}
          >
            {Component}
          </ModalBody>
        )
      })}
    </>
  )
}
