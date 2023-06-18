import clsx from 'clsx'
import React, {Fragment, useEffect, useRef, useState} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'

import {ReactComponent as ShowPasswordSVG} from 'assets/icons/eye-slash.svg'
import styled from 'styled-components'
import {Helmet} from 'react-helmet-async'
import {KTCard, KTCardBody} from '_metronic/helpers'
import {Button} from 'components'
import {useDispatch, useSelector} from 'react-redux'
import {useLoader, useLocales, useNotification} from 'hooks'
import {credentialsAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'

export const CreateCredentials = () => {
  const dispatch = useDispatch<any>()
  const {success, error} = useNotification()
  const {Trans, trans} = useLocales()
  const codeRef = useRef<HTMLDivElement | null>(null)
  const [copied, setCopied] = useState(false)
  const {lockLoader} = useLoader()

  const loading = useSelector((state: any) => state?.getCredentialsState?.loading)
  const generateloading = useSelector<any>(
    (state) => state.generateCredentialsState.loading === 'pending'
  )

  const CredentialsState = useSelector<any>(
    (state) => state.getCredentialsState?.entities?.token
  ) as any

  const generateCredentialsAction = async () => {
    const {payload} = await dispatch(credentialsAPI.generateCredentials()({}))

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({
        message: trans('g.credantials.message'),
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
    setCopied(false)
  }

  // useEffect(() => {
  //   lockLoader(loading)
  // }, [loading])

  // if (loading === 'pending') return null
  useEffect(() => {
    return () => {
      dispatch(credentialsAPI.getCredentialsSlice.actions.resetAction())
    }
  }, [])

  return (
    <Fragment>
      <Helmet>
        <title>Credentials Generators</title>
      </Helmet>
      <KTCard className={`mt-4  border-0 `}>
        <KTCardBody className='py-4'>
          <TitleBody>
            <Title>Credentials Generators</Title>
            <Paragraph>
              {/* Unlock a World of Shipping Possibilities. Seamlessly Integrate with your preferred
              shipping partner from 200+ local and global delivery companies. */}
            </Paragraph>
          </TitleBody>
          <InnerBody>
            <div className={`fv-row w-50 `}>
              <div className='my-1 d-flex align-items-center position-relative'>
                <input
                  style={{padding: '0.775rem 6rem 0.775rem 1rem'}}
                  className={clsx('form-control  ')}
                  type={'text'}
                  value={CredentialsState}
                />
                <button style={{display: 'contents'}} type='button'>
                  <OverlayTrigger
                    key='copy-to-clipboard'
                    placement='top'
                    overlay={<Tooltip id='tooltip-copy-to-clipboard'>Copy Code</Tooltip>}
                  >
                    <CopyToClipboard text={CredentialsState} onCopy={() => setCopied(true)}>
                      <a className='highlight-copy btn'>{copied ? 'copied' : 'copy'}</a>
                    </CopyToClipboard>
                  </OverlayTrigger>

                  <div className='highlight-code' ref={codeRef}></div>
                </button>
              </div>
            </div>
            <Button
              disabled={Boolean(generateloading)}
              loading={Boolean(generateloading)}
              onClick={generateCredentialsAction}
            >
              Generate
            </Button>
          </InnerBody>
        </KTCardBody>
      </KTCard>
    </Fragment>
  )
}

export const EyeSVG = styled(ShowPasswordSVG)`
  width: 24px !important;
  height: 24px !important;
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

const InnerBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 25px;
`
