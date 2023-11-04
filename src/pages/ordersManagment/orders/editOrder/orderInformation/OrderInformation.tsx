import React from 'react'
import {useLocales} from 'hooks'
import {useFormContext} from 'react-hook-form'
import {InputFormController, RadioController} from 'components'
import {useSelector} from 'react-redux'
import {DropdownControllerStyled, FormBody, InputControllerMinimumMargin, Title} from './Theme'

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
const shipmentOptions = [
  {
    label: 'package',
    value: 'Box',
  },
  {
    label: 'Documents',
    value: 'Documents',
  },
]

export const OrderInformation = ({shipmentDestination, type, disabled}: any) => {
  const {Trans, trans} = useLocales()
  const methods = useFormContext()

  const list = [
    {
      label: trans('payment.method.cash.on.delivery', {defaultValue: 'Cash On Delivery'}),
      value: 'CashOnDelivery',
    },
    {
      label: trans('payment.method.visa', {defaultValue: 'Visa'}),
      value: 'Visa',
    },
  ] as any

  const {categoriesList, deliveryCompanyList} = useSelector((state: any) => {
    return {
      categoriesList: state?.categoriesList?.options,
      deliveryCompanyList: state.deliveryCompanyList?.options,
    }
  })

  const defaultShipment = destinationOptions?.find(
    (option) => option.value?.toLowerCase() === shipmentDestination?.toLowerCase()
  )

  const desiredObject = shipmentOptions?.find(
    (option) => option.value?.toLowerCase() === type?.toLowerCase()
  )

  return (
    <div className='mt-5 w-100'>
      <div className='pb-10 pb-lg-15'>
        <Title className='fw-bold'>
          <Trans i18nKey={'order.info.edit.title'}>Order Information</Trans>
        </Title>
        <FormBody className='gap-8 mt-8 mb-10 d-flex'>
          <div className='w-100'>
            <DropdownControllerStyled
              name='categoryId'
              label={trans('product.category', {defaultValue: 'Category'})}
              items={categoriesList || []}
              control={methods?.control}
              placeholder={trans('product.category')}
              required
              rules={{required: 'This is required.'}}
              disabled={disabled}
            />
          </div>
          <div className='w-100'>
            <DropdownControllerStyled
              name='shipmentDestination'
              label={trans('order.info.shipping.destination', {
                defaultValue: 'shipping destination',
              })}
              items={destinationOptions || []}
              control={methods?.control}
              placeholder={trans('order.info.shipping.destination')}
              required
              rules={{required: 'This is required.'}}
              defaultValue={defaultShipment}
              disabled={disabled}
            />
          </div>
        </FormBody>
        <FormBody className='gap-8 d-flex'>
          <InputControllerMinimumMargin
            name='content'
            label={trans('program.add.content')}
            placeholder={trans('')}
            type='text'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              maxLength: {
                value: 20,
                message: trans('program.name.length.max', {
                  defaultValue: 'Maximum 20 characters',
                }),
              },
            }}
            disabled={disabled}
          />
          <div className='gap-8 w-100 d-flex'>
            <InputFormController
              label={trans('product.weight')}
              name='weight'
              control={methods?.control}
              placeholder={''}
              type={'units'}
              unit='Kg'
              disabled={disabled}
            />
            <InputFormController
              label={trans('product.length')}
              name='width'
              control={methods?.control}
              placeholder={''}
              type={'units'}
              unit='cm'
              disabled={disabled}
            />
            <InputFormController
              label={trans('product.height')}
              name='height'
              control={methods?.control}
              placeholder={''}
              type={'units'}
              unit='cm'
              disabled={disabled}
            />
          </div>
        </FormBody>
        <FormBody className='gap-8 d-flex'>
          <InputControllerMinimumMargin
            name='quantity'
            label={trans('program.add.quantity')}
            placeholder={trans('')}
            type='number'
            required
            control={methods?.control}
            // rules={{
            //   required: 'This is required.',
            //   maxLength: {
            //     value: 20,
            //     message: trans('program.name.length.max', {
            //       defaultValue: 'Maximum 20 characters',
            //     }),
            //   },
            // }}
            disabled={disabled}
          />
          <div className='w-100'>
            <DropdownControllerStyled
              name='type'
              label={trans('program.add.shipment.type', {defaultValue: 'Shipment type'})}
              items={shipmentOptions || []}
              control={methods?.control}
              placeholder={trans('program.add.shipment.type')}
              required
              rules={{required: 'This is required.'}}
              defaultValue={desiredObject}
              disabled={disabled}
            />
          </div>
        </FormBody>
        <FormBody className='gap-8 mt-8 d-flex'>
          <div className='w-50 pe-4'>
            <DropdownControllerStyled
              name='deliveryCompanyId'
              label={trans('program.add.delivery.company', {defaultValue: 'Delivery Company'})}
              items={deliveryCompanyList || []}
              control={methods?.control}
              placeholder={trans('program.add.delivery.company')}
              required
              rules={{required: 'This is required.'}}
              disabled={disabled}
            />
          </div>
          <>
            <RadioController
              name='paymentMethod'
              title={trans('order.add.payment.method', {defaultValue: 'Payment Method'})}
              list={list}
              control={methods?.control}
              required
              rules={{required: 'This is required.'}}
              disabled={disabled}
            />
          </>
        </FormBody>
      </div>
    </div>
  )
}
