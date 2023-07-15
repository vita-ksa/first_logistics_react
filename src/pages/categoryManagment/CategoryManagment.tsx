import React from 'react'
import {useLocales} from 'hooks'
import {Navigate, Outlet, Route, Routes, useLocation} from 'react-router-dom'
import {PageTitle} from '_metronic/layout/core'
import {mainBreadCrumbs} from './breadCrumbs'
import {Category} from './category'

export const CategoryManagment = () => {
  const {trans} = useLocales()
  const {state}: any = useLocation()

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
              <PageTitle breadcrumbs={mainBreadCrumbs}>{trans('sidebar.categories')}</PageTitle>
              <Category />
            </>
          }
        />

        <Route index element={<Navigate to='/category' />} />
      </Route>
    </Routes>
  )
}
