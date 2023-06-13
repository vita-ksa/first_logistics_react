import {Fragment, useEffect, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useDispatch, useSelector} from 'react-redux'
import {InfoCard} from './infoCard'
import {UpdateProfile} from './updateProfile'
import {ordersAPI} from 'services/apis'

export const Profile = () => {
  const dispatch = useDispatch<any>()
  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type)
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

  if (loading === 'pending') {
    return null
  }

  return (
    <Fragment>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <InfoCard {...{activeTab, setActiveTab}} />
      {userType?.toLowerCase() === 'deliverycompany' ? <UpdateProfile /> : null}
    </Fragment>
  )
}
