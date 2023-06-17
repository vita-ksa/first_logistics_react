import React, {useMemo} from 'react'
import {Tabs} from 'components'
import {useLocales} from 'hooks'

export const IntegrationsManagmentHeader = () => {
  const {trans} = useLocales()
  const list = useMemo(
    () => [
      {
        id: 1,
        title: trans('integrations.managment.more.connections'),
        to: '/shiping-partners/more-connection',
      },
      {
        id: 2,
        title: trans('integrations.managment.connected'),
        to: '/shiping-partners/connected-partners',
      },
    ],
    []
  )

  return (
    <>
      <Tabs {...{list}} />
    </>
  )
}
