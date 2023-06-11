import styled from 'styled-components'
// import { SwitchButtonController } from 'components'

export const IconButtons = styled.button<any>`
  padding: 0.5rem !important;
  background: ${(props) => (props.isBlocked ? '#FD17A9' : '#F5F5F7')};
  :hover {
    background: ${(props) => (props.isBlocked ? '#FD17A9' : '#F5F5F7')};
  }
`

// export const Input = styled(SwitchButtonController) <any>`
//   input{
//     height: 1.2rem !important;
//     width: 2.2rem !important;
//   }
// `

export const DetailsTypography = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #797979;
  margin-top: 8px;
  display: flex;
  align-items: center;
`

export const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`

export const ImageContainer = styled.div`
  width: 136px;
  height: 100%;
`
export const UserNameTypography = styled.h2`
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
`
