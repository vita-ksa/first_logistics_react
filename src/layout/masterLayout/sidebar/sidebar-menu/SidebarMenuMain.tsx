import React from 'react'
import {useLocales} from 'hooks'
import {SidebarMenuItem} from './SidebarMenuItem'
import {ReactComponent as DashboardSVG} from 'assets/icons/dashboard.svg'
import {ReactComponent as ProductsSVG} from 'assets/icons/proucts.svg'
import {ReactComponent as OrdersSVG} from 'assets/icons/orders.svg'
import {ReactComponent as ProfileSVG} from 'assets/icons/user.svg'
import {ReactComponent as IntegrationsSVG} from 'assets/icons/integrations-icon.svg'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'

// shipping in shop
// salses chnels in delevery

const SidebarMenuMain = ({userType}: any) => {
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
        to='/price-calculation'
        Icon={DashboardSVG}
        title={trans('breadcrumb.price.calculation', {defaultValue: 'price Calculation'})}
        fontIcon='bi-app-indicator'
      />

      {/* <SidebarMenuItem
        to='/dashboard'
        Icon={DashboardSVG}
        title={trans('breadcrumb.dashboard')}
        fontIcon='bi-app-indicator'
      /> */}
      <SidebarMenuItem
        to='/profile-management'
        Icon={ProfileSVG}
        title={trans('sidebar.profile')}
        fontIcon='bi-app-indicator'
      />

      <div className='menu-item'>
        <div className='pb-2 menu-content'>
          <span className='menu-section text-muted ls-1'>
            <Trans i18nKey={'sidebar.title.management'} />
          </span>
        </div>
      </div>
      {userType?.toLowerCase() === 'shop' ? (
        <SidebarMenuItem
          to='/products'
          Icon={ProductsSVG}
          title={trans('sidebar.product')}
          fontIcon='bi-app-indicator'
        />
      ) : null}
      <SidebarMenuItem
        to='/orders'
        Icon={OrdersSVG}
        title={trans('sidebar.orders')}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItemWithSub
        to=''
        title={trans('sidebar.integrations.management')}
        fontIcon='bi-archive'
        Icon={IntegrationsSVG}
      >
        {userType?.toLowerCase() === 'shop' ? (
          <>
            <SidebarMenuItem
              to='/shiping-partners'
              title={trans('integrations.management.shiping.partners')}
              hasBullet={false}
            />
            <SidebarMenuItem
              to='/requests'
              title={trans('integrations.management.shop.requests')}
              hasBullet={false}
            />
          </>
        ) : (
          <>
            <SidebarMenuItem
              to='/sales-channels'
              title={trans('integrations.management.sales.chanels')}
              hasBullet={false}
            />
            <SidebarMenuItem
              to='/shop-requests'
              title={trans('integrations.management.shop.requests')}
              hasBullet={false}
            />
          </>
        )}
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/credentials'
        Icon={OrdersSVG}
        title={trans('sidebar.credentials')}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export {SidebarMenuMain}
