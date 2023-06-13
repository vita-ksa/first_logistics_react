import clsx from 'clsx'
import {useCombobox, useMultipleSelection} from 'downshift'
import {useLocales} from 'hooks'
import React from 'react'
import {UseControllerReturn} from 'react-hook-form'
import {useLayer} from 'react-laag'
import {
  InputBody,
  ItemMenu,
  MenuBody,
  Placeholder,
  SearchInput,
  SelectBody,
  Image,
  ImageContainer,
  SelectedImage,
  ClearButton,
  ListLabel,
} from './Theme'

interface DropdownProps {
  placeholder?: string
  options?: any
  disabled?: boolean
  name?: any
  required?: boolean
  label?: string
  className?: string
}

function getFilteredBooks(inputValue: any, options: any) {
  const lowerCasedInputValue = inputValue.toLowerCase()

  return options.filter(function filteroption(option: any) {
    return (
      option.label.toLowerCase().includes(lowerCasedInputValue) ||
      option.value.toLowerCase().includes(lowerCasedInputValue)
    )
  })
}

export const MultiSelect = ({
  placeholder,
  field,
  formState,
  fieldState,
  name,
  required,
  label,
  className,
  options,
}: UseControllerReturn & DropdownProps) => {
  const {trans} = useLocales()

  const [inputValue, setInputValue] = React.useState<any>('')

  const [selectedItems, setSelectedItems] = React.useState<any>(field?.value || [])

  const items = React.useMemo(() => getFilteredBooks(inputValue, options), [inputValue])

  const {getDropdownProps, removeSelectedItem} = useMultipleSelection({
    selectedItems,
    onStateChange({selectedItems: newSelectedItems, type}: any) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems)
          field.onChange(newSelectedItems)

          break
        default:
          break
      }
    },
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    closeMenu,
  } = useCombobox({
    items,
    itemToString(item: any) {
      return item ? item?.label : ''
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
      const {changes, type} = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
            inputValue: '',
          }
        default:
          return changes
      }
    },
    onStateChange({inputValue: newInputValue, type, selectedItem: newSelectedItem}: any) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (newSelectedItem?.value) {
            const selected =
              selectedItems.findIndex((__item: any) => __item?.value === newSelectedItem?.value) !==
              -1
            if (selected) {
              removeSelectedItem(newSelectedItem)
            } else {
              setSelectedItems([...selectedItems, newSelectedItem])
              field.onChange([...selectedItems, newSelectedItem])
              setInputValue('')
            }
          }

          break

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue || '')
          break
        default:
          break
      }
    },
  })

  const showMenu = isOpen
  const {renderLayer, triggerProps, layerProps, triggerBounds}: any = useLayer({
    isOpen: showMenu,
    overflowContainer: true,
    onOutsideClick: closeMenu,
    auto: true,
    snap: true,
    placement: 'bottom-center',
    possiblePlacements: ['top-center', 'bottom-start'],
    triggerOffset: 5,
    containerOffset: 5,
  })

  return (
    <div className={`w-72 flex flex-col gap-1 position-relative ${className}`}>
      <>
        <label className='form-label fs-6 fw-bold' {...getLabelProps()}>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
        </label>
        <>
          <InputBody
            className={clsx('form-control form-control-lg form-control-solid', {
              'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
            })}
          >
            <SelectBody
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='false'
              aria-expanded='false'
              {...getToggleButtonProps(triggerProps)}
            >
              <Placeholder>{placeholder}</Placeholder>
            </SelectBody>
          </InputBody>
        </>
      </>
      {renderLayer(
        <MenuBody
          {...{isOpen: showMenu}}
          {...getMenuProps(layerProps)}
          className='bg-white shadow-md'
          style={{...layerProps.style, width: triggerBounds?.width}}
        >
          <>
            <SearchInput
              {...{isOpen: showMenu}}
              className='form-control form-control-lg form-control-solid'
              type='text'
              placeholder={trans('g.search')}
              {...getInputProps(getDropdownProps({preventKeyAction: showMenu}))}
            />
          </>
          {showMenu && (
            <>
              {items?.length &&
                items.map((item: any, index: any) => (
                  <ItemMenu
                    style={{
                      backgroundColor: highlightedIndex === index ? 'RGBA(253,23,169,0.29)' : '',
                      fontWeight: selectedItem === item && 'bold',
                    }}
                    className='my-1'
                    key={`${item?.label}${index}`}
                    {...getItemProps({item, index})}
                  >
                    {item?.image ? (
                      <ImageContainer className='me-2'>
                        <Image src={item?.image} className='align-self-end' alt={item?.label} />
                      </ImageContainer>
                    ) : null}
                    <span>{item?.label}</span>
                  </ItemMenu>
                ))}
            </>
          )}
        </MenuBody>
      )}

      {selectedItems?.length ? (
        <div className='d-flex gap-2 mt-4 flex-wrap'>
          {selectedItems.map((selectedItemForRender: any) => (
            <div key={selectedItemForRender?.value} className='me-5'>
              <div
                style={{width: '121px', height: '127px', position: 'relative'}}
                className=' symbol-50px'
              >
                <SelectedImage
                  src={selectedItemForRender?.image}
                  style={{objectFit: 'cover'}}
                  className='align-self-end w-100 h-100 '
                  alt={selectedItemForRender?.label}
                />

                <ClearButton
                  onClick={() => {
                    removeSelectedItem(selectedItemForRender)
                  }}
                >
                  X
                </ClearButton>
              </div>
              <ListLabel>{selectedItemForRender?.label}</ListLabel>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
