import React from 'react'
import {FormBody, InputControllerMinimumMargin, Title, CardBody} from './Theme'
import {useLocales, useNotification} from 'hooks'
import {useForm} from 'react-hook-form'
import {Button, InputFormController, MultiDropdownController} from 'components'
import {useDispatch, useSelector} from 'react-redux'
import {profileAPI} from 'services/apis'
import {SUCCESS_STATUS} from 'constants/auth'
import {isEmpty} from 'lodash'

const destinationOptions = [
  {
    label: 'Internal shipment',
    value: 'Internal',
  },
  {
    label: 'Local shipment',
    value: 'Local',
  },
  {
    label: 'External shipment',
    value: 'External',
  },
]

export const UpdateProfile = () => {
  const dispatch = useDispatch<any>()
  const {Trans, trans} = useLocales()
  const {success, error} = useNotification()

  const {categoriesList} = useSelector((state: any) => {
    return {
      categoriesList: state?.categoriesList?.options,
    }
  })
  const loading = useSelector<any>(
    (state) => state.UpdateDeliveryCompanyState.loading === 'pending'
  )
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
    const categoryId = _data?.categoryId?.map((el: any) => el.value || el?.id)
    const shipto = _data?.shipto?.map((el: any) => el.value || el?.id)

    console.log(_data, '_data_data_data')

    categoryId?.map((el: any) => formData.append('category[]', el))
    shipto?.map((el: any) => formData.append('shipto[]', el))
    formData.append('deliveryTimePeriod', _data?.deliveryTimePeriod)
    formData.append('companyRecoredNumber', _data?.companyRecoredNumber)
    formData.append('image', _data?.image_url?.files)

    const {payload} = await dispatch(
      profileAPI.UpdateDeliveryCompany()({
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
              <Trans i18nKey={'delivery.company.info.edit.title'}>
                Delivery Company Information
              </Trans>
            </Title>
            <FormBody className='gap-8 mt-8 mb-10 d-flex'>
              <div className='w-100'>
                <MultiDropdownController
                  name='categoryId'
                  label={trans('product.category', {defaultValue: 'Category'})}
                  options={categoriesList || []}
                  control={control}
                  placeholder={trans('product.category')}
                  required
                  rules={{required: 'This is required.'}}
                />
              </div>
              <div className='w-100'>
                <MultiDropdownController
                  name='shipto'
                  label={trans('order.info.shipping.destination', {
                    defaultValue: 'shipping destination',
                  })}
                  options={destinationOptions || []}
                  control={control}
                  placeholder={trans('order.info.shipping.destination')}
                  required
                  rules={{required: 'This is required.'}}
                />
              </div>
            </FormBody>
            <FormBody className='gap-8 d-flex'>
              <InputControllerMinimumMargin
                name='deliveryTimePeriod'
                label={trans('profile.update.deliveryTimePeriod')}
                placeholder={trans('')}
                type='number'
                required
                control={control}
                // rules={{
                //   required: 'This is required.',
                //   maxLength: {
                //     value: 20,
                //     message: trans('program.name.length.max', {
                //       defaultValue: 'Maximum 20 characters',
                //     }),
                //   },
                // }}
                rules={{required: 'This is required.'}}
              />
              <InputControllerMinimumMargin
                name='companyRecoredNumber'
                label={trans('profile.update.companyRecoredNumber')}
                placeholder={trans('')}
                type='number'
                required
                control={control}
                // rules={{
                //   required: 'This is required.',
                //   maxLength: {
                //     value: 20,
                //     message: trans('program.name.length.max', {
                //       defaultValue: 'Maximum 20 characters',
                //     }),
                //   },
                // }}
                rules={{required: 'This is required.'}}
              />
            </FormBody>
          </div>
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
