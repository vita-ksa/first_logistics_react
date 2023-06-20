import clsx from 'clsx'
import React from 'react'
import {UseControllerReturn} from 'react-hook-form'
import {getCountryCallingCode, getCountries, parsePhoneNumber} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {Body, SelectBody, PhoneInput, OptionItem} from './Theme'
import ReactCountryFlag from 'react-country-flag'

interface PhoneProps {
  name?: string | any
  className?: any
  placeholder?: string
  control: any
  register: any
  disabled?: any
}

export const Phone = ({
  name,
  field,
  formState,
  className,
  fieldState,
  placeholder,
  control,
  register,
  disabled,
  ...rest
}: UseControllerReturn & PhoneProps) => {
  const parsedNumber: any = parsePhoneNumber(field?.value) || ''
  const {country, number} = parsedNumber
  const [phoneCountryCode, phoneCountryCodeSetter] = React.useState<any>(country || 'SA')

  return (
    <Body
      className={clsx(`form-control form-control-lg form-control-solid ${className}`, {
        'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
      })}
    >
      <SelectBody
        className='form-select-sm form-select-solid custom-select-inp'
        data-control='select2'
        data-placeholder='Latest'
        data-hide-search='true'
        value={phoneCountryCode}
        disabled={disabled}
        onChange={(event) => {
          // field.onChange()
          phoneCountryCodeSetter(() => event.target.value || undefined)
        }}
      >
        {getCountries().map((country, index) => {
          const countryCode = getCountryCallingCode(country)

          return (
            <OptionItem key={index} value={country}>
              <ReactCountryFlag
                countryCode={country}
                style={{
                  fontSize: '2.5em',
                  lineHeight: '2.5em',
                }}
                aria-label={country}
                title={country}
              />
              <span
                style={{
                  marginRight: '12px',
                }}
              >
                {' '}
                +{countryCode}
              </span>
            </OptionItem>
          )
        })}
      </SelectBody>

      <PhoneInput
        name='phone'
        className='form-control '
        country={phoneCountryCode}
        placeholder={placeholder}
        international={true}
        value={number || ''}
        ref={register}
        onChange={(phone: any) => {
          field.onChange(phone)
        }}
        disabled={disabled}
        {...rest}
      />
    </Body>
  )
}
