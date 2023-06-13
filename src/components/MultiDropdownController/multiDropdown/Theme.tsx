import styled from 'styled-components'

export const InputBody = styled.div`
  padding: 0px 0px;
  display: flex;
  width: 100%;
  overflow: hidden;
`

export const MenuBody = styled.div<any>`
  background: #fff;
  z-index: 1004;
  display: ${(props) => (props.isOpen && !props.disabled ? 'flex' : 'none')};
  width: 100%;
  flex-flow: column;
  border: 1px solid #dfe1e5;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 185px;
  outline: none;
  position: absolute;
  margin-top: 4px;
  top: 100%;
`

export const ItemMenu = styled.div<any>`
  // padding: 4px 3px 7px 6px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-align: start;
  cursor: pointer;
  padding: 5px 10px;
  min-height: 37px;
  font-weight: ${(props) => (props.checked ? 'bold' : '500')};
  color: ${(props) => (props.disabled ? '#D7D7D7' : props.checked ? '#2D2D2D' : '#6C6D6D')};
  font-size: 14px;
`
export const Placeholder = styled.span`
  color: #cccccc;
  font-size: 1.15rem;
`

export const SearchInput = styled.input<any>`
  padding: 5px 10px;
  margin-top: 5px;
  margin: 5px;
  outline: noen;
  border-radius: 0.625rem;
  border: 1px solid #dfe1e5 !important;
  background-color: #ffffff !important ;
  width: unset;
  font-size: 15px;
  height: 32px;
  min-height: unset;
  display: ${(props) => (props.isOpen && !props.disabled ? 'block' : 'none')};
`

export const Checkbox = styled.input.attrs((props) => ({
  type: 'checkbox',
}))`
  margin-inline-end: 5px;
  background-color: #ffffff;
  cursor: pointer;
  &:checked {
    background-color: #fd17a9;
    border-color: #ffffff;
  }
`

export const SelecteBodt = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0.775rem 1.9rem 0.775rem 1rem !important;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  font-size: 8px;
  text-align: center;
`

export const SymbolLabel = styled.span`
  border-radius: 50% !important;
`

export const Sympole = styled.div`
  width: 24px;
`
export const SelectedBody = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`
