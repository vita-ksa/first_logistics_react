import {SidebarMenuMain} from './SidebarMenuMain'

const SidebarMenu = ({userType, userRole}: any) => {
  return (
    <div className='overflow-hidden app-sidebar-menu flex-column-fluid'>
      <div
        id='kt_app_sidebar_menu_wrapper'
        className='my-5 app-sidebar-wrapper hover-scroll-overlay-y'
        data-kt-scroll='true'
        data-kt-scroll-activate='true'
        data-kt-scroll-height='auto'
        data-kt-scroll-dependencies='#kt_app_sidebar_logo, #kt_app_sidebar_footer'
        data-kt-scroll-wrappers='#kt_app_sidebar_menu'
        data-kt-scroll-offset='5px'
        data-kt-scroll-save-state='true'
      >
        <div
          className='px-3 menu menu-column menu-rounded menu-sub-indention'
          id='#kt_app_sidebar_menu'
          data-kt-menu='true'
          data-kt-menu-expand='false'
        >
          <SidebarMenuMain {...{userType, userRole}} />
        </div>
      </div>
    </div>
  )
}

export {SidebarMenu}
