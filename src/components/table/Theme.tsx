import styled from 'styled-components'

export const TableBudy = styled.div`
  th:nth-last-child(-n + 1),
  td:nth-last-child(-n + 1) {
    text-align: center;
    width: 5% !important;
  }
`

export const EditButton = styled.button`
  background: #f5f5f7;
  padding: 4px;
  border-radius: 6px;
  border: none;
`

export const TitlwBody = styled.div<any>`
  display: flex;
  align-items: center;
  border-left: ${(props) => (props?.showMarker ? '3px solid var(--kt-dark)' : '')};
  padding-left: 10px;
`

export const Label = styled.div`
  color: #000000;
  white-space: break-spaces;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const SymbolLabel = styled.span`
  border-radius: 50% !important;
`

export const StatsBody = styled.div`
  display: flex;
  align-items: center;
`

export const InActiveStatus = styled.div`
  width: 10px;
  height: 10px;
  margin-inline-end: 5px;
  border-radius: 50%;
  background-color: #bfbfbf;
`
export const ActiveStatus = styled(InActiveStatus)`
  background-color: #52c41a;
`

export const LoaderBody = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Footer = styled.div`
  margin-top: 15px;
  min-height: 25px;
  display: flex;
  align-items: center;
`
export const StoreLink = styled.a`
  color: #0148ff;
  span {
    margin-left: 0.5rem;
  }
`

export const BlueCircle = styled.div`
  width: 27px;
  height: 28px;
  background-color: #28a4c1;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 400;
  font-size: 16px !important;
`
