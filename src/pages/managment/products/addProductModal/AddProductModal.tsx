import React, {useEffect, useMemo, useState} from 'react'
import {useLocales} from 'hooks'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {dismissAction} from 'components/modal/modalSlice'
import {InputFormController, Button, DropdownController} from 'components'
import {schema} from './schema'
import {ReactComponent as CloseSVG} from 'assets/icons/close_modal.svg'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {useNotification} from 'hooks/useNotification'
import {SUCCESS_STATUS} from 'constants/auth'
import {FormBody} from './Theme'
import {productAPI} from 'services/apis'

export const AddProductModal = ({type = 'add', id}: any) => {
  const VIEW_MODE = type === 'view'
  const dispatch = useDispatch<any>()
  const {trans} = useLocales()
  const {success, error} = useNotification()

  const [currancy, setCurrancy] = useState('')

  const {categoriesList} = useSelector((state: any) => {
    return {
      categoriesList: state?.categoriesList?.options,
    }
  })

  const loading = useSelector<any>((state) => state.addProduct.loading === 'pending')
  const UpdateLoading = useSelector<any>((state) => state.UpdateProductState.loading === 'pending')

  const data = useSelector((state: any) => state.productDetailsState?.entities?.product)

  const initialValues = {
    name: data?.name || '',
    sku: data?.sku || '',
    price: data?.price || '',
    tax_amount: data?.tax || '',
    barcode: data?.barcode || '',
    second_barcode: data?.second_barcode || '',
    category: {label: data?.category?.name, value: data?.category?.id} || '',
    description: data?.description || '',
    item_length: data?.length || '',
    width: data?.width || '',
    height: data?.height || '',
    weight: data?.weight || '',
    cubic_meter: data?.cubicMeter || '',
    currancy: data?.currency || '',
  }
  console.log(currancy, 'currancycurrancycurrancy')
  const {
    control,
    handleSubmit,
    register,
    formState: {isValid, dirtyFields},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  })

  const handleClose = () => {
    dismissAction()
  }

  const onSubmit = async (_data: any) => {
    if (type === 'add') {
      const formData = new FormData()

      formData.append('name', _data?.name)
      formData.append('sku', _data?.sku)
      formData.append('price', _data?.price)
      formData.append('tax', _data?.tax_amount)
      formData.append('barcode', _data?.barcode)
      formData.append('length', _data?.item_length)
      formData.append('width', _data?.width)
      formData.append('height', _data?.height)
      formData.append('weight', _data?.weight)
      formData.append('cubicMeter', _data?.cubic_meter)
      formData.append('categoryId', _data?.category?.value)
      formData.append('currency', currancy)
      // formData.append('image', _data?.image_url?.files)
      const {payload} = await dispatch(
        productAPI.addProduct()({
          formData,
        })
      )

      if (SUCCESS_STATUS.includes(payload?.status)) {
        handleClose()
        success({
          message: `${_data?.name}${trans('trainer.add.success.msg')}`,
        })
      } else {
        error({
          message: payload.message?.message,
        })
      }
    }

    if (type === 'edit') {
      const formData = new FormData()
      formData.append('name', _data?.name)
      formData.append('sku', _data?.sku)
      formData.append('price', _data?.price)
      formData.append('tax', _data?.tax_amount)
      formData.append('barcode', _data?.barcode)
      formData.append('length', _data?.item_length)
      formData.append('width', _data?.width)
      formData.append('height', _data?.height)
      formData.append('weight', _data?.weight)
      formData.append('cubicMeter', _data?.cubic_meter)
      formData.append('categoryId', _data?.category)
      // formData.append('currancy', _data?.currancy)
      if (dirtyFields.image_url) {
        formData.append('image', _data?.image_url?.files)
      }

      const {payload} = await dispatch(
        productAPI.UpdateProduct()({
          formData,
          urlParams: `/?productId=${id}`,
        })
      )
      if (SUCCESS_STATUS.includes(payload?.status)) {
        handleClose()
        success({
          message: `${_data?.en_name} ${trans('trainer.edit.success.msg')}`,
        })
      } else {
        error({
          message: payload.message?.message,
        })
      }
    }
  }
  useEffect(() => {
    return () => {
      dispatch(productAPI.getProductDetailsSlice.actions.resetAction())
    }
  }, [])

  return (
    <div className='p-8 w-100'>
      <div className='p-0 m-0 d-flex justify-content-between align-items-end'>
        <h2>{trans(`product.${type}.title`)}</h2>
        <div className='btn btn-sm btn-icon' onClick={handleClose}>
          <CloseSVG />
        </div>
      </div>
      <form className='mt-5'>
        <div className='w-100'>
          <FormBody className='gap-8 d-flex'>
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.name')}
              name='name'
              control={control}
              required
              placeholder={''}
              type={'text'}
            />
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.sku')}
              name='sku'
              control={control}
              required
              placeholder={''}
              type={'text'}
            />
          </FormBody>

          <FormBody className='gap-8 d-flex'>
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.price')}
              name='price'
              control={control}
              placeholder={''}
              type={'amount'}
              onChangeCurrancy={setCurrancy}
            />
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.tax.amount')}
              name='tax_amount'
              control={control}
              placeholder={''}
              type={'amount'}
              register={register}
            />
          </FormBody>

          <FormBody className='gap-8 d-flex'>
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.barcode')}
              name='barcode'
              control={control}
              placeholder={''}
              type={'text'}
            />
            {/* <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.second.barcode')}
              name='second_barcode'
              control={control}
              placeholder={''}
              type={'text'}
            /> */}
            {/* <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.category')}
              name='category'
              control={control}
              placeholder={''}
              type={'text'}
            /> */}
            <div className='w-100'>
              <DropdownController
                name='category'
                label={trans('product.category', {defaultValue: 'Category'})}
                items={categoriesList || []}
                control={control}
                placeholder={trans('product.category')}
                required
                rules={{required: 'This is required.'}}
              />
            </div>
          </FormBody>
          <FormBody className='gap-8 d-flex'>
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.description')}
              name='description'
              control={control}
              placeholder={''}
              type={'textArea'}
            />
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.cubic.meter')}
              name='cubic_meter'
              control={control}
              placeholder={''}
              type={'units'}
              unit='cm'
              subUnit='3'
            />
          </FormBody>
          <FormBody className='gap-8 d-flex'>
            <div className='gap-8 d-flex'>
              <InputFormController
                disabled={VIEW_MODE}
                label={trans('product.length')}
                name='item_length'
                control={control}
                placeholder={''}
                type={'units'}
                unit='cm'
              />
              <InputFormController
                disabled={VIEW_MODE}
                label={trans('product.width')}
                name='width'
                control={control}
                placeholder={''}
                type={'units'}
                unit='cm'
              />
              <InputFormController
                disabled={VIEW_MODE}
                label={trans('product.height')}
                name='height'
                control={control}
                placeholder={''}
                type={'units'}
                unit='cm'
              />
            </div>
            <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.weight')}
              name='weight'
              control={control}
              placeholder={''}
              type={'units'}
              unit='kg'
            />
          </FormBody>
          <FormBody className='gap-8 d-flex'>
            {/* <InputFormController
              disabled={VIEW_MODE}
              label={trans('product.image.url')}
              name='image_url'
              control={control}
              placeholder={trans('product.select.file')}
              type={'file'}
              fileTypes={['jpg', 'png', 'png']}
              defaultValue={data?.image?.[0]}
            /> */}
          </FormBody>
        </div>

        <div className='d-flex justify-content-end mt-15'>
          <button
            type='button'
            className='mx-5 text-gray-700 btn btn-lg bg-light'
            onClick={handleClose}
          >
            {trans('g.cancel')}
          </button>

          <Button
            type='submit'
            className='text-white btn btn-lg bg-dark'
            disabled={
              !isValid || isEmpty(dirtyFields) || Boolean(loading) || Boolean(UpdateLoading)
            }
            loading={Boolean(loading) || Boolean(UpdateLoading)}
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            {type === 'add' ? trans('g.add') : trans('g.edit')}
          </Button>
        </div>
      </form>
    </div>
  )
}
