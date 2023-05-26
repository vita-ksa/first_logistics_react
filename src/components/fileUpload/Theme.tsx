import styled from 'styled-components'

export const Image = styled.img`
  width: 100%;
  height: 100%;
`
export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const Label = styled.label<any>`
  font-size: 15px;
  text-align: left;
  background: ${(props) => props?.editMode && 'transparent !important'};
`

export const ClearButton = styled.div`
  position: absolute;
  bottom: -8px;
  right: -6px;
  background-color: #ffffff;
  border-radius: 50px;
  width: 22px;
  height: 22px;
  box-shadow: 0px 0px 4px rgba(155, 155, 155, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #a2a5b5;
  font-size: 12px;
  cursor: pointer;
`
export const UplaodBody = styled.div`
  & > label {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`
export const SymbolBody = styled.div`
  width: 121px;
  height: 127px;
  position: relative;
  background: #f6f6f6;
  border: 2px solid #ffffff;
  border-radius: 8px;
  overflow: hidden;
`
