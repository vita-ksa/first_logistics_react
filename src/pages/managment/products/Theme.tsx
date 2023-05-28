import {Table} from 'components/table'
import styled from 'styled-components'

export const BarChartMainHeading = styled.h2`
  font-weight: 500;
  font-size: 22px;
  line-height: 21px;
  color: #000000;
  span {
    font-size: 16px;
    color: #989696;
  }
`

export const MainHeading = styled.h3`
  font-weight: 600;
  font-size: 20px;
  color: #000000;
`

export const SubHeading = styled.h6`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-transform: capitalize;
  color: #828282;
`
export const BarChartContainer = styled.div`
  width: 45%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

export const BarChartContainerWithExtraInformation = styled.div`
  width: 55%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
export const BoldHeading = styled.h3<any>`
  font-weight: ${(props) => props.fontWeight || '600'};
  font-size: ${(props) => props.fontSize || '24px'};
  color: #000000;
`

export const GenderContainer = styled.div<any>`
  width: 40px;
  height: 40px;
  background: ${(props) => props.color};
  border-radius: 50px;
  text-align: center;
  padding-top: 10px;
  overflow: hidden;
`

export const StyledTable = styled(Table)`
  th:nth-last-child(2),
  td:nth-last-child(2) {
    width: auto !important;
  }
`
