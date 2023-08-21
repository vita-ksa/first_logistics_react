import React, {Fragment, useEffect} from 'react'
import styled from 'styled-components'
import {KTCard, KTCardBody} from '_metronic/helpers'
import {useSelector} from 'react-redux'
import {useLoader, useLocales} from 'hooks'
import {ContentItem} from './contentItem'
import {Content} from './contentItem/Theme'

export const MoreConnections = () => {
  const {lockLoader} = useLoader()
  const data = useSelector((state: any) => state?.deliveryListState?.entities?.shops || [])
  const loading = useSelector((state: any) => state?.deliveryListState?.loading)
  const {Trans} = useLocales()
  useEffect(() => {
    lockLoader(loading)
  }, [loading])

  useEffect(() => {
    document.title = 'Online Store'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  return (
    <Fragment>
      <KTCard className={`mt-4  border-0 `}>
        <KTCardBody className='py-4'>
          <TitleBody>
            <Title>
              <Trans i18nKey={'more.connections.title'}>Connect your online store</Trans>
            </Title>
            <Paragraph>
              <Trans i18nKey={'more.connections.Paragraph'}>
                Connect your online store to our powerful dashboard, and watch as your store orders
                are effortlessly captured and synchronized in real-time. Say goodbye to manual data
                entry and hello to streamlined efficiency.
              </Trans>
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
  width: 100%;
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
