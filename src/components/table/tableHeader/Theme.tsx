import { ReactComponent as ArrowDownSVG } from 'assets/icons/table/arrow-down.svg'
import styled from 'styled-components'

export const ArrowDownSVGStyled = styled<any>(ArrowDownSVG)`
  margin-inline-start: 5px;

  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'none')};
  width: 10px;
`
export const ArrowUPSVGStyled = styled<any>(ArrowDownSVG)`
  margin-inline-start: 5px;

  transform: rotate(180deg);
  width: 10px;
`