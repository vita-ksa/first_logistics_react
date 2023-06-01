import {PageTitle} from '_metronic/layout/core'
import {useLocales} from 'hooks'
import React from 'react'
import {Navigate, Outlet, Route, Routes, useLocation} from 'react-router-dom'
import {addOrderBreadCrumbs, getEditProgramBreadCrumbs, mainBreadCrumbs} from './breadCrumbs'
import {Orders} from './orders'
import {AddOrder} from './orders/addOrder'
import {EditOrder} from './orders/editOrder'

export const OrdersManagment = () => {
  const {trans} = useLocales()
  const {state}: any = useLocation()

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle breadcrumbs={mainBreadCrumbs}>{trans('sidebar.orders')}</PageTitle>
              <Orders />
            </>
          }
        />

        <Route
          path='addOrder'
          element={
            <>
              <PageTitle breadcrumbs={addOrderBreadCrumbs}>{trans('title.add.order')}</PageTitle>
              <AddOrder />
            </>
          }
        />
        <Route
          path='editOrder'
          element={
            <>
              <PageTitle breadcrumbs={getEditProgramBreadCrumbs(state?.orderNumber)}>
                {trans('title.edit.order')}
              </PageTitle>
              <EditOrder />
            </>
          }
        />
        <Route index element={<Navigate to='/orders' />} />
      </Route>
    </Routes>
  )
}
