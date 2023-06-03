import styled from 'styled-components'
import {ReactComponent as ArrowDownSVG} from 'assets/icons/table/down.svg'

export const Body = styled.div`
  position: relative;
  background: #ffffff;
  padding: 5px;
  max-width: 90px;
  width: 90px;
  height: 35px;
  border-radius: 6px;
`

export const LabelBody = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 0px;
`

export const MenuBody = styled.div<any>`
  background: #fff;
  z-index: 5000;
  position: absolute;
  width: max-content;
  min-width: 110px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
  padding: ${(props) => (props.isOpen ? '15px 10px;' : '0')};
  outline: none;
  > div {
    margin-top: 5px;
  }
`

export const ArrowDownSVGStyled = styled<any>(ArrowDownSVG)`
  margin-inline-start: 20px;
  stroke-width: ${(props) => (props.isOpen ? '2' : '1')};
  stroke: ${(props) => (props.isOpen ? 'RGBA(253,23,169,0.29)' : '#737373')};
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'none')};
  width: 10px;
`

export const SelectBody = styled.div`
  cursor: pointer;
  font-weight: 500;
  color: #2d2d2d;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
`

export const ItemBody = styled.div<any>`
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => (props.highlightedIndex === props.index ? '#B5B5C3' : 'none')};
  text-align: start;
  border-radius: 4px;
  padding: 5px 10px;
  font-weight: 500;
  color: #2d2d2d;
  font-size: 14px;
  z-index: 5000;
`
