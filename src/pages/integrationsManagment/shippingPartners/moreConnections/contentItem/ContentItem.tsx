import React, {useEffect, useState} from 'react'
import {ConnectButton, InfoBody, Wrap} from './Theme'
import blankAvatar from 'assets/img/blank-avatar.png'
import {integrationsAPI, profileAPI} from 'services/apis'
import {useDispatch, useSelector} from 'react-redux'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {IMAGE_URL_ENDPOINT, SUCCESS_STATUS} from 'constants/auth'
import {useLocales, useNotification} from 'hooks'
import {Loader} from 'components/loader'
import {capitalize} from 'lodash'

export const ContentItem = ({data}: any) => {
  const dispatch = useDispatch<any>()
  const {Trans, trans} = useLocales()
  const {success, error} = useNotification()
  const [loading, setLoading] = useState(false)

  const handelConnect = async (id: string) => {
    setLoading(true)
    const {payload} = await dispatch(
      integrationsAPI.connectToDelivery()({
        urlParams: `?deliveryId=${id}`,
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
        <>
          <LazyLoadImage
            src={
              data?.image?.url
                ? `${IMAGE_URL_ENDPOINT}/${data?.image?.url}`
                : // ? `https://www.ajwbh.com/logistics/images/${data?.image?.url}`
                  blankAvatar
            }
            // className='rounded'
            width='100%'
            height='100%'
            effect='blur'
            style={{objectFit: 'cover'}}
            alt={data?.name}
          />
        </>
        <InfoBody>
          <span>{capitalize(data?.name)}</span>
          <ConnectButton
            disabled={loading || data?.isApproved !== undefined}
            onClick={handelConnect.bind(this, data?.id)}
          >
            {loading ? (
              <Loader width={'10px'} height={'10px'} />
            ) : data?.isApproved === undefined ? (
              <>
                <Trans i18nKey={'connect'}>Connect</Trans>
                <span>{'>'}</span>
              </>
            ) : data?.isApproved ? (
              <Trans i18nKey={'connected'}>Connected</Trans>
            ) : (
              <Trans i18nKey={'requsted'}> Requsted</Trans>
            )}
          </ConnectButton>
        </InfoBody>
      </Wrap>
    </>
  )
}
