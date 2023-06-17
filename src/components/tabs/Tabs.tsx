import React from 'react'
import {Link, useLocation} from 'react-router-dom'

interface TabsProps {
  list?: any
}

export const Tabs = ({list}: TabsProps) => {
  const location = useLocation()

  return (
    <div className='d-flex overflow-auto h-55px'>
      <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
        {list?.map((item: any) => (
          <li key={item?.id} className='nav-item'>
            <Link
              className={`nav-link  me-6 ` + (location.pathname === item?.to && 'active')}
              style={{
                color: `${location.pathname === item?.to ? '#000' : ''}`,
              }}
              to={item?.to}
            >
              {item?.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
