import React, {useState} from 'react'
import {useLayer} from 'react-laag'
import {PopoverItems} from './PopoverItems'
import {ReactComponent as OptionsSVG} from 'assets/icons/more-options.svg'
import {useLocales} from 'hooks'

export const PopoverMenu = ({id, isApproved}: any) => {
  const [isOpen, setOpen] = useState(false)
  function close() {
    setOpen(false)
  }

  const {renderLayer, triggerProps, layerProps} = useLayer({
    isOpen,
    onOutsideClick: close,
    onDisappear: close,
    overflowContainer: true,
    auto: true,
    placement: 'bottom-end',
    possiblePlacements: ['top-start', 'bottom-start', 'right-center', 'left-center'],
    triggerOffset: 7,
    containerOffset: 16,
    arrowOffset: 0,
  })

  return (
    <>
      <button
        type='button'
        className='btn btn-white btn-active-white btn-color-gray-600 me-3'
        {...triggerProps}
        style={{color: isOpen ? '#28A4C1' : '#7E8299'}}
        onClick={() => setOpen((el) => !el)}
      >
        {!isOpen ? (
          <OptionsSVG className='svg-icon-2' color='#7E8299' width={'1.5rem'} />
        ) : (
          <OptionsSVG className='svg-icon-2' width={'1.5rem'} />
        )}
      </button>

      {renderLayer(<PopoverItems {...{layerProps, isOpen, setOpen, id, isApproved}} />)}
    </>
  )
}
