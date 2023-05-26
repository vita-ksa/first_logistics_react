import {capitalize} from 'lodash'
import React from 'react'
import {useController, UseControllerProps} from 'react-hook-form'

import {Input} from './input'

interface InputControllerProps {
  type: React.HTMLInputTypeAttribute
  placeholder?: any
  label?: string | any
  name?: string
  control: any
  className?: string
  required?: boolean
  autoComplete?: string
}

export const InputController = ({
  type,
  placeholder,
  label,
  name,
  className = '',
  control,
  defaultValue,
  rules,
  required,
  autoComplete = 'on',
  ...rest
}: UseControllerProps & InputControllerProps) => {
  const {field, formState, fieldState} = useController({
    control,
    name,
    defaultValue,
    rules,
  })

  return (
    <div className={`fv-row mb-8 ${className}`}>
      {label ? (
        <label className='m-0 form-label fs-6 fw-bolder text-dark '>
          {label}
          <span className={`${required ? 'required' : ''}`}></span>
        </label>
      ) : null}
      <Input
        {...{
          field,
          formState,
          name,
          type,
          placeholder,
          fieldState,
          autoComplete,
        }}
      />
      {formState?.errors?.[name]?.message && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{capitalize((formState?.errors as any)?.[name]?.message)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
