import {Navigate, Routes} from 'react-router-dom'

export function Logout() {
  return (
    <Routes>
      <Navigate to='/auth/login' />
    </Routes>
  )
}
