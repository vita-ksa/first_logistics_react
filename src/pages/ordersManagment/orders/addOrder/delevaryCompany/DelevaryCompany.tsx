import React, {useEffect} from 'react'
import styled from 'styled-components'
import {ContentItem} from './contentItem'
import {Content} from './contentItem/Theme'
import {useLocales} from 'hooks'
import {useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {Loader} from 'components/loader'
import {useDispatch} from 'react-redux'
import {ordersAPI} from 'services/apis'

export const DelevaryCompany = () => {
  const {Trans} = useLocales()
  const dispatch = useDispatch()
  const {deliveryCompanyList, loading} = useSelector((state: any) => {
    return {
      deliveryCompanyList: state.deliveryCompanyList?.entities?.deliveryCompany,
      loading: state.deliveryCompanyList?.loading,
    }
  })

  useEffect(() => {
    return () => {
      dispatch(ordersAPI.getDeliveryCompanyListSlice.actions.resetAction())
    }
  }, [])

  return (
    <div>
      <div className='pb-10 pb-lg-15'>
        <div className='text-gray-400 fw-bold fs-6 '>
          <Trans i18nKey={'delevary.info.title'}>Delevary Company</Trans>
        </div>
      </div>
      <Container>
        {!isEmpty(deliveryCompanyList) ? (
          <Content>
            {deliveryCompanyList.map((item: any) => (
              <ContentItem key={item.id} {...{data: item}} />
            ))}
          </Content>
        ) : loading ? (
          <div className='flex justify-center w-full '>
            <Loader width={'30px'} height={'30px'} />
          </div>
        ) : (
          <div
            style={{fontWeight: 700, fontSize: 20}}
            className='capitalize text-gray-600  text-center bold'
          >
            no delivery company delivered to this destination
          </div>
        )}
      </Container>
    </div>
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`
