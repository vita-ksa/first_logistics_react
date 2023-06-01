import React from 'react'
import {Outlet} from 'react-router-dom'
import {Navbar} from './navbar'
import styles from 'pages/landingPage/style'
import 'theme/landingTheme.scss'

export const LandingLayout = () => {
  return (
    <div className='w-full overflow-hidden bg-black-gradient-2'>
      <div
        style={{position: 'sticky', zIndex: 444}}
        className={`${styles.paddingX} ${styles.flexCenter} w-full bg-black-gradient-2  `}
      >
        <div className={`${styles.boxWidth} `}>
          <Navbar />
        </div>
      </div>

      <Outlet />
    </div>
  )
}
