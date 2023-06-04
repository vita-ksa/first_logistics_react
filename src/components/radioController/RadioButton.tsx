import React from 'react'
import {InputBody, Input, Label} from './Theme'

interface RadioProps {
  title?: string
  field?: any
  ref?: any
  list?: any
  disabled?: boolean
}

export const RadioButton = ({field, list, title, ref, disabled, ...rest}: RadioProps) => {
  return (
    <>
      <InputBody className='input-group'>
        {list.map(({value, label, ..._rest}: any, index: any) => (
          <div key={index} style={{marginInlineEnd: 24}}>
            <Input
              className='form-check-input'
              type='radio'
              id={index + value}
              checked={value?.toString() === field?.value?.toString()}
              onClick={() => {
                field?.onChange(value)
              }}
              {..._rest}
              {...rest}
              onChange={(e) => {}}
              disabled={disabled}
            />
            <Label className='form-check-label' htmlFor={index + value}>
              {label}
            </Label>
          </div>
        ))}
      </InputBody>
    </>
  )
}
