import React from 'react'
import clsx from 'clsx'
import {UseControllerReturn} from 'react-hook-form'
// import {FileUpload} from 'components/fileUpload'
import {ReactComponent as LinkIcon} from 'assets/icons/link.svg'

import {AmountBody, AmountInput, IconThem, Unit, UnitText} from './Theme'
import {Phone} from 'components/phone'
import {FileUpload} from 'components/fileUpload'
import styled from 'styled-components'
import {DropdownSelect} from 'components/dropdownSelect'
import {useSelector} from 'react-redux'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  name?: string | any
  rules?: any
  className?: any
  placeholder?: string
  inputStyle?: any
  control?: any
  register?: any
  fileTypes?: any
  autoComplete?: string
  unit?: string
  subUnit?: string
  disabled?: boolean
  onChangeCurrancy?: any
}
const unacceptableKeys = [38, 40, 69, 107, 109, 189, 187]

export const Input = ({
  type,
  name,
  field,
  formState,
  rules,
  className,
  fieldState,
  placeholder,
  inputStyle,
  control,
  register,
  fileTypes,
  autoComplete = 'on',
  unit,
  subUnit,
  disabled,
  onChangeCurrancy,
  ...rest
}: UseControllerReturn & InputProps) => {
  const {lang} = useSelector<any>((state) => state?.locales) as any

  const handelOnKeyDown = (e: any) => {
    if (unacceptableKeys?.includes(e.which)) {
      e.preventDefault()
    }
  }
  switch (type) {
    case 'file':
      return (
        <FileUpload
          {...{
            name,
            field,
            formState,
            rules,
            className,
            fieldState,
            placeholder,
            fileTypes,
            disabled,
            ...rest,
          }}
        />
      )
    case 'textarea':
      return (
        <textarea
          className={clsx('form-control bg-transparent ', {
            'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
          })}
          style={{
            ...inputStyle,
          }}
          placeholder={placeholder}
          {...{...field, rules}}
        />
      )
    case 'link': {
      return (
        <div className='w-100 d-flex flex-between'>
          <IconThem>
            <LinkIcon />
          </IconThem>

          <input
            type={type}
            data-kt-user-table-filter='search'
            className={
              clsx('form-control form-control-lg form-control-solid ', {
                'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
              }) + ' bg-light p-3 w-100'
            }
            style={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            }}
            placeholder={placeholder}
            {...{...field, rules}}
          />
        </div>
      )
    }

    case 'phone': {
      return (
        <Phone
          {...{
            name,
            field,
            formState,
            rules,
            placeholder,
            className,
            fieldState,
            register,
            control,
            disabled,
            ...rest,
          }}
        />
      )
    }
    case 'number': {
      return (
        <input
          {...{error: formState?.errors?.[name], rules, ...rest}}
          {...field}
          type='number'
          className={clsx('form-control  ', {
            'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
          })}
          placeholder={placeholder}
          onKeyDown={handelOnKeyDown}
          onWheel={(e: any) => e.target?.blur()}
          onChange={(e: any) =>
            field.onChange(isNaN(parseInt(e?.target?.value)) ? null : parseInt(e?.target?.value))
          }
          disabled={disabled}
        />
      )
    }
    case 'units': {
      return (
        <div className='position-relative w-100'>
          <input
            type='number'
            data-kt-user-table-filter='search'
            className={clsx('form-control  ', {
              'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
            })}
            placeholder={placeholder}
            {...{...field, rules}}
            disabled={disabled}
            autoComplete={autoComplete}
          />
          <Unit dir={lang === 'en' ? 'ltr' : 'rtl'}>
            <UnitText>
              {unit}
              {subUnit && <sub style={{verticalAlign: 'super'}}>{subUnit}</sub>}
            </UnitText>
          </Unit>
        </div>
        //typography  content
      )
    }
    case 'amount': {
      return (
        <AmountBody className='position-relative d-flex w-100 flex-nowrap'>
          <AmountInput
            type='number'
            data-kt-user-table-filter='search'
            className={clsx('form-control  ', {
              'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
            })}
            placeholder={placeholder}
            {...{...field, rules}}
            autoComplete={autoComplete}
            disabled={disabled}
          />
          <>
            <>
              <DropdownSelect
                items={['SAR', 'KAW', 'BHD', 'EUR', 'GBP', 'EUR']}
                onChange={onChangeCurrancy}
                disabled={disabled}
                menuStyle={{bottom: 30, overflow: 'auto', maxHeight: '150px'}}
              />
            </>
          </>
        </AmountBody>
        //typography  content
      )
    }
    default:
      return (
        <input
          type='text'
          data-kt-user-table-filter='search'
          className={clsx('form-control  ', {
            'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
          })}
          disabled={disabled}
          placeholder={placeholder}
          {...{...field, rules}}
          autoComplete={autoComplete}
        />
      )
  }
}
