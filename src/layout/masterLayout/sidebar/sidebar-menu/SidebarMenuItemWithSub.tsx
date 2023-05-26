import React from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import { useLayout } from '_metronic/layout/core'
import { checkIsActive, WithChildren } from '_metronic/helpers'

type Props = {
  to: string
  title: string
  Icon?: any
  fontIcon?: string
  hasBullet?: boolean
}

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  Icon,
  fontIcon,
  hasBullet,
}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { app } = config

  return (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {Icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            <Icon className='svg-icon-2' />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
          <i className={clsx('bi fs-3', fontIcon)}></i>
        )}
        <span className='menu-title text-white'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  )
}

export { SidebarMenuItemWithSub }
