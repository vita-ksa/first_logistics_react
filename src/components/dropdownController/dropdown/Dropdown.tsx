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
      <label className='form-label fs-6 fw-bold' {...getLabelProps()}>
        <span className={`${required ? 'required' : ''}`}>{label}</span>
      </label>
      <div
        className='form-select  fw-bolder'
        data-kt-select2='true'
        data-placeholder='Select option'
        data-allow-clear='true'
        {...getToggleButtonProps()}
      >
        {field?.value?.label ? (
          <span>{field?.value?.label} </span>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
      </div>
      <MenuBody
        {...{isOpen}}
        {...getMenuProps()}
        className='absolute w-72 p-0 bg-white shadow-md max-h-80 overflow-scroll'
      >
        {isOpen &&
          items?.map((item: any, index: any) => (
            <ItemMenu
              key={`${item?.value}${index}`}
              style={{
                backgroundColor: highlightedIndex === index ? '#3b3b64' : '',
                fontWeight: selectedItem === item && 'bold',
              }}
              {...getItemProps({item, index})}
            >
              {item?.image ? (
                <div className='symbol symbol-40px me-1 ms-2'>
                  <SymbolLabel className='symbol-label bg-light overflow-hidden'>
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
