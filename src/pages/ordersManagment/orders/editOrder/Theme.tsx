import {Button} from 'components'
import styled from 'styled-components'

export const CardBody = styled.div`
  background: #ffffff;
  border-radius: 16px;
`

export const SubmitButton = styled(Button)`
  height: 48px;
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
