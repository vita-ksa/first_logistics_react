import React from 'react'
import {Loader as DefaultLoader} from './Theme'

export const Loader = ({width, height, color}: any) => {
  return (
    <DefaultLoader animation='border' {...{color, width, height}} role='status'>
      <span className='visually-hidden'>Loading...</span>
    </DefaultLoader>
  )
}
