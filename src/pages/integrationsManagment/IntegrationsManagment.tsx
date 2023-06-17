import {PageTitle} from '_metronic/layout/core'
import {capitalize} from 'lodash'
import React, {useCallback, useEffect} from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {
  getSalesChannelBreadCrumbs,
  getSalesChannelRequestsBreadCrumbs,
  getShippingPartnarBreadCrumbs,
  getShippingRequestsBreadCrumbs,
} from './breadCrumbs'
import {IntegrationsManagmentHeader} from './IntegrationsManagmentHeader'
import {MoreConnections, Connected} from './shippingPartners'
import {MoreConnectionsSales, ConnectedSales} from './salesChannels'
import {useLocales, useNotification} from 'hooks'
import {useDispatch, useSelector} from 'react-redux'
import {integrationsAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {ShopRequested} from './shopRequested'
import {ShippingPartnerHeader} from './shippingPartners/shippingPartnerHeader'
import {ChanelsRequest} from './chanelsRequest'

export const IntegrationsManagment = () => {
  const {Trans, trans} = useLocales()
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type)
  const reloadData = useSelector((state: any) => [
    state?.connectToDeliveryState?.entities,
    state?.connectToShopState?.entities,
  ])

  const fetchData = useCallback(async ({search}: any) => {
    const urlParams =
      userType?.toLowerCase() === 'deliverycompany'
        ? `/delivery-company/shops`
        : '/order/delivery-list'

    const {payload} = await dispatch(
      integrationsAPI.getDeliveryList()({
        urlParams,
        // filters: filters || {},
      })
    )
    userType?.toLowerCase() === 'deliverycompany'
      ? dispatch(integrationsAPI.getDeliveryListSlice.actions.getConnectdSalesChanelsList())
      : dispatch(integrationsAPI.getDeliveryListSlice.actions.getConnectdList())

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  useEffect(() => {
    fetchData({})
  }, [...reloadData])

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
          path='shiping-partners'
          element={
            <>
              <IntegrationsManagmentHeader />
              <Outlet />
            </>
          }
        >
          <Route
            path='more-connection'
            element={
              <>
                <PageTitle breadcrumbs={getShippingPartnarBreadCrumbs}>
                  {trans('sidebar.order', {defaultValue: 'More Connections'})}
                </PageTitle>
                <MoreConnections />
              </>
            }
          />
          <Route
            path='connected-partners'
            element={
              <>
                <PageTitle breadcrumbs={getShippingPartnarBreadCrumbs}>
                  {trans('sidebar.order', {defaultValue: 'Connected'})}
                </PageTitle>
                <Connected />
              </>
            }
          />
          <Route index element={<Navigate to='/shiping-partners/more-connection' />} />
        </Route>
        <Route
          path='sales-channels'
          element={
            <>
              <PageTitle breadcrumbs={getSalesChannelBreadCrumbs}>More Connections</PageTitle>
              <ShippingPartnerHeader />
              <Outlet />
            </>
          }
        >
          <Route
            path='online-stores'
            element={
              <>
                <PageTitle breadcrumbs={getSalesChannelBreadCrumbs}>
                  {trans('sidebar.order', {defaultValue: 'More Connections'})}
                </PageTitle>
                <MoreConnectionsSales />
              </>
            }
          />
          <Route
            path='connected-stores'
            element={
              <>
                <PageTitle breadcrumbs={getSalesChannelBreadCrumbs}>
                  Connected Sales Channels
                </PageTitle>
                <ConnectedSales />
              </>
            }
          />
          <Route index element={<Navigate to='/sales-channels/online-stores' />} />
        </Route>

        <Route
          path='requests'
          element={
            <>
              <PageTitle breadcrumbs={getShippingRequestsBreadCrumbs}>
                {trans('sidebar.order', {defaultValue: 'Requests'})}
              </PageTitle>
              <ShopRequested />
            </>
          }
        />
        <Route
          path='shop-requests'
          element={
            <>
              <PageTitle breadcrumbs={getSalesChannelRequestsBreadCrumbs}>
                {trans('sidebar.order', {defaultValue: 'Requests'})}
              </PageTitle>
              <ChanelsRequest />
            </>
          }
        />
      </Route>
    </Routes>
  )
}
