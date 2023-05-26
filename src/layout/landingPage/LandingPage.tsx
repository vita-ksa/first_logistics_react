import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {LandingLayout} from './LandingLayout'
import {LandingPage as Landing} from 'pages/landingPage'

export const LandingPage = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path='/' element={<Landing />} />

        <Route index element={<Landing />} />
      </Route>
    </Routes>
  )
}
