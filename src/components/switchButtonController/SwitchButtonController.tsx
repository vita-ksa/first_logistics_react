import React from 'react'
import {SwitchButton} from './switchButton/SwitchButton'
import {UseControllerProps, useController} from 'react-hook-form'

interface SwitchButtonPropsControllerProps {
  placeholder?: any
  label?: string | any
  name?: string
  control: any
  required?: boolean
  className?: any
  inputStyle?: any
  labelStyle?: any
  setExternalValue?: any
}

export const SwitchButtonController = ({
  placeholder,
  label,
  name,
  control,
  defaultValue,
  rules,
  required,
  className,
  inputStyle,
  labelStyle,
  setExternalValue,
  ...rest
}: UseControllerProps & SwitchButtonPropsControllerProps) => {
  const {field, formState, fieldState} = useController({
    control,
    name,
    defaultValue,
    rules,
  })

  return (
    <div
      className={`form-check form-switch form-switch-sm form-check-custom form-check-solid ${className}`}
    >
      {label ? (
        <label
          style={{
            ...labelStyle,
          }}
          className='form-check-label mx-1'
        >
          {label}
        </label>
      ) : null}
      <SwitchButton
        {...{
          name,
          field,
          formState,
          rules,
          className,
          fieldState,
          inputStyle,
          setExternalValue,
          ...rest,
        }}
      />
    </div>
  )
}
