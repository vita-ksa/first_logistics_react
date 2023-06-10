import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {LandingLayout} from './LandingLayout'
import {LandingPage as Landing} from 'pages/landingPage'
import {Home} from 'pages/landingPage/home'
import {Features} from 'pages/landingPage/features'
import {UseCases} from 'pages/landingPage/useCases'
import {Integrations} from 'pages/landingPage/integrations'
import {AnimatePresence} from 'framer-motion'

export const LandingPage = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={<LandingLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/use-Cases' element={<UseCases />} />
          <Route path='/integrations' element={<Integrations />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
