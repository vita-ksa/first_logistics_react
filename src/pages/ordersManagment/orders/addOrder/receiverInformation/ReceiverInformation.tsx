import React from 'react'
import {useFormContext} from 'react-hook-form'
import {InputFormController} from 'components'
import {useLocales} from 'hooks'
import {FormBody, InputControllerMinimumMargin} from './Theme'
import {validatePhoneNumber} from 'utilities/validatePhoneNumber'

export const ReceiverInformation = () => {
  const {Trans, trans} = useLocales()
  const methods = useFormContext()

  return (
    <div className='mt-5 w-100'>
      <div className='pb-10 pb-lg-15'>
        <div className='text-gray-400 fw-bold fs-6 '>
          <Trans i18nKey={'receiver.info.title'}>Enter Receiver Information</Trans>
        </div>
        <FormBody className='gap-8 mt-8 mb-10 d-flex'>
          <InputControllerMinimumMargin
            name='receiver_name'
            label={trans('sender.name')}
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
          />
          <InputControllerMinimumMargin
            name='receiver_email'
            label={trans('signin.email')}
            placeholder={trans('')}
            type='email'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              validate: {
                maxLength: (v) => v.length <= 50 || 'The email should have at most 50 characters',
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  'Email address must be a valid address',
              },
            }}
          />
        </FormBody>

        <FormBody className='gap-8 mt-8 d-flex'>
          <InputControllerMinimumMargin
            name='receiver_country'
            label={trans('sender.country')}
            placeholder={trans('')}
            type='text'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              //   maxLength: {
              //     value: 20,
              //     message: trans('program.name.length.max', {
              //       defaultValue: 'Maximum 20 characters',
              //     }),
              //   },
            }}
          />
          <InputFormController
            label={trans('registration.phonenumber', {defaultValue: 'Mobile Number'})}
            name='receiver_phone'
            control={methods?.control}
            placeholder={'7000000000'}
            defaultValue={''}
            required
            type={'phone'}
            rules={{
              required: 'This is required.',
              validate: validatePhoneNumber,
            }}
            {...{register: {...methods?.register}}}
          />
        </FormBody>
        <FormBody className='gap-8 d-flex'>
          <InputControllerMinimumMargin
            name='receiver_city'
            label={trans('sender.city')}
            placeholder={trans('')}
            type='text'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              //   maxLength: {
              //     value: 20,
              //     message: trans('program.name.length.max', {
              //       defaultValue: 'Maximum 20 characters',
              //     }),
              //   },
            }}
          />
          <InputControllerMinimumMargin
            name='receiver_street'
            label={trans('sender.street')}
            placeholder={trans('')}
            type='text'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              //   maxLength: {
              //     value: 20,
              //     message: trans('program.name.length.max', {
              //       defaultValue: 'Maximum 20 characters',
              //     }),
              //   },
            }}
          />
        </FormBody>
        <FormBody className='gap-8 mt-8 d-flex'>
          <InputControllerMinimumMargin
            name='receiver_additionalInfo'
            label={trans('sender.additionalInfo')}
            placeholder={trans('')}
            type='text'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              //   maxLength: {
              //     value: 20,
              //     message: trans('program.name.length.max', {
              //       defaultValue: 'Maximum 20 characters',
              //     }),
              //   },
            }}
          />
          <InputControllerMinimumMargin
            name='receiver_buildingName'
            label={trans('sender.building.name')}
            placeholder={trans('')}
            type='text'
            required
            control={methods?.control}
            rules={{
              required: 'This is required.',
              //   maxLength: {
              //     value: 20,
              //     message: trans('program.name.length.max', {
              //       defaultValue: 'Maximum 20 characters',
              //     }),
              //   },
            }}
          />
        </FormBody>
      </div>
    </div>
  )
}
