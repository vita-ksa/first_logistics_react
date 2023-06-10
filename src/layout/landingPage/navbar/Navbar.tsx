import React from 'react'
import logo from 'assets/icons/default-small.svg'
import menu from 'assets/icons/menu.svg'
import {navLinks} from 'constants/landing-data'
import {DropDown, Login, Logo, Nav, NavMenu, SignOut, UserImg} from './Theme'
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <Nav>
      <Logo>
        <img src={logo} alt='firstLogistics' />
      </Logo>

      <>
        <NavMenu>
          {navLinks.map((nav, index) => (
            <Link to={nav.path} key={nav.id}>
              <span> {nav.title}</span>
            </Link>
          ))}
        </NavMenu>
        <>
          <Login to='/auth/login'>Login</Login>
        </>
        <SignOut>
          <UserImg src={menu} alt={'userName'} />
          <DropDown>
            {navLinks.map((nav, index) => (
              <Link to={nav.path} key={nav.id}>
                <span> {nav.title}</span>
              </Link>
            ))}
          </DropDown>
        </SignOut>
      </>
    </Nav>
  )
}
