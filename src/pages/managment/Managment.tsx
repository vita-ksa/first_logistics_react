import React from 'react'
import {PageTitle} from '_metronic/layout/core'
import {useLocales} from 'hooks'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {mainBreadCrumbs} from './breadCrumbs'
import {Products} from './products'

export const Managment = () => {
  const {trans} = useLocales()

  return (
    <Routes>
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          index
          element={
            <>
              <PageTitle breadcrumbs={mainBreadCrumbs}>{trans('breadcrumb.products')}</PageTitle>
              <Products />
            </>
          }
        />

        <Route index element={<Navigate to='/products' />} />
      </Route>
    </Routes>
  )
}
