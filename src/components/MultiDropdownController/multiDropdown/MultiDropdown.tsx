import clsx from 'clsx'
import {useCombobox, useMultipleSelection} from 'downshift'
import {useLocales} from 'hooks'
import React from 'react'
import {UseControllerReturn} from 'react-hook-form'
import {
  Checkbox,
  InputBody,
  ItemMenu,
  MenuBody,
  Placeholder,
  SearchInput,
  SelecteBodt,
  Image,
  SymbolLabel,
  Sympole,
  SelectedBody,
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

export const MultiDropdown = ({
  placeholder,
  field,
  disabled,
  formState,
  fieldState,
  name,
  required,
  label,
  className,
  options,
}: UseControllerReturn & DropdownProps) => {
  const [inputValue, setInputValue] = React.useState<any>('')
  const [selectedItems, setSelectedItems] = React.useState<any>(field?.value || [])
  const {trans} = useLocales()
  const items = React.useMemo(() => getFilteredBooks(inputValue, options), [inputValue])
  const {getSelectedItemProps, getDropdownProps, removeSelectedItem} = useMultipleSelection({
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

  return (
    <div className={` flex flex-col gap-1 position-relative ${className}`}>
      <>
        <label className='form-label fs-6 fw-bold' {...getLabelProps()}>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
        </label>
        <>
          <InputBody
            className={clsx('form-control form-control-lg form-control-solid bg-white', {
              'is-invalid': fieldState?.isTouched && formState?.errors?.[name],
            })}
          >
            <SelecteBodt
              className='form-select  fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='false'
              aria-expanded='false'
              {...getToggleButtonProps()}
            >
              {selectedItems?.length ? (
                selectedItems.map(function renderSelectedItem(
                  selectedItemForRender: any,
                  index: any
                ) {
                  return (
                    <SelectedBody
                      className='bg-gray-100 rounded-md px-1 focus:bg-red-400 '
                      key={`selected-item-${index}`}
                      {...getSelectedItemProps({
                        selectedItem: selectedItemForRender,
                        index,
                      })}
                    >
                      {selectedItemForRender?.image ? (
                        <Sympole>
                          <img
                            src={selectedItemForRender?.image}
                            style={{width: '100%', height: '100%'}}
                            alt='s'
                          />
                        </Sympole>
                      ) : null}
                      {selectedItemForRender.label}
                      <span
                        className='px-1 cursor-pointer'
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSelectedItem(selectedItemForRender)
                        }}
                      >
                        &#10005;
                      </span>
                    </SelectedBody>
                  )
                })
              ) : (
                <Placeholder>{placeholder}</Placeholder>
              )}
            </SelecteBodt>
          </InputBody>
        </>
      </>
      <MenuBody
        {...{isOpen}}
        {...getMenuProps()}
        className='absolute w-72 bg-white shadow-md max-h-80 overflow-scroll'
      >
        <>
          <SearchInput
            {...{isOpen}}
            className='form-control form-control-lg form-control-solid'
            type='text'
            placeholder={trans('g.search')}
            {...getInputProps(getDropdownProps({preventKeyAction: isOpen}))}
          />
        </>
        {isOpen && (
          <>
            {items.map((item: any, index: any) => (
              <ItemMenu
                style={{
                  backgroundColor: highlightedIndex === index ? 'RGBA(253,23,169,0.29)' : '',
                  fontWeight: selectedItem === item && 'bold',
                }}
                key={`${item?.label}${index}`}
                {...getItemProps({item, index})}
              >
                <Checkbox
                  className='form-check-input'
                  checked={selectedItems.find((el: any) => el?.value === item?.value) !== undefined}
                  value={item?.value}
                  onChange={() => null}
                />
                {item?.image ? (
                  <div className='symbol symbol-40px me-1 ms-2'>
                    <SymbolLabel className='symbol-label bg-light overflow-hidden'>
                      <Image src={item?.image} className='align-self-end' alt={item?.label} />
                    </SymbolLabel>
                  </div>
                ) : null}
                <span>{item?.label}</span>
              </ItemMenu>
            ))}
          </>
        )}
      </MenuBody>
    </div>
  )
}
