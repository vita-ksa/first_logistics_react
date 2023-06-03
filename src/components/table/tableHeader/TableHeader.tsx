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
    <Th className='min-w-150px' {...column.getHeaderProps(column.getSortByToggleProps())}>
      {column.canSort ? (
        <div className='d-flex align-items-center'>
          {column.render('Header')}
          <span>{column?.isSortedDesc ? <ArrowUPSVGStyled /> : <ArrowDownSVGStyled />}</span>
        </div>
      ) : (
        <>{column.render('Header')}</>
      )}
    </Th>
  )
}
