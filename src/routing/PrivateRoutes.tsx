import {FC, Suspense, lazy} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'layout/masterLayout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '_metronic/assets/ts/_utils'
import {WithChildren} from '_metronic/helpers'
import {DashboardManagement} from 'pages/dashboardManagment'
import {PriceCalculationManagment} from 'pages/priceCalculationManagment'

const Management = lazy(() =>
  import('pages/managment').then((m) => ({
    default: m.Managment,
  }))
)

const OrdersManagement = lazy(() =>
  import('pages/ordersManagment').then((m) => ({
    default: m.OrdersManagment,
  }))
)

const ProfileManagement = lazy(() =>
  import('pages/profileManagement').then((m) => ({
    default: m.ProfileManagement,
  }))
)

const IntegrationsManagment = lazy(() =>
  import('pages/integrationsManagment').then((m) => ({
    default: m.IntegrationsManagment,
  }))
)

const CredentialsManagment = lazy(() =>
  import('pages/credentialsManagment').then((m) => ({
    default: m.CredentialsManagment,
  }))
)

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/price-calculation' />} />
        {/* Pages */}
        <Route path='dashboard/*' element={<DashboardManagement />} />
        <Route path='price-calculation' element={<PriceCalculationManagment />} />

        {/* Lazy Modules */}
        <Route
          path='products/*'
          element={
            <SuspensedView>
              <Management />
            </SuspensedView>
          }
        />
        <Route
          path='orders/*'
          element={
            <SuspensedView>
              <OrdersManagement />
            </SuspensedView>
          }
        />
        <Route
          path='profile-management/*'
          element={
            <SuspensedView>
              <ProfileManagement />
            </SuspensedView>
          }
        />
        <Route
          path='/*'
          element={
            <SuspensedView>
              <IntegrationsManagment />
            </SuspensedView>
          }
        />
        <Route
          path='credentials/*'
          element={
            <SuspensedView>
              <CredentialsManagment />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/price-calculation' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
