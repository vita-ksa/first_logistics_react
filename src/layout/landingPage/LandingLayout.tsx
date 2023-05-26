import React from 'react'
import {Outlet} from 'react-router-dom'
import {Navbar} from './navbar'
import styles from 'pages/landingPage/style'

export const LandingLayout = () => {
  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter} w-full  `}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <Outlet />
    </div>
  )
}
