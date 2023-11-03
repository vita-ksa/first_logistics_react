import React from 'react'
import styled from 'styled-components'
import {ContentItem} from './contentItem'
import {Content} from './contentItem/Theme'
import {useLocales} from 'hooks'
import {useSelector} from 'react-redux'
import {isEmpty} from 'lodash'

export const DelevaryCompany = () => {
  const {Trans} = useLocales()
  const {deliveryCompanyList} = useSelector((state: any) => {
    return {
      deliveryCompanyList: state.deliveryCompanyList?.entities?.deliveryCompany,
    }
  })

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
