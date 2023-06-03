import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const InputBody = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
`

export const Input = styled.input`
  box-shadow: none !important;
  margin-inline-end: 10px;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  cursor: pointer;
`

export const Label = styled.label`
  font-size: 14px;
  color: #000000;
  font-weight:500;
  .required {
    &:after {
        content: "*";
        position: relative;
        font-size: inherit;
        color: var(--kt-danger);
        padding-left: 0.25rem;
        font-weight: $font-weight-bold;
    }
}
`

export const Title = styled(Label)`
  color: #121212;
  margin-bottom: 10px;
`
