import styled from 'styled-components'
import {Table} from 'components'

export const StyledTable = styled(Table)`
  th:nth-last-child(1),
  td:nth-last-child(1) {
    width: auto !important;
  }
`
export const Name = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  font-weight: 500;
`
export const SenderInfo = styled(Name)`
  font-size: 12px;
  color: rgb(176, 176, 176);
`
