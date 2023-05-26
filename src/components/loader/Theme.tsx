import styled from 'styled-components'

import Spinner from 'react-bootstrap/Spinner'

export const Loader = styled(Spinner)<any>`
  color: ${(props) => props?.color};
  width: ${(props) => props?.width};
  height: ${(props) => props?.height};
`
