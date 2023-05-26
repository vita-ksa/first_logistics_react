import React, {useEffect} from 'react'
import {useSelect} from 'downshift'
import {Body, LabelBody, SelectBody, ArrowDownSVGStyled, MenuBody, ItemBody} from './Theme'

interface DropdownSelectProps {
  label?: string
  indicatorStyle?: any
  menuStyle?: any
  onChange?: any
  items?: any
  defaultValue?: any
  className?: string
  disabled?: boolean
}

export const DropdownSelect = ({
  label,
  indicatorStyle,
  menuStyle,
  onChange,
  items,
  defaultValue,
  className,
  disabled,
  ...rest
}: DropdownSelectProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    defaultSelectedItem: defaultValue || items?.[0],
  })

  useEffect(() => {
    onChange && onChange(selectedItem)
  }, [selectedItem])

  return (
    <Body className={className} {...rest}>
      {label ? <LabelBody {...getLabelProps()}>{label}</LabelBody> : null}

      <SelectBody className='text-truncate' {...getToggleButtonProps({disabled: disabled})}>
        {selectedItem?.name || selectedItem}
        <ArrowDownSVGStyled isopen={isOpen.toString()} style={{...indicatorStyle}} />
      </SelectBody>
      <MenuBody {...getMenuProps()} {...{isOpen}} style={{...menuStyle}}>
        {isOpen &&
          items?.map((item: any, index: number) => (
            <ItemBody
              {...{highlightedIndex, index, selectedItem}}
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {item?.name || item}
            </ItemBody>
          ))}
      </MenuBody>
    </Body>
  )
}
