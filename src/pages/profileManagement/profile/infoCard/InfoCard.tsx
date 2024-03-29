import React from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {useLocales} from 'hooks'
import {capitalize} from 'lodash'
import blankAvatar from 'assets/img/blank-avatar.png'
import {ReactComponent as CallIcon} from 'assets/icons/call.svg'
import {ReactComponent as EmailIcon} from 'assets/icons/email.svg'
import {DetailsTypography, ImageContainer, UserNameTypography} from '../Theme'
import {DarkHeading, Input, TableDiv} from './Theme'
import {useSelector} from 'react-redux'
import {toggleAction} from 'components/modal/modalSlice'
import {useForm} from 'react-hook-form'
import {ActiveTrainerModal} from './activeTrainerModal'
import {IMAGE_URL_ENDPOINT} from 'constants/auth'

export const InfoCard = ({activeTab, setActiveTab}: any) => {
  const {trans} = useLocales()
  const userRole = useSelector((state: any) => state?.auth?.entities?.user?.role)
  const data = useSelector((state: any) =>
    userRole !== 'ADMIN' ? state?.userProfile?.entities : state?.userProfile?.userInfo
  )
  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type)
  const list = [
    {value: 'updateInfo', label: trans('profile.update.info')},
    {value: 'categories', label: trans('sidebar.categories')},
    {value: 'shipto', label: trans('sidebar.shipto', {defaultValue: 'Ship to'})},
  ]
  const {control} = useForm({
    mode: 'all',
  })

  const OpenActivateModal = (value: any) => {
    toggleAction({
      show: true,
      component: <ActiveTrainerModal isActive={value} id={data?.id} name={data?.name} />,
      className: 'w-75',
    })
  }

  return (
    <div className='mb-5 card mb-xl-10'>
      <div className='p-8 pb-0 card-body'>
        <div className='flex-wrap gap-5 d-flex flex-lg-nowrap'>
          <ImageContainer>
            <LazyLoadImage
              src={data?.photo ? `${IMAGE_URL_ENDPOINT}/${data?.photo}` : blankAvatar}
              className='rounded'
              width='100%'
              height='150px'
              effect='blur'
              style={{objectFit: 'cover'}}
            />
          </ImageContainer>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-end'>
              <div className='d-flex align-items-baseline'>
                <UserNameTypography>{capitalize(data?.name)}</UserNameTypography>
              </div>
              {userRole === 'ADMIN' ? (
                <Input
                  control={control}
                  name='isActive'
                  label={'Active:'}
                  field={{
                    value: data?.isActive,
                    onChange: (e: any) => {
                      OpenActivateModal(e?.target?.checked)
                    },
                  }}
                />
              ) : null}
              {/* <div>
          <IconButtons onClick={blockUser} className='mx-2 btn' isBlocked={data?.isBlocked}>
            {data?.isBlocked ? (
              <BlockIcon className='svg-icon-2' width={'2rem'} />
            ) : (
              <UnBlockIcon className='svg-icon-2' width={'2rem'} />
            )}
          </IconButtons>
        </div> */}
            </div>
            {/* {data?.phone ? ( */}
            <DetailsTypography>
              <CallIcon className='svg-icon-2 me-2' width={'1.5rem'} />
              {data?.phone}
            </DetailsTypography>
            {/* ) : null} */}
            <DetailsTypography>
              <EmailIcon className='svg-icon-2 me-2' width={'1.5rem'} />
              {data?.email}
            </DetailsTypography>
          </div>
        </div>

        <div className='w-100 border-top d-flex'>
          {/* table */}
          <TableDiv>
            <DarkHeading>{trans('profile.user.type')}</DarkHeading>
            <h4>{data?.type || '-'}</h4>
          </TableDiv>

          <TableDiv>
            <DarkHeading>{trans('profile.user.shop.name')}</DarkHeading>
            <h4>
              {data?.type?.toLowerCase() === 'shop'
                ? capitalize(data?.shop?.name)
                : capitalize(data?.deliveryCompany?.name)}
            </h4>
          </TableDiv>
          <TableDiv>
            <DarkHeading>{trans('profile.user.is.registration.completed')}</DarkHeading>
            <h4>
              {data?.isRegistrationCompleted
                ? trans('profile.completed')
                : trans('profile.not.completed')}
            </h4>
          </TableDiv>
          <TableDiv>
            <DarkHeading>{trans('profile.user.webhook', {defaultValue: 'webhook'})}</DarkHeading>
            <h4>{data?.deliveryCompany?.webhook || '-'}</h4>
          </TableDiv>
          <TableDiv className='border-right-0'>
            <DarkHeading>{trans('profile.user.is.active')}</DarkHeading>
            <h4>{data?.isActive ? 'Active' : 'Inactive'}</h4>
          </TableDiv>
        </div>
        {userType?.toLowerCase() === 'deliverycompany' ? (
          <div className='w-100 border-top d-flex'>
            {/* table */}
            <TableDiv>
              <DarkHeading>
                {trans('profile.recorednumber', {defaultValue: 'Recored Number'})}
              </DarkHeading>
              <h4>{data?.deliveryCompany?.companyDetails?.companyRecoredNumber || '-'}</h4>
            </TableDiv>

            <TableDiv>
              <DarkHeading>
                {trans('profile.userdelivery.time.period', {defaultValue: 'Delivery Time Period'})}
              </DarkHeading>
              <h4>{data?.deliveryCompany?.companyDetails?.deliveryTimePeriod || '-'}</h4>
            </TableDiv>
          </div>
        ) : null}
        {userType?.toLowerCase() === 'shop' ? (
          <div className='w-100 border-top d-flex'>
            {/* table */}
            <TableDiv>
              <DarkHeading>
                {trans('profile.recorednumber', {defaultValue: 'Recored Number'})}
              </DarkHeading>
              <h4>{data?.shop?.companyRecordNumber || '-'}</h4>
            </TableDiv>
          </div>
        ) : null}
        {userType?.toLowerCase() === 'deliverycompany' ? (
          <div className='mt-0 overflow-auto d-flex h-55px border-top '>
            <ul className='border-transparent nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder flex-nowrap'>
              {list?.map((item: any) => (
                <li key={item.value} className='nav-item'>
                  <button
                    className={
                      `nav-link  me-6 bg-transparent` + (activeTab === item.value ? ' active' : '')
                    }
                    style={{
                      color: `${activeTab === item.value ? '#000' : ''}`,
                    }}
                    onClick={() => setActiveTab(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
