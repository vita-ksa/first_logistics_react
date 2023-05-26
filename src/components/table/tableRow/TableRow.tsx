import clsx from 'clsx'
import React, {FC} from 'react'
import {Row} from 'react-table'

type Props = {
  row: Row<any>
}

export const TableRow: FC<Props> = ({row}) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps()}
            className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
          >
            {cell.render('Cell')}
          </td>
        )
      })}
    </tr>
  )
}
