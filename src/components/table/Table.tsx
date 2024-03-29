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
import {useSelector} from 'react-redux'

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
  overFlowX,
  searchType,
}: any) => {
  const [search, setSearch] = useState(undefined)
  const [pageCount, setPageCount] = useState<any>(1)
  const [filters, setFilters] = useState(null)
  const {searchAction} = useSearch({action: setSearch})

  const columns = useMemo(() => initColumns, [])
  const nodata = useMemo(() => noDataProps, [])

  const {lang} = useSelector<any>((state) => state?.locales) as any

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
          searchType,
        }}
      />

      <KTCard className={`mt-4  border-0 ${cardClassName}`}>
        <KTCardBody className='py-4'>
          <TableBudy
            className={`${className} table-responsive`}
            style={{overflowX: overFlowX && 'unset'}}
          >
            <table
              id='kt_table_users'
              className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'
              {...getTableProps()}
            >
              <thead>
                <tr className='fw-bold text-muted'>
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
                          <Loader width={'50px'} height={'50px'} />
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
          <div className={`d-flex align-items-center ${lang === 'en' ? 'ms-auto' : 'mr-auto'} `}>
            <Pagination {...{pageCount, handlePageClick}} initialPage={pageIndex} lang={lang} />
          </div>
        </Footer>
      ) : null}
    </>
  )
}
