import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from 'app/modules/errors/ErrorsPage'
import {Logout, AuthPage} from 'app/modules/auth'
import {App} from 'app/App'
import {useSelector} from 'react-redux'
import {LandingPage} from 'layout/landingPage'

const AppRoutes: FC = () => {
  const authToken = useSelector<any>((state) => state.auth?.entities?.tokens?.token)
  const tempToken = useSelector<any>((state) => state.auth?.tempToken?.access?.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {tempToken || authToken ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='' element={<LandingPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
