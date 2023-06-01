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

export const AddTypeContainer = styled.div`
  width: 100%;
  input {
    width: 80%;
  }
`
export const NoteMsg = styled.p`
  color: #7e7e7e;
  margin-top: 0.3rem;
`

export const InputControllerMinimumMargin = styled(InputFormController)`
  margin-bottom: 0 !important;
`

export const Title = styled.div`
  color: #000000;
  font-size: 16px;
`
