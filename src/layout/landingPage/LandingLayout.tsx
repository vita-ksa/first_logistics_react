import React from 'react'
import {Outlet} from 'react-router-dom'
import {Navbar} from './navbar'
import 'theme/landingTheme.scss'
import styled from 'styled-components'
import {Footer} from 'pages/landingPage/footer'
import styles from 'pages/landingPage/style'

export const LandingLayout = () => {
  return (
    <div className='w-full overflow-hidden '>
      <>
        <>
          <Navbar />
        </>
      </>
      <Container>
        <Outlet />
      </Container>
      {/* <Footer /> */}
    </div>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    /* background: url('/images/home-background.png') center center / cover no-repeat fixed; */
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`
