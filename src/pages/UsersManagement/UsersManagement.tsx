import {PageTitle} from '_metronic/layout/core'
import React, {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Users} from './users'
import {profileBreadCrumbs} from 'pages/profileManagement/breadCrumbs'
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
