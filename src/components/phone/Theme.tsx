import styled from 'styled-components'
import Input from 'react-phone-number-input/input'

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 46px;
  padding: 0;
  overflow: hidden;
  position: relative;
`

export const SelectBody = styled.select`
  height: 100% !important;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0;
  border: none;
  outline: none;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  outline: none;
  appearance: none;
  background: #eaeaea;
  background-image: linear-gradient(45deg, transparent 50%, #ccc 50%),
    linear-gradient(135deg, #ccc 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;

  /* scrollbar styles */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
  }
`
export const PhoneInput = styled(Input)<any>`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin: 0;
  /* background: transparent; */
  border: none;
  .PhoneInputInput {
    border: none;
    background: #f5f8fa;
  }
  .PhoneInputInput:focus {
    outline: none !important;
    background: #f5f8fa !important;
  }
`
export const OptionItem = styled.option`
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  background: #f5f8fa;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  outline: 0px;
  &:hover {
    background-color: #ddd !important;
  }
`
