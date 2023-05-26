import {capitalize} from 'lodash'
import React from 'react'
import {useController, UseControllerProps} from 'react-hook-form'
import {Dropdown} from './dropdown'

type SelectOption = {
  label: string
  value: string | number
  image?: string
  isActive?: boolean
  status?: string
}

interface DropdownControllerProps {
  placeholder?: any
  label?: any
  name?: string | any
  items: SelectOption[]
  className?: string
  disabled?: boolean
  setExternalValue?: any
  readOnly?: boolean
  required?: boolean
}

export const DropdownController = ({
  placeholder,
  label,
  name,
  control,
  className,
  items,
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
    <div className={` flex flex-col gap-1 position-relative ${className}`}>
      <Dropdown
        {...{
          field,
          formState,
          fieldState,
          items,
          name,
          placeholder,
          disabled,
          setExternalValue,
          label,
          required,
        }}
      />
      {(formState?.errors?.[name]?.message ||
        (formState?.errors?.[name] as any)?.value?.message) && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>
              {capitalize(
                (formState?.errors as any)?.[name]?.message ||
                  (formState?.errors?.[name] as any)?.value?.message
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
