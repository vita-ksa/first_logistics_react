import {Suspense, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {getI18n} from 'react-i18next'
import {useSelector} from 'react-redux'
import {Helmet} from 'react-helmet-async'

const App = () => {
  const I18n = getI18n()
  const {lang} = useSelector<any>((state) => state?.locales) as any

  useEffect(() => {
    I18n.changeLanguage(lang)
  }, [lang])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <>
        <Helmet>
          <html lang={lang} dir={lang === 'en' ? 'ltr' : 'rtl'} />
        </Helmet>

        <LayoutProvider>
          <Outlet />
          <MasterInit />
        </LayoutProvider>
      </>
    </Suspense>
  )
}

export {App}
