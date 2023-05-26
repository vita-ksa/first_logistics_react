import {createRoot} from 'react-dom/client'
import 'theme/theme.scss'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'

import {AppRoutes} from './routing/AppRoutes'
import {store, persistor} from './app/store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'
import {I18nProvider} from './locales'
import {HelmetProvider} from 'react-helmet-async'

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nProvider>
            <>
              <AppRoutes />
            </>
          </I18nProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  )
}
