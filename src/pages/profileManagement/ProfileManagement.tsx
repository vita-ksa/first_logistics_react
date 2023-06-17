import React, {useEffect} from 'react'
import {PageTitle} from '_metronic/layout/core'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {getUserProfileBreadCrumbs} from './breadCrumbs'
import {Profile} from './profile'
import {useDispatch, useSelector} from 'react-redux'
import {useLoader, useNotification} from 'hooks'
import {profileAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {capitalize} from 'lodash'

export const ProfileManagement = () => {
  const {error} = useNotification()
  const dispatch = useDispatch<any>()
  const {lockLoader} = useLoader()

  const loading = useSelector((state: any) => state?.userProfile?.loading)
  const userName = useSelector((state: any) => state?.auth?.entities?.user?.name)

  const reloadData: any = useSelector<any>((state) => [
    state.UpdateShopInfoState?.entities,
    state?.UpdateDeliveryCompanyState?.entities,
  ])

  const fetchUserProfile = async () => {
    const {payload} = await dispatch(profileAPI.getUserProfile()({}))
    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }

  useEffect(() => {
    fetchUserProfile()

    return () => {
      dispatch(profileAPI.getUserProfileSlice.actions.resetAction())
    }
  }, [...reloadData])

  useEffect(() => {
    lockLoader(loading)
  }, [loading])

  return (
    <Routes>
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path='user'
          element={
            <>
              <PageTitle breadcrumbs={getUserProfileBreadCrumbs(capitalize(userName))}>
                {capitalize(userName)}
              </PageTitle>
              <Profile />
            </>
          }
        />

        <Route index element={<Navigate to='/profile-management/user' />} />
      </Route>
    </Routes>
  )
}
