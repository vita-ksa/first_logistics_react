import React, {useState} from 'react'
import clsx from 'clsx'
import {UseControllerReturn} from 'react-hook-form'

import {EyeOffSVG, EyeSVG} from './Theme'
interface InputProps {
  type: React.HTMLInputTypeAttribute
  name?: string | any
  rules?: any
  className?: any
  placeholder?: string
  autoComplete?: string
}

export const Input = ({
  type,
  name,
  field,
  formState,
  rules,
  className,
  fieldState,
  placeholder,
  autoComplete,
  ...rest
}: UseControllerReturn & InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  switch (type) {
    case 'password': {
      return (
        <form autoComplete={autoComplete}>
          <div className='my-1 d-flex align-items-center position-relative'>
            <input
              placeholder={placeholder}
              {...{...field, rules}}
              className={clsx(
                'form-control  ',
                {'border-danger': fieldState?.isTouched && formState?.errors?.[name]},
                {
                  'border-success': fieldState?.isTouched && !formState?.errors?.[name],
                }
              )}
              type={showPassword ? 'text' : 'password'}
              name={name}
            />
            <button
              style={{display: 'contents'}}
              type='button'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffSVG color='gray' className='mx-6 svg-icon-1 position-absolute end-0' />
              ) : (
                <EyeSVG className='mx-6 svg-icon-1 position-absolute end-0' />
              )}
            </button>
          </div>
        </form>
      )
    }
    default:
      return (
        <input
          placeholder={placeholder}
          {...{...field, rules}}
          className={clsx(
            'form-control ',
            {'is-invalid': fieldState?.isTouched && formState?.errors?.[name]},
            {
              'is-valid': fieldState?.isTouched && !formState?.errors?.[name],
            }
          )}
          type={type}
          name={name}
          autoComplete={autoComplete}
        />
      )
  }
}
