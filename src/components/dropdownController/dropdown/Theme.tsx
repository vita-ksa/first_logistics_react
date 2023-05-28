import styled from 'styled-components'

export const MenuBody = styled.div<any>`
  background: #ffffff;
  z-index: 1004;
  display: ${(props) => (props.isOpen && !props.disabled ? 'flex' : 'none')};
  width: 100%;
  flex-flow: column;
  border: 1px solid #dfe1e5;
  border-radius: 16px;
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
  margin-top: 10px;
  margin-bottom: 10px;
`

export const Placeholder = styled.span`
  color: #cccccc;
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
  margin-inline-end: 10px;
`
export const Status = styled.span`
  margin-inline-start: auto;
  color: #838383;
  font-size: 12px;
`

export const Label = styled.span`
  color: #000000;
  font-weight: 500;
  font-size: 16px;
`
