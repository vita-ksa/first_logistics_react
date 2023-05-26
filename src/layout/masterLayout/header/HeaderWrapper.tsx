/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLayout} from '_metronic/layout/core'
import {Header} from './Header'
import defaultSmallSVG from 'assets/icons/default-small.svg'
import defaultDarkLogoSVG from 'assets/icons/default-dark.svg'
import {ReactComponent as MenuSVG} from 'assets/icons/abs015.svg'

export function HeaderWrapper() {
  const {config, classes} = useLayout()
  if (!config.app?.header?.display) {
    return null
  }

  return (
    <div id='kt_app_header' className='app-header'>
      <div
        id='kt_app_header_container'
        className={clsx(
          ' flex-lg-grow-1',
          classes.headerContainer.join(' '),
          config.app?.header?.default?.containerClass
        )}
      >
        {config.app.sidebar?.display && (
          <>
            <div
              className='d-flex align-items-center d-lg-none ms-2 me-2'
              title='Show sidebar menu'
            >
              <div
                className='btn btn-icon btn-active-color-primary w-35px h-35px'
                id='kt_app_sidebar_mobile_toggle'
              >
                <MenuSVG className=' svg-icon-1' />
              </div>
              <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
                <Link to='/dashboard' className='d-lg-none'>
                  <img alt='Logo' src={defaultSmallSVG} className='h-25px' />
                </Link>
              </div>
            </div>
          </>
        )}

        {!config.app.sidebar?.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15'>
            <Link to='/dashboard'>
              <img
                alt='Logo'
                src={defaultDarkLogoSVG}
                className='h-20px h-lg-30px app-sidebar-logo-default'
              />
            </Link>
          </div>
        )}

        <div
          id='kt_app_header_wrapper'
          className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'
        >
          {config.app.header.default?.content === 'menu' &&
            config.app.header.default.menu?.display && (
              <div
                className='app-header-menu app-header-mobile-drawer align-items-stretch'
                data-kt-drawer='true'
                data-kt-drawer-name='app-header-menu'
                data-kt-drawer-activate='{default: true, lg: false}'
                data-kt-drawer-overlay='true'
                data-kt-drawer-width='225px'
                data-kt-drawer-direction='end'
                data-kt-drawer-toggle='#kt_app_header_menu_toggle'
                data-kt-swapper='true'
                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
              >
                <Header />
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
