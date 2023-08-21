import {PageLink, PageTitle} from '_metronic/layout/core'
import React, {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Users} from './users'

import {DeliveryCompanies} from './deliveryCompanies'
import {useLocales} from 'hooks'

export const UsersManagement = () => {
  const {trans} = useLocales()

  useEffect(() => {
    document.title = 'Users Management'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  const profileBreadCrumbs: Array<PageLink> = [
    {
      title: trans('sidebar.users.management', {defaultValue: 'Users Management'}),
      path: '/user-management',
      isSeparator: true,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: false,
      isActive: true,
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
          path='shops'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {trans('sidebar.users.management.shops')}
              </PageTitle>
              <Users />
            </>
          }
        />
        <Route
          path='delivery-companies'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {trans('sidebar.users.management.delivery.company')}
              </PageTitle>
              <DeliveryCompanies />
            </>
          }
        />

        {/* <Route index element={<Navigate to='/user-management/shops' />} /> */}
      </Route>
    </Routes>
  )
}
