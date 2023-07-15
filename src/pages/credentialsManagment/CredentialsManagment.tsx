import React, {useCallback, useEffect} from 'react'
import {Routes, Route, Outlet, Navigate} from 'react-router-dom'
import {CreateCredentials} from './createCredentials'
import {SUCCESS_STATUS} from 'constants/auth'
import {useDispatch, useSelector} from 'react-redux'
import {useNotification, useLocales} from 'hooks'
import {credentialsAPI} from 'services/apis'
import {PageLink, PageTitle} from '_metronic/layout/core'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Credentials',
    path: '/credentials',
    isSeparator: false,
    isActive: true,
  },
  {
    title: '',
    path: '/credentials',
    isSeparator: false,
    isActive: true,
  },
]

export const CredentialsManagment = () => {
  const dispatch = useDispatch<any>()
  const {error} = useNotification()
  const {trans} = useLocales()
  const reloadData = useSelector<any>((state) => [
    state.generateCredentialsState?.entities?.token,
    state.documentationLinksState?.entities,
  ]) as any

  const fetchData = useCallback(async ({search}: any) => {
    const {payload} = await dispatch(credentialsAPI.getCredentials()({}))

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  const fetchDocumentation = useCallback(async () => {
    const {payload} = await dispatch(credentialsAPI.getDocumentation()({}))

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      error({message: payload?.message?.message})
    }
  }, [])

  useEffect(() => {
    fetchData({})
    fetchDocumentation()
  }, [...reloadData])

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
          path='generators'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {trans('credantials.generator')}
              </PageTitle>
              <CreateCredentials />
            </>
          }
        />

        <Route index element={<Navigate to='/credentials/generators' />} />
      </Route>
    </Routes>
  )
}
