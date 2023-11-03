import styled from 'styled-components'

export const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Wrap = styled.label`
  /* padding-top: 56.25%; */
  height: 100px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    img {
      inset: 0px;
      display: block;
      height: 100%;
      object-fit: cover;
      opacity: 1;
      position: absolute;
      transition: opacity 500ms ease-in-out 0s;
      width: 100%;
      z-index: 1;
      top: 0;
    }
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`
export const ConnectButton = styled.button`
  /* position: absolute; */
  background-color: transparent;
  outline-color: transparent;
  border: none;
  color: #3d5fff;
  z-index: 1114;
  right: 0;
  bottom: 0;
  margin-right: 8px;
  font-weight: 600;
`
export const InfoBody = styled.div`
  height: 100%;
  padding: 10px;
  justify-content: space-between;
  display: flex;
  flex-flow: column;
  width: 100%;
  align-items: flex-start;
  & > span {
    font-weight: bold;
  }
`
