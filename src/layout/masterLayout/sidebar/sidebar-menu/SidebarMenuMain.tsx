import React from 'react'
import {useLocales} from 'hooks'
import {SidebarMenuItem} from './SidebarMenuItem'
import {ReactComponent as DashboardSVG} from 'assets/icons/dashboard.svg'
import {ReactComponent as ProductsSVG} from 'assets/icons/proucts.svg'
import {ReactComponent as OrdersSVG} from 'assets/icons/orders.svg'

const SidebarMenuMain = () => {
  const {trans, Trans} = useLocales()

  return (
    <>
      <div className='menu-item'>
        <div className='pb-2 menu-content'>
          <span className='menu-section text-muted ls-1'>
            <Trans i18nKey={'sidebar.title.overview'} />
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to='/dashboard'
        Icon={DashboardSVG}
        title={trans('breadcrumb.dashboard')}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='pb-2 menu-content'>
          <span className='menu-section text-muted ls-1'>
            <Trans i18nKey={'sidebar.title.management'} />
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to='/products'
        Icon={ProductsSVG}
        title={trans('sidebar.product')}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/orders'
        Icon={OrdersSVG}
        title={trans('sidebar.orders')}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export {SidebarMenuMain}
