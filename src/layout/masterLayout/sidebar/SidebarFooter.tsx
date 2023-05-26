import {useLocales} from 'hooks'
import {ReactComponent as LogoutSVG} from 'assets/icons/Logout-uncolor.svg'
import {authAPI} from 'services/apis'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const SidebarFooter = () => {
  const {Trans} = useLocales()
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const logout = () => {
    dispatch(authAPI.authSlice.actions.resetAction())
    navigateTo('/auth/login')
  }

  return (
    <div className='px-6 pt-2 pb-6 app-sidebar-footer flex-column-auto' id='kt_app_sidebar_footer'>
      <button
        className='px-0 overflow-hidden bg-transparent btn btn-flex flex-start btn-custom text-nowrap h-40px w-100'
        onClick={logout}
      >
        <LogoutSVG color={'#fff'} />
        <span className='btn-label'>
          <Trans i18nKey={'sidebar.title.logout'} />
        </span>
      </button>
    </div>
  )
}

export {SidebarFooter}
