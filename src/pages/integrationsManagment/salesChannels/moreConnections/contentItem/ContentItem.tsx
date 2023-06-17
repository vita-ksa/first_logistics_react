import React, {useEffect, useState} from 'react'
import {ConnectButton, Wrap} from './Theme'
import blankAvatar from 'assets/img/blank-avatar.png'
import {integrationsAPI, profileAPI} from 'services/apis'
import {useDispatch, useSelector} from 'react-redux'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {SUCCESS_STATUS} from 'constants/auth'
import {useLocales, useNotification} from 'hooks'
import {Loader} from 'components/loader'

export const ContentItem = ({data}: any) => {
  const dispatch = useDispatch<any>()
  const {Trans, trans} = useLocales()
  const {success, error} = useNotification()
  const [loading, setLoading] = useState(false)

  const handelConnect = async (id: string) => {
    setLoading(true)
    const {payload} = await dispatch(
      integrationsAPI.connectToDelivery()({
        urlParams: `?shopId=${id}`,
      })
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({
        message: `${data?.name}${trans('g.connect.message')}`,
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!data?.image) return

    dispatch(profileAPI.getImageUrl()({urlParams: `${data?.image?.url}`}))

    return () => {
      dispatch(profileAPI.getImageUrlSlice.actions.resetAction())
    }
  }, [data?.image])

  return (
    <>
      <Wrap>
        <ConnectButton disabled={loading} onClick={handelConnect.bind(this, data?.id)}>
          {loading ? <Loader width={'10px'} height={'10px'} /> : 'Connect >'}
        </ConnectButton>

        <>
          <LazyLoadImage
            src={
              data?.image?.url
                ? `http://109.123.249.49:3006/logistics/images/${data?.image?.url}`
                : blankAvatar
            }
            // className='rounded'
            width='100%'
            height='100%'
            effect='blur'
            style={{objectFit: 'cover'}}
            alt={data?.name}
          />
        </>
      </Wrap>
    </>
  )
}
