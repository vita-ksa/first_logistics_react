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
  required?: boolean
  className?: any
  inputStyle?: any
  fileTypes?: any
  autoComplete?: string
  unit?: string
  subUnit?: string
  register?: any
  disabled?: boolean
  onChangeCurrancy?: any
}

export const InputFormController = ({
  type,
  placeholder,
  label,
  name,
  control,
  defaultValue,
  rules,
  required,
  className,
  inputStyle,
  fileTypes,
  autoComplete,
  unit,
  subUnit,
  register,
  disabled = false,
  onChangeCurrancy,
  ...rest
}: UseControllerProps & InputControllerProps) => {
  const {field, formState, fieldState} = useController({
    control,
    name,
    defaultValue,
    rules,
  })

  return (
    <div className={`fv-row mb-8 w-100 ${className}`}>
      {label ? (
        <label className='mb-2 d-flex align-items-center fs-5 fw-semibold'>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
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
          inputStyle,
          control,
          fileTypes,
          autoComplete,
          unit,
          subUnit,
          register,
          disabled,
          onChangeCurrancy,
          ...rest,
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
