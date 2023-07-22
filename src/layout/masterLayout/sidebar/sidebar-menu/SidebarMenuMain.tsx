import React from 'react'
import {useLocales} from 'hooks'
import {SidebarMenuItem} from './SidebarMenuItem'
import {ReactComponent as DashboardSVG} from 'assets/icons/dashboard.svg'
import {ReactComponent as ProductsSVG} from 'assets/icons/proucts.svg'
import {ReactComponent as OrdersSVG} from 'assets/icons/orders.svg'
import {ReactComponent as ProfileSVG} from 'assets/icons/user.svg'
import {ReactComponent as IntegrationsSVG} from 'assets/icons/integrations-icon.svg'
import {ReactComponent as CredentialsSVG} from 'assets/icons/credantial.svg'
import {ReactComponent as UserManagmentSVG} from 'assets/icons/user-managment.svg'
import {ReactComponent as CategorySVG} from 'assets/icons/category-icon.svg'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'

// shipping in shop
// salses chnels in delevery

const SidebarMenuMain = ({userType, userRole}: any) => {
  const {trans, Trans} = useLocales()
  console.log(userRole, 'userRoleuserRoleuserRole')
  return (
    <>
      {/* <div className='menu-item'>
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
      /> */}

      {/* <SidebarMenuItem
        to='/dashboard'
        Icon={DashboardSVG}
        title={trans('breadcrumb.dashboard')}
        fontIcon='bi-app-indicator'
      /> */}
      {userRole === 'ADMIN' ? null : (
        <SidebarMenuItem
          to='/profile-management'
          Icon={ProfileSVG}
          title={trans('sidebar.profile')}
          fontIcon='bi-app-indicator'
        />
      )}
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

      {userRole === 'ADMIN' ? (
        <SidebarMenuItem
          to='/category'
          Icon={CategorySVG}
          title={trans('sidebar.categories')}
          fontIcon='bi-app-indicator'
        />
      ) : null}
      {userRole === 'ADMIN' ? (
        <SidebarMenuItemWithSub
          to='/user-management'
          title={trans('sidebar.users.management')}
          fontIcon='bi-archive'
          Icon={UserManagmentSVG}
        >
          <SidebarMenuItem
            to='/user-management/shops'
            // Icon={UserManagmentSVG}
            title={trans('sidebar.users.management.shops')}
            fontIcon='bi-app-indicator'
          />
          <SidebarMenuItem
            to='/user-management/delivery-companies'
            // Icon={UserManagmentSVG}
            title={trans('sidebar.users.management.delivery.company')}
            fontIcon='bi-app-indicator'
          />
        </SidebarMenuItemWithSub>
      ) : null}
      {userRole === 'ADMIN' ? null : (
        <SidebarMenuItem
          to='/orders'
          Icon={OrdersSVG}
          title={trans('sidebar.orders')}
          fontIcon='bi-app-indicator'
        />
      )}
      {userRole === 'ADMIN' ? null : (
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
      )}
      <SidebarMenuItem
        to='/credentials'
        Icon={CredentialsSVG}
        title={trans('sidebar.credentials')}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export {SidebarMenuMain}
