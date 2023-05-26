import styled from 'styled-components'

export const Body = styled.div<any>`
  position: fixed;
  top: 3rem;
  z-index: 999;
  right: 3rem;
  width: 439px;
  max-width: 439px;
  background: ${(props) => props.bg};
  padding: 15px;
  color: #000000;
  position: fixed;
  z-index: 13000;
  margin-top: ${(props) => (props.show ? '0px' : '-100px')};
  transition: all 0.5s ease;
`
