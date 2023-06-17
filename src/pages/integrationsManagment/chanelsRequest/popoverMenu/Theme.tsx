import styled from 'styled-components'
import {ReactComponent as DeleteSVG} from 'assets/icons/table/delete.svg'
import {ReactComponent as EditSVG} from 'assets/icons/table/edit.svg'
import {ReactComponent as ViewSVG} from 'assets/icons/eye-41.svg'

export const PopoverBody = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 7px #00000029;
  min-height: 58px;
  z-index: 1010;
  width: 120px;
  border-radius: 5px;

  padding: 7px 9px;
  justify-content: center;
  display: flex;
  flex-flow: column;
  > div:first-child {
    margin-top: auto;
  }
`
export const ItemPopover = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  cursor: pointer;
  text-align: start;
  border-radius: 4px;
  padding: 5px 10px;
  min-height: 37px;
  font-weight: 500;
  border: 0;
  gap: 10px;
  color: ${(props) => (props.disabled ? '#D7D7D7' : '#22224A')};
  > svg {
    fill: ${(props) => (props.disabled ? '#D7D7D7' : '#2D2D2D')};
    width: 20px;
  }
  background: transparent;
  :hover {
    background: ${(props) => (!props.disabled ? '#E3ECFF' : 'none')};
  }
`
export const EditSVGStyled = styled(EditSVG)`
  /* margin-inline-end: 9px; */
`

export const DeleteSVGStyled = styled(DeleteSVG)`
  /* margin-inline-end: 9px; */
`
export const ViewSVGStyled = styled(ViewSVG)`
  /* margin-inline-end: 9px; */
`
