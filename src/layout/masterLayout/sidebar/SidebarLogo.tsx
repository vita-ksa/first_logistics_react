import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import DarkLogo from 'assets/icons/default-dark.svg'
import Logo from 'assets/icons/default-small.svg'

const SidebarLogo = () => {
  const auth = useSelector<any>((state) => state.auth?.entities?.user) as any

  return (
    <>
      <div className='px-6 mt-4 app-sidebar-logo' id='kt_app_sidebar_logo'>
        <Link to='/dashboard'>
          <img
            alt='Logo'
            style={{width: '100px'}}
            src={Logo}
            className='h-33px app-sidebar-logo-default'
          />

          <img alt='Logo' src={DarkLogo} className='h-20px app-sidebar-logo-minimize' />
        </Link>
      </div>
      <div className='px-6 pb-5 mt-5 app-sidebar-logo' id='kt_app_sidebar_logo'>
        <div className='aside-toolbar flex-column-auto' id='kt_aside_toolbar'>
          <div className='py-5 aside-user d-flex align-items-sm-center justify-content-center'>
            {/* <div className='symbol symbol-50px'>
              <img style={{objectFit: 'cover'}} src={Avatar} alt='' />
            </div> */}

            <div className='flex-wrap aside-user-info flex-row-fluid ms-5 '>
              <div className='d-flex text-truncate'>
                <div className='flex-grow-1 me-2 text-truncate'>
                  <span className='text-white fw-bold'>{auth?.name}</span>

                  <span className='mb-1 text-gray-600 fw-bold d-block text-truncate'>
                    {auth?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {SidebarLogo}
