import styled from 'styled-components'

export const IconThem = styled.span<any>`
  width: 50px;
  min-height: calc(1.5em + 1.65rem + 2px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaeaea;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`

export const Unit = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  margin-right: 1.54125rem;
  color: var(--grayTextColor);
  font-size: var(--contentSize);
  font-weight: 700;
`

export const UnitText = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--contentSize);
  font-weight: 700;
  color: var(--grayTextColor);
`

export const AmountInput = styled.input`
  border: none;
`

export const AmountBody = styled.div`
  background-color: var(--kt-input-bg);
  border: 1px solid var(--kt-input-border-color);
  box-shadow: none !important;
  border-radius: 0.475rem;
`
