import React, {Fragment, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {DetailsTypography, IconButtons, ImageContainer, UserNameTypography} from './Theme'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import blankAvatar from 'assets/img/blank-avatar.png'
import {ReactComponent as CallIcon} from 'assets/icons/call.svg'
import {ReactComponent as EmailIcon} from 'assets/icons/email.svg'
import {useLocales} from 'hooks'
import {useSelector} from 'react-redux'
import {capitalize} from 'lodash'

export const Profile = () => {
  const data = useSelector((state: any) => state?.userProfile?.entities)
  const [activeTab, setActiveTab] = useState<any>('generalInfo')
  const {trans} = useLocales()

  const list = [
    {value: 'generalInfo', label: trans('user.details.tabs.generalInfo')},
    {value: 'programs', label: trans('user.details.tabs.programs')},
    {value: 'subscription', label: trans('user.details.tabs.subscription')},
  ]

  console.log(data, 'userDetailsuserDetails')

  return (
    <Fragment>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='mb-5 card mb-xl-10'>
        <div className='p-8 pb-0 card-body'>
          <div className='flex-wrap gap-5 d-flex flex-lg-nowrap'>
            <ImageContainer>
              <LazyLoadImage
                src={blankAvatar}
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
          {/* <div className='mt-8 overflow-auto d-flex h-55px'>
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
          </div> */}
        </div>
      </div>
    </Fragment>
  )
}
