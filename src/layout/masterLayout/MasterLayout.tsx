import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {HeaderWrapper} from './header'
import {Content} from '_metronic/layout/components/content'
import {Sidebar} from './sidebar'
import {ThemeModeProvider} from '_metronic/partials'
import {PageDataProvider} from '_metronic/layout/core'
import {reInitMenu} from '_metronic/helpers'
import 'react-lazy-load-image-component/src/effects/blur.css'
import {ScrollTop} from '_metronic/layout/components/scroll-top'
import {Notification} from 'pages/notification'
import {Modal} from 'components'
import {LockLoader} from 'pages/lockLoader'
import {useSelector} from 'react-redux'

const MasterLayout = () => {
  const location = useLocation()
  const {lang} = useSelector<any>((state) => state?.locales) as any

  useEffect(() => {
    reInitMenu()
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <Helmet>
          <html lang={lang} dir={lang === 'en' ? 'ltr' : 'rtl'} />
          <title>First Logistics</title>
        </Helmet>
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
          <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            <HeaderWrapper />

            <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
              <Sidebar />
              <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                <div className='d-flex flex-column flex-column-fluid'>
                  <Content>
                    <Outlet />
                  </Content>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollTop />
        <Notification />
        <Modal />
        <LockLoader />
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
