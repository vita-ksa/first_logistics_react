import React, {useMemo} from 'react'
import {Tabs} from 'components'
import {useLocales} from 'hooks'

export const ShippingPartnerHeader = () => {
  const {trans} = useLocales()
  const list = useMemo(
    () => [
      {
        id: 1,
        title: trans('integrations.managment.more.connections'),
        to: '/sales-channels/online-stores',
      },
      {
        id: 2,
        title: trans('integrations.managment.connected.sales.chanels'),
        to: '/sales-channels/connected-stores',
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
