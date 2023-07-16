import {useId} from 'react'

export const SwitchButton = ({
  name,
  field,
  formState,
  rules,
  className,
  fieldState,
  inputStyle,
  setExternalValue,
  ...rest
}: any) => {
  const toggleButtonID = useId()
  return (
    <>
      <input
        className='form-check-input cursor-pointer'
        style={{
          ...inputStyle,
        }}
        type='checkbox'
        id={toggleButtonID}
        checked={field?.value}
        {...{...field}}
      />
    </>
  )
}
