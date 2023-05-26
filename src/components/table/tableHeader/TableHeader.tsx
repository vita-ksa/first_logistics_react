import React, {FC} from 'react'
import {ArrowDownSVGStyled, ArrowUPSVGStyled} from './Theme'

type Props = {
  column: any
}

export const TableHeader: FC<Props> = ({column}) => {
  return (
    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
      {column.render('Header')}
      {column.canSort ? (
        <span className=''>
          {column?.isSortedDesc ? <ArrowUPSVGStyled /> : <ArrowDownSVGStyled />}
        </span>
      ) : null}
    </th>
  )
}
