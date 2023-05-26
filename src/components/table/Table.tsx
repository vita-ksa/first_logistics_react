import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {ColumnInstance, Row, useFilters, usePagination, useSortBy, useTable} from 'react-table'
import {KTCard, KTCardBody} from '_metronic/helpers'
import {TableHeader} from './tableHeader'
import {TableRow} from './tableRow'
import {DropdownSelect, NoData, Pagination} from 'components'
import {LoaderBody, TableBudy, Footer} from './Theme'
import {Toolbar} from './toolbar'
import {useSearch} from 'hooks'
import {Loader} from 'components/loader'

export const Table = ({
  searchPlaceholder,
  columns: initColumns,
  data,
  className = '',
  noDataProps,
  count,
  title,
  onClickAction,
  fetchData,
  searchInput,
  loading,
  reloadData = [],
  Filter = null,
  exportData,
  renderCount,
  pagination = true,
  footer = true,
  defaultPageSize = 10,
  cardClassName,
}: any) => {
  const [search, setSearch] = useState(undefined)
  const [pageCount, setPageCount] = useState<any>(1)
  const [filters, setFilters] = useState(null)
  const {searchAction} = useSearch({action: setSearch})

  const columns = useMemo(() => initColumns, [])
  const nodata = useMemo(() => noDataProps, [])

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
    page,
    setPageSize,
    gotoPage,
    state: {pageIndex, pageSize, sortBy},
  }: any = useTable<any>(
    {
      columns,
      data,
      manualSortBy: false,
      autoResetSortBy: false,
      manualPagination: true,
      autoResetFilters: false,
      autoResetPage: false,
      manualFilters: true,
      pageCount,
      initialState: {pageIndex: 0, pageSize: defaultPageSize},
    } as any,
    useFilters,
    useSortBy,
    usePagination
  )

  const onChangePageSize = useCallback((value: any) => {
    setPageSize(Number(value))
  }, [])

  const handlePageClick = (event: any) => {
    gotoPage(event?.selected)
  }

  useEffect(() => {
    setPageCount(Math.ceil(count / Number(pageSize)))
  }, [count, pageSize])

  useEffect(() => {
    fetchData({pageIndex, pageSize, sortBy, search, filters})
  }, [fetchData, pageSize, pageIndex, search, ...reloadData, filters])

  useEffect(() => {
    gotoPage(0)
  }, [search])

  if (data?.length === 0 && pageIndex > 0) {
    gotoPage(pageIndex - 1)
  }
  return (
    <>
      <Toolbar
        {...{
          title,
          count,
          searchAction,
          onClickAction,
          searchInput,
          searchPlaceholder,
          Filter,
          setFilters,
          exportData,
          renderCount,
          dataToExport: data,
        }}
      />

      <KTCard className={`mt-4  border-0 ${cardClassName}`}>
        <KTCardBody className='py-4'>
          <TableBudy className={`${className} table-responsive`}>
            <table
              id='kt_table_users'
              className='settings-table table align-middle table-row-dashed fs-6 gy-3 dataTable no-footer'
              {...getTableProps()}
            >
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 gs-0'>
                  {headers.map((column: ColumnInstance<any>) => (
                    <TableHeader key={column.id} column={column} />
                  ))}
                </tr>
              </thead>
              <tbody className='text-gray-400' {...getTableBodyProps()}>
                {rows.length > 0 ? (
                  rows.map((row: Row<any>, i: any) => {
                    prepareRow(row)
                    return <TableRow row={row} key={`row-${i}-${row.id}`} />
                  })
                ) : (
                  <tr>
                    <td colSpan={9}>
                      {loading ? (
                        <LoaderBody>
                          <Loader color={'#FD17A9'} width={'50px'} height={'50px'} />
                        </LoaderBody>
                      ) : (
                        <NoData {...nodata} />
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableBudy>
        </KTCardBody>
      </KTCard>
      {footer ? (
        <Footer>
          {pagination ? (
            <DropdownSelect
              items={[10, 25, 50]}
              onChange={onChangePageSize}
              menuStyle={{bottom: 30}}
            />
          ) : null}
          <div className='d-flex align-items-center ms-auto'>
            <Pagination {...{pageCount, handlePageClick}} initialPage={pageIndex} />
          </div>
        </Footer>
      ) : null}
    </>
  )
}
