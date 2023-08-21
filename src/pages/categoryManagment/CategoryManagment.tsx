import React from 'react'
import {useLocales} from 'hooks'
import {Navigate, Outlet, Route, Routes, useLocation} from 'react-router-dom'
import {PageLink, PageTitle} from '_metronic/layout/core'
// import {mainBreadCrumbs} from './breadCrumbs'
import {Category} from './category'

export const CategoryManagment = () => {
  const {trans} = useLocales()
  const {state}: any = useLocation()

  const mainBreadCrumbs: Array<PageLink> = [
    {
      title: trans('categories.managment', {defaultValue: 'Categories-Management'}),
      path: '/category',
      isSeparator: true,
      isActive: false,
    },
    {
      title: '',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
  ]

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
