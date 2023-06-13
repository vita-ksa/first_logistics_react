import {capitalize} from 'lodash'
import React from 'react'
import {useController, UseControllerProps} from 'react-hook-form'
import {MultiSelect} from './multiSelect'

type SelectOption = {
  label: string
  value: string | number
  image?: string
}

interface DropdownControllerProps {
  placeholder?: any
  label?: any
  name?: string | any
  options: SelectOption[]
  className?: string
  disabled?: boolean
  setExternalValue?: any
  readOnly?: boolean
  required?: boolean
}

export const MultiSelectController = ({
  placeholder,
  label,
  name,
  control,
  className,
  options,
  disabled,
  setExternalValue,
  defaultValue,
  rules,
  required,
}: UseControllerProps & DropdownControllerProps) => {
  const {field, formState, fieldState} = useController({
    control,
    name,
    defaultValue,
    rules,
  })
  return (
    <div className={`w-72 flex flex-col gap-1 position-relative ${className}`}>
      <MultiSelect
        {...{
          field,
          formState,
          fieldState,
          options,
          name,
          placeholder,
          disabled,
          setExternalValue,
          label,
          required,
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
