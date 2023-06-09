import React from 'react'
import {useSelect} from 'downshift'
import {UseControllerReturn} from 'react-hook-form'
import {MenuBody, ItemMenu, Placeholder, Image, SymbolLabel, Status, Label} from './Theme'

interface DropdownProps {
  placeholder?: string
  items?: any
  disabled?: boolean
  name?: any
  required?: boolean
  setExternalValue?: any
  label?: string
}

export const Dropdown = ({
  setExternalValue,
  items,
  placeholder,
  field,
  disabled,
  formState,
  name,
  required,
  label,
}: UseControllerReturn & DropdownProps) => {
  const [selectedItem, setSelectedItem] = React.useState(field?.value)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    initialSelectedItem: field?.value,

    onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
      setExternalValue?.(newSelectedItem)
      setSelectedItem(newSelectedItem)
      field.onChange(newSelectedItem)
    },
  })

  return (
    <>
      {label ? (
        <label className='form-label fs-6 fw-bold' {...getLabelProps()}>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
        </label>
      ) : null}
      <div
        className='form-select fw-bolder'
        data-kt-select2='true'
        data-placeholder='Select option'
        data-allow-clear='true'
        {...getToggleButtonProps({disabled: disabled})}
        style={{
          backgroundColor: disabled && 'var(--kt-input-disabled-bg)',
        }}
      >
        {field?.value?.label ? (
          <span>{field?.value?.label} </span>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
      </div>
      <MenuBody
        {...{isOpen}}
        {...getMenuProps({
          disabled: disabled,
        })}
        className='p-0 overflow-scroll bg-white shadow-md w-72 max-h-80'
      >
        {isOpen &&
          items?.map((item: any, index: any) => (
            <ItemMenu
              key={`${item?.value}${index}`}
              style={{
                backgroundColor: highlightedIndex === index ? '#B5B5C3' : '',
                fontWeight: selectedItem === item && 'bold',
              }}
              {...getItemProps({item, index})}
            >
              {item?.image ? (
                <div className='symbol symbol-40px me-1 ms-2'>
                  <SymbolLabel className='overflow-hidden symbol-label bg-light'>
                    <Image src={item?.image} className='align-self-end' alt={item?.label} />
                  </SymbolLabel>
                </div>
              ) : null}
              <Label>{item?.label}</Label>
              {item?.status ? <Status>{item?.status}</Status> : null}
            </ItemMenu>
          ))}
      </MenuBody>
    </>
  )
}
