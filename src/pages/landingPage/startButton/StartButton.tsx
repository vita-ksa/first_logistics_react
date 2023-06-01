import React from 'react'
import {useNavigate} from 'react-router-dom'

export const StartButton = ({styles, ...rest}: any) => {
  const navigateTo = useNavigate()
  return (
    <button
      type='button'
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      onClick={() => navigateTo('/auth/login')}
      {...rest}
    >
      Get Started
    </button>
  )
}
