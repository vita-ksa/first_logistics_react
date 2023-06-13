import {DropdownController, InputFormController} from 'components'
import styled from 'styled-components'

export const FormBody = styled.div`
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    width: 100%;
  }
`

export const DropdownControllerStyled = styled(DropdownController)`
  width: 100%;
`

export const InputControllerMinimumMargin = styled(InputFormController)`
  margin-bottom: 0 !important;
`
export const Title = styled.div`
  color: #000000;
  font-size: 16px;
`
export const CardBody = styled.div`
  background: #ffffff;
  border-radius: 16px;
`
