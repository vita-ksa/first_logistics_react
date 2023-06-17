import React from 'react'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {Outlet, Route, Routes} from 'react-router-dom'
import {PriceCalculation} from './PriceCalculation'
import {useLocales} from 'hooks'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/dashboard',
    isSeparator: true,
    isActive: false,
  },
]

export const PriceCalculationManagment = () => {
  const {trans} = useLocales()

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {trans('breadcrumb.price.calculation', {defaultValue: 'price Calculation'})}
              </PageTitle>
              <PriceCalculation />
            </>
          }
        />
      </Route>
    </Routes>
  )
}
