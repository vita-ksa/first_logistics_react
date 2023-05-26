import {Route, Routes} from 'react-router-dom'
import {Login} from 'pages/Login/Login'
import {AuthLayout} from './AuthLayout'
import {Registration} from 'pages/registration'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
