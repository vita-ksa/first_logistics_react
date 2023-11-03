import {Button} from 'components'
import styled, {css} from 'styled-components'

export const SubmitButton = styled(Button)<any>`
  height: 48px;
  background-color: ${(props) => props.disabled && '#585a65'};
`

export const CardBody = styled.div`
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
`

export const CancelButton = styled.button`
  border: none;
  background: #ebebeb !important;
  font-size: 15px;
  border-radius: 8px;
  font-weight: 500;
  width: 90px;
  height: 48px;
  margin-inline-end: 15px;
  &:hover:not(.disabled),
  &:focus:not(.disabled) {
    color: #000 !important;
  }
`

export const BackButton = styled<any>(CancelButton)`
  ${(props) =>
    !props.show
      ? css`
          visibility: hidden;
        `
      : ``}
`
