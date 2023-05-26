import React from 'react'

interface ButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'error'
  color?: 'black' | 'sand' | 'red' | 'orange'
  size?: 'xl' | 'lg' | 'md' | 'sm'
  target?: '_self' | '_blank'
  loading?: Boolean
  fullWidth?: Boolean
  className?: string
}

export const Button = React.memo(
  ({
    children,
    loading,
    target,
    className,
    ...props
  }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {isBlocked, ...other}:any = props
    return (
      <button
        className={`btn btn-dark ${className}`}
        id='kt_sign_in_submit'
        {...other}
        data-cmp='Button'
      >
        {loading ? (
          <span className='indicator-progress' style={{display: 'block'}}>
            Please wait...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)
