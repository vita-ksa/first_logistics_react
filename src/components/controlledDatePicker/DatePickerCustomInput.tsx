import React, { forwardRef } from 'react'
import { ReactComponent as CalendarSVG } from 'assets/icons/note-text.svg'
import { useLocales } from 'hooks';
import clsx from 'clsx'

export const DatePickerCustomInput = forwardRef(({ value, onChange, onClick, fieldState, formState, name, onFocus, readOutside }: any, ref: any) => {
  const { trans } = useLocales();

  return (
    <div className='d-flex align-items-center position-relative my-1'>
      <input
        style={{ cursor: "pointer" }}
        type="text"
        ref={ref}
        value={readOutside ? undefined : value}
        placeholder={trans("date_picker.placeholder") || "Pick Date"}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        className={clsx(
          'form-control text-start  text-gray-400 border-0',
          { 'border-danger border-1': fieldState?.isTouched && formState?.errors?.[name] }
        )}
      />
      <CalendarSVG className='svg-icon-1 position-absolute end-0 mx-6' />
    </div >
  )

})
