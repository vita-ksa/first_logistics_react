import React, {useRef} from 'react'
import DatePicker from 'react-datepicker'
import {useController} from 'react-hook-form'
import {DatePickerCustomInput} from './DatePickerCustomInput'

export const RangePicker = ({control, name, readOutside = false}: any) => {
  const {field, fieldState, formState} = useController({
    control,
    name,
  })
  const [startDate, endDate] = field?.value
  const inputRef = useRef(null)

  return (
    <DatePicker
      onChange={(value: any) => {
        field.onChange(value)
      }}
      startDate={startDate}
      endDate={endDate}
      selectsRange={true}
      customInput={
        <DatePickerCustomInput ref={inputRef} {...{fieldState, formState, name, readOutside}} />
      }
    />
  )
}
