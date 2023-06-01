import React, {useState} from 'react'
import logo from 'assets/icons/default-small.svg'
import close from 'assets/icons/close.svg'
import menu from 'assets/icons/menu.svg'
import {navLinks} from 'constants/landing-data'

export const Navbar = () => {
  const [active, setActive] = useState('Home')
  const [toggle, setToggle] = useState(false)

  return (
    <nav className='flex items-center justify-between w-full py-6 navbar '>
      <img src={logo} alt='hoobank' className='w-[124px] h-[32px]' />

      <ul className='items-center justify-end flex-1 hidden list-none sm:flex'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? 'text-white' : 'text-dimWhite'
            } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
            onClick={() => setActive(nav.title)}
          >
            <a className='text-white' href={`#${nav.id}`}>
              {nav.title}
            </a>
          </li>
        ))}
      </ul>

      <div className='flex items-center justify-end flex-1 cursor-pointer sm:hidden'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className='flex flex-col items-start justify-end flex-1 list-none'>
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? 'text-white' : 'text-dimWhite'
                } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                onClick={() => setActive(nav.title)}
              >
                <a className='text-white' href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
