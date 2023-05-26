import { Button } from 'components'
import React from 'react'
import { useLocales } from 'hooks'
import { ReactComponent as SearchSVG } from 'assets/icons/gray-search.svg'
import { CSVLink } from "react-csv";
import { useNotification } from 'hooks/useNotification';

export const Toolbar = ({ count,
  searchAction, title, onClickAction, searchInput,
  searchPlaceholder = 'g.search', Filter, setFilters, exportData = false, dataToExport, renderCount = true }: any) => {

  const { trans, Trans } = useLocales()
  const {success} = useNotification();  
  return (
    <div
      className='d-flex justify-content-between flex-wrap  align-items-center border-0 pt-6'
      style={{ minHeight: 70 }}
    >
       <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        {renderCount ? `(${count || 0})` : null} {title}
      </div>
      <div
        className='card-toolbar d-flex align-items-center flex-wrap'
        style={{
          margin: ' 0.5rem 0',
        }}
      >
        {searchInput ? (
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <SearchSVG width="1.5rem" height="1.5rem" className='svg-icon-1 position-absolute ms-6' />
              <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid bg-white ps-14 me-3'
                style={{ width: 312 }}
                placeholder={
                  trans(searchPlaceholder, { defaultValue: 'Search user' }) as any
                }
                onChange={(e) => searchAction(e.target.value)}
              />
            </div>
          </div>
        ) : null}
        {Filter ? <Filter setFilters={setFilters} /> : null}
        {exportData && (
          <CSVLink
            data={dataToExport}
            onClick={() => success({ message: "Users list has been exported to excel successfully"})}
            className='btn btn-white btn-active-white btn-color-gray-600 me-3'
            filename={"tamreeni-results.csv"}
          >Export</CSVLink>
        )}
        {onClickAction && (<div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
          <Button onClick={onClickAction}>
            <Trans i18nKey={'g.add.new'}>Add New</Trans>
          </Button>
        </div>)}
      </div>
    </div>
  )
}
