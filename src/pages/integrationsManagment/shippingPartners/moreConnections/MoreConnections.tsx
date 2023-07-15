import React, {Fragment, useEffect} from 'react'
import styled from 'styled-components'
import {KTCard, KTCardBody} from '_metronic/helpers'
import {useSelector} from 'react-redux'
import {useLoader} from 'hooks'
import {ContentItem} from './contentItem'
import {Content} from './contentItem/Theme'

export const MoreConnections = () => {
  const {lockLoader} = useLoader()
  const data = useSelector((state: any) => state?.deliveryListState?.entities?.deliveryList || [])
  const loading = useSelector((state: any) => state?.deliveryListState?.loading)

  useEffect(() => {
    lockLoader(loading)
  }, [loading])

  useEffect(() => {
    document.title = 'More Connections'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  return (
    <Fragment>
      <KTCard className={`mt-4  border-0 `}>
        <KTCardBody className='py-4'>
          <TitleBody>
            <Title>Connect a shipping partner</Title>
            <Paragraph>
              Unlock a World of Shipping Possibilities. Seamlessly Integrate with your preferred
              shipping partner from 200+ local and global delivery companies.
            </Paragraph>
          </TitleBody>
          <Container>
            <Content>
              {data
                ? data.map((item: any) => <ContentItem key={item.id} {...{data: item}} />)
                : null}
            </Content>
          </Container>
        </KTCardBody>
      </KTCard>
    </Fragment>
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`
const TitleBody = styled.div`
  display: inline-block;
  width: 80%;
  margin-bottom: 1rem;
`
const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  white-space: normal;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
  color: #000;
`

const Paragraph = styled.span`
  font-size: 15px;
  font-weight: 400;
  white-space: normal;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
  color: #000;
  opacity: 0.6;
`
