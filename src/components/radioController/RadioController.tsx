import {InputHTMLAttributes} from 'react'
import {useController, UseControllerProps} from 'react-hook-form'
import {RadioButton} from './RadioButton'
import {Body, Title} from './Theme'

interface RadioControllerProps {
  title?: string | any
  ref?: any
  list?: any
  disabled?: any
}

export const RadioController = ({
  control,
  name,
  rules,
  defaultValue,
  title,
  list,
  ref,
  className,
  required,
  disabled,
  ...rest
}: UseControllerProps & RadioControllerProps & InputHTMLAttributes<HTMLInputElement>) => {
  const {field, formState, fieldState} = useController({
    control,
    name,
    rules,
    defaultValue,
  })

  return (
    <Body className={`form-check form-check-custom form-check-solid${className}`}>
      {title && (
        <Title>
          {/* {title} */}
          <span className={`${required ? 'required' : ''}`}>{title}</span>
        </Title>
      )}
      <RadioButton {...{list, field, formState, fieldState, title, ref, disabled, ...rest}} />
    </Body>
  )
}
