import {FC, Suspense, lazy} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'layout/masterLayout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '_metronic/assets/ts/_utils'
import {WithChildren} from '_metronic/helpers'
import {DashboardManagement} from 'pages/dashboardManagment'

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

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard/*' element={<DashboardManagement />} />

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
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
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
