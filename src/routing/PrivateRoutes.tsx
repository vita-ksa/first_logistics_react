import {FC, Suspense, lazy} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'layout/masterLayout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '_metronic/assets/ts/_utils'
import {WithChildren} from '_metronic/helpers'
import {DashboardManagement} from 'pages/dashboardManagment'
import {PriceCalculationManagment} from 'pages/priceCalculationManagment'
import {useSelector} from 'react-redux'

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

const CategoryManagment = lazy(() =>
  import('pages/categoryManagment').then((m) => ({
    default: m.CategoryManagment,
  }))
)

const UsersManagement = lazy(() =>
  import('pages/UsersManagement').then((m) => ({
    default: m.UsersManagement,
  }))
)

const PrivateRoutes = () => {
  const userRole = useSelector((state: any) => state?.auth?.entities?.user?.role)
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route
          path='auth/*'
          element={
            <Navigate to={`${userRole === 'ADMIN' ? '/category' : '/profile-management'}`} />
          }
        />
        {/* Pages */}
        {/* <Route path='dashboard/*' element={<DashboardManagement />} />
        <Route path='price-calculation' element={<PriceCalculationManagment />} /> */}

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
        <Route
          path='category/*'
          element={
            <SuspensedView>
              <CategoryManagment />
            </SuspensedView>
          }
        />
        <Route
          path='user-management/*'
          element={
            <SuspensedView>
              <UsersManagement />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/' />} />
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
