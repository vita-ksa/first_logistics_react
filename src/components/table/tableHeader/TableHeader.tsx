import React, {FC} from 'react'
import {ArrowDownSVGStyled, ArrowUPSVGStyled} from './Theme'
import styled from 'styled-components'

type Props = {
  column: any
}

const Th = styled.th`
  & > svg {
    display: unset;
  }
`

export const TableHeader: FC<Props> = ({column}) => {
  return (
    <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
      {column.render('Header')}
      {column.canSort ? (
        <span className=''>
          {column?.isSortedDesc ? <ArrowUPSVGStyled /> : <ArrowDownSVGStyled />}
        </span>
      ) : null}
    </Th>
  )
}
