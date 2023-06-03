import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const Box = styled.button`
  background: linear-gradient(
    157.81deg,
    #def9fa -43.27%,
    #bef3f5 -21.24%,
    #9dedf0 12.19%,
    #7de7eb 29.82%,
    #5ce1e6 51.94%,
    #33bbcf 90.29%
  );
`

export const StartButton = ({styles, ...rest}: any) => {
  const navigateTo = useNavigate()
  return (
    <Box
      type='button'
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary  rounded-[10px] outline-none ${styles}`}
      onClick={() => navigateTo('/auth/login')}
      {...rest}
    >
      Get Started
    </Box>
  )
}
