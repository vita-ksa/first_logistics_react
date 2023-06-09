import React from 'react'
import ReactPaginate from 'react-paginate'
import {ReactComponent as NextPageSVG} from 'assets/icons/table/next-page.svg'
import {ReactComponent as PeviousPageSVG} from 'assets/icons/table/pevious-page.svg'

export const Pagination = ({pageCount, handlePageClick, initialPage}: any) => {
  return (
    <div className='col-sm-12 align-items-center justify-content-center justify-content-md-end'>
      <div id='kt_table_users_paginate'>
        <ReactPaginate
          className='pagination align-items-center '
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='page-item active'
          previousClassName='page-item previous'
          nextClassName='page-item next'
          breakLabel='...'
          nextLabel={<NextPageSVG width={12} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel={<PeviousPageSVG width={12} />}
          forcePage={initialPage}
        />
      </div>
    </div>
  )
}
