import clsx from 'clsx'
import React, {Fragment, useEffect, useRef, useState} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import {ReactComponent as ShowPasswordSVG} from 'assets/icons/eye-slash.svg'
import styled from 'styled-components'
import {KTCard, KTCardBody} from '_metronic/helpers'
import {Button, InputFormController} from 'components'
import {useDispatch, useSelector} from 'react-redux'
import {useLoader, useLocales, useNotification} from 'hooks'
import {credentialsAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {isEmpty} from 'lodash'
import {yupResolver} from '@hookform/resolvers/yup'
import {schema} from './schema'

export const CreateCredentials = () => {
  const dispatch = useDispatch<any>()
  const {success, error} = useNotification()
  const {Trans, trans} = useLocales()
  const codeRef = useRef<HTMLDivElement | null>(null)
  const [copied, setCopied] = useState(false)
  const userType = useSelector((state: any) => state?.auth?.entities?.user?.type)
  const userRole = useSelector((state: any) => state?.auth?.entities?.user?.role)
  const loading = useSelector<any>((state) => state.documentationLinksState.loading === 'pending')
  const generateloading = useSelector<any>(
    (state) => state.generateCredentialsState.loading === 'pending'
  )

  const CredentialsState = useSelector<any>(
    (state) => state.getCredentialsState?.entities?.token
  ) as any

  const documentationState = useSelector<any>(
    (state) => state.documentationState?.entities?.documentation
  ) as any

  const initialValues = {
    delevaryLink: documentationState?.delivery || '',
    shopLink: documentationState?.shop || '',
  }

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: {isValid, dirtyFields},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  })

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

  const onSaveLinks = async (_data: any) => {
    const {payload} = await dispatch(
      credentialsAPI.SaveDocumentationLinks()({
        delivery: _data?.delevaryLink,
        shop: _data?.shopLink,
      })
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({
        message: trans('g.links.message'),
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }

  useEffect(() => {
    document.title = 'Credentials Generators'
    return () => {
      document.title = 'First Logistics'
    }
  }, [])

  console.log(documentationState, 'documentationStatedocumentationState')
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
      <KTCard className={`mt-4  border-0 `}>
        <KTCardBody className='py-4'>
          <TitleBody>
            <Title>
              <Trans i18nKey={'credantials.generator'}>Credentials Generators</Trans>
            </Title>
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
                      <a className='highlight-copy btn'>
                        {copied
                          ? trans('copied', {defaultValue: 'copied'})
                          : trans('copy', {defaultValue: 'copy'})}
                      </a>
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
              <Trans i18nKey={'g.generate'}>Generate</Trans>
            </Button>
            {userRole === 'ADMIN' ? null : (
              <a
                style={{backgroundColor: '#181C32', color: '#fff'}}
                className='btn'
                href={
                  userType?.toLowerCase() === 'deliverycompany'
                    ? documentationState?.delivery
                    : documentationState?.shop
                }
                target='_blank'
              >
                <Trans i18nKey={'credantials.go.to.documentation'} />
              </a>
            )}
          </InnerBody>
          <>
            {userRole === 'ADMIN' ? (
              <div className='mt-8'>
                <InputFormController
                  type='link'
                  label={trans('credantials.add.shop.link')}
                  name='shopLink'
                  control={control}
                  placeholder={trans('trainer.add.placeholder.storelink')}
                  required
                />
                <InputFormController
                  type='link'
                  label={trans('credantials.add.delevary.link')}
                  name='delevaryLink'
                  control={control}
                  placeholder={trans('trainer.add.placeholder.storelink')}
                  required
                />
                <div className='w-100 text-end'>
                  <Button
                    disabled={!isValid || isEmpty(dirtyFields) || Boolean(loading)}
                    loading={Boolean(loading)}
                    onClick={handleSubmit((data) => onSaveLinks(data))}
                  >
                    <Trans i18nKey={'save.links'}> Save Links</Trans>
                  </Button>
                </div>
              </div>
            ) : null}
          </>
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
