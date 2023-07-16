import styled from 'styled-components'
import { Button as LoadingButton } from 'components'

export const Button = styled(LoadingButton)<any>`
  background: ${(props) => props.color } !important;
  :hover {
    background-color: ${(props) => props.color } !important;
  }
  font-weight: 500;
  font-size: 16px;
`

export const ConfirmMsg = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #313131;
  letter-spacing: 0.03em;
  & > strong {
    color: #000000;
    font-weight: 600;
  }
`
