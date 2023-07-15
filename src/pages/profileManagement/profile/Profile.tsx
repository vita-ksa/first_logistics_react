import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {InfoCard} from './infoCard'
import {UpdateProfile} from './updateProfile'
import {ordersAPI} from 'services/apis'
import {UpdateShopInfo} from './updateShopInfo'
import {OrdersTable} from './ordersTable'

export const Profile = () => {
  const dispatch = useDispatch<any>()

  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type)
  const userRole = useSelector((state: any) => state?.auth?.entities?.user?.role)
  const orderList = useSelector((state: any) => state?.userProfile?.orderList)

  const loading = useSelector((state: any) => state?.userProfile?.loading)

  const [activeTab, setActiveTab] = useState<any>('generalInfo')

  useEffect(() => {
    dispatch(ordersAPI.getCategoriesList()({})).then(() =>
      dispatch(ordersAPI.getCategoriesListSlice.actions.getOptions())
    )
    return () => {
      dispatch(ordersAPI.getCategoriesListSlice.actions.resetAction())
    }
  }, [])

  useEffect(() => {
    document.title = 'Profile'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  if (loading === 'pending') {
    return null
  }

  return (
    <Fragment>
      <InfoCard {...{activeTab, setActiveTab}} />
      {userRole === 'ADMIN' ? (
        <OrdersTable data={orderList || []} />
      ) : userType?.toLowerCase() === 'deliverycompany' ? (
        <UpdateProfile />
      ) : (
        <UpdateShopInfo />
      )}
    </Fragment>
  )
}
