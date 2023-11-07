import React from 'react'
import {InfoBody, Wrap} from './Theme'
import blankAvatar from 'assets/img/blank-avatar.png'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {IMAGE_URL_ENDPOINT} from 'constants/auth'
import {capitalize} from 'lodash'
import {useFormContext} from 'react-hook-form'

export const ContentItem = ({data}: any) => {
  const methods = useFormContext()

  console.log(data, methods, ' deliveryCompanydeliveryCompany')
  return (
    <>
      <Wrap htmlFor={data?.id}>
        <>
          <LazyLoadImage
            src={data?.image?.url ? `${IMAGE_URL_ENDPOINT}/${data?.image?.url}` : blankAvatar}
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
          <span>price : {data?.data?.price}</span>
          <div className='flex justify-between items-center w-full'>
            <span>{data?.data?.deliveryPeriod}</span>

            <div className='mt-auto ml-auto fv-row'>
              {/* <label className='form-check form-check-inline' > */}
              <input
                value={data?.id}
                className='form-check-input'
                type='radio'
                id={data?.id}
                {...methods.register('deliveryCompanyId', {required: 'this is requerd'})}
              />
              {/* </label> */}
            </div>
          </div>
        </InfoBody>
      </Wrap>
    </>
  )
}
