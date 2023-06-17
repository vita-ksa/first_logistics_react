import React from 'react'
import {CardBody, FormBody, InputControllerMinimumMargin, Title} from './Theme'
import {useDispatch, useSelector} from 'react-redux'
import {useLocales, useNotification} from 'hooks'
import {useForm} from 'react-hook-form'
import {Button, InputFormController} from 'components'
import {isEmpty} from 'lodash'
import {profileAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'

export const UpdateShopInfo = () => {
  const dispatch = useDispatch<any>()
  const {Trans, trans} = useLocales()
  const {success, error} = useNotification()

  const loading = useSelector<any>((state) => state.UpdateShopInfoState.loading === 'pending')

  const {
    control,
    handleSubmit,

    formState: {isValid, dirtyFields},
  } = useForm({
    // resolver: yupResolver(schema),
    mode: 'all',
    // defaultValues: initialValues as any,
  })

  const onSubmit = async (_data: any) => {
    const formData = new FormData()

    console.log(_data, '_data_data_data')

    formData.append('companyRecordNumber', _data?.companyRecordNumber)
    formData.append('shopName', _data?.shopName)
    formData.append('image', _data?.image_url?.files)

    const {payload} = await dispatch(
      profileAPI.UpdateShopInfo()({
        formData,
      })
    )

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({
        message: `${trans('g.edit.message')}`,
      })
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }

  return (
    <div className='bg-transparent card'>
      <CardBody className='bg-white card-body'>
        <div className='mt-5 w-100'>
          <div className='pb-10 pb-lg-15'>
            <Title className='fw-bold'>
              <Trans i18nKey={'shop.info.edit.title'}>Shop Information</Trans>
            </Title>
            <FormBody className='gap-8  mt-8 mb-10 d-flex'>
              <InputControllerMinimumMargin
                name='shopName'
                label={trans('profile.update.shopName')}
                placeholder={trans('')}
                type='text'
                required
                control={control}
                rules={{required: 'This is required.'}}
              />
              <InputControllerMinimumMargin
                name='companyRecoredNumber'
                label={trans('profile.update.company.record.number')}
                placeholder={trans('')}
                type='text'
                required
                control={control}
                rules={{required: 'This is required.'}}
              />
            </FormBody>
            <FormBody>
              <div className='w-50 pr-4'>
                <InputFormController
                  name='image_url'
                  label={trans('Picture')}
                  type='file'
                  placeholder={trans('g.picture.add')}
                  control={control}
                  required
                  rules={{required: 'This is required.'}}
                  fileTypes={['jpg', 'png', 'png']}
                />
              </div>
            </FormBody>
          </div>
        </div>
        <div className='d-flex justify-content-end mt-15'>
          <Button
            type='submit'
            className='text-white btn btn-lg bg-dark'
            disabled={!isValid || isEmpty(dirtyFields) || Boolean(loading) || Boolean(loading)}
            loading={Boolean(loading) || Boolean(loading)}
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            {trans('g.submit')}
          </Button>
        </div>
      </CardBody>
    </div>
  )
}
