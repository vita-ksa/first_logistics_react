import {InputFormController, SwitchButtonController} from 'components'
import styled from 'styled-components'

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const InputFormControllerStyled = styled(InputFormController)`
  height: 1.2rem !important;
  width: 2.2rem !important;
`
export const IconButtons = styled.button`
  padding: 0.5rem !important;
`
export const GrayTitle = styled.h3`
  color: #525252;
`

export const SpanIcon = styled.span`
  margin-right: 1.25rem !important;
  color: #797979;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
`
export const Description = styled.p`
  color: #8d8d8d;
  font-size: 14px;
  width: 80%;
`

export const TableDiv = styled.div`
  width: calc(100% / 4);
  border-right: 1px solid #e0e0e0;
  padding: 15px;
  h4 {
    color: var(--kt-headings-color);
    outline: 0;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`

export const DarkHeading = styled.h5`
  color: #828282;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: pre-line;
`
export const ScheduleSpan = styled(SpanIcon)<any>`
  margin-right: 0rem !important;
  font-weight: 500;
`

export const ScheduleFileHref = styled.a`
  font-weight: 500;
  font-size: 12px;
  text-decoration-line: underline;
  color: #1250c7;
  cursor: pointer;
`
export const Input = styled(SwitchButtonController)<any>`
  input {
    height: 1.2rem !important;
    width: 2.2rem !important;
  }
`
