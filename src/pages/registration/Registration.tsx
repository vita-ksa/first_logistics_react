import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {InputController, Button, InputFormController, DropdownController} from 'components'
import {useLocales, useNotification} from 'hooks'
import {schema} from './schema'
import {yupResolver} from '@hookform/resolvers/yup'
import {Link, useNavigate} from 'react-router-dom'
import {isEmpty} from 'lodash'
import {PasswordMeterComponent} from '_metronic/assets/ts/components/_PasswordMeterComponent'
import {useDispatch} from 'react-redux'
import {authAPI} from 'services/apis'
import {useSelector} from 'react-redux'
import {SUCCESS_STATUS} from 'constants/auth'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
  phone: '',
}

const options = [
  {
    label: 'Shop',
    value: 'Shop',
  },
  {
    label: 'Delivary Company ',
    value: 'DeliveryCompany',
  },
]
export const Registration = () => {
  const dispatch = useDispatch<any>()
  const loading = useSelector<any>((state) => state.register.loading === 'pending')
  const navigateTo = useNavigate()
  const {Trans, trans} = useLocales()
  const {success, error} = useNotification()

  const {
    control,
    handleSubmit,
    formState: {isValid, isSubmitted, dirtyFields},
    register,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValues as any,
  })
  const acceptTerms = getValues('acceptTerms')

  const registr = async (_data: any) => {
    const data = {
      name: `${_data?.firstname} ${_data?.lastname}`,
      phone: _data?.phone,
      email: _data?.email,
      password: _data?.password,
      companyName: _data?.companyName,
      type: _data?.type?.value,
    }
    const {payload} = await dispatch(authAPI.register()({...data}))

    if (SUCCESS_STATUS.includes(payload?.status)) {
      success({
        message: `Success`,
      })
      navigateTo('/auth/login')
    } else {
      error({
        message: payload.message?.message,
      })
    }
  }

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={handleSubmit((data) => registr(data))}
    >
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='mb-3 text-dark fw-bolder'>
          <Trans i18nKey={'sign.up'}>Sign Up</Trans>
        </h1>
        {/* end::Title */}

        <div className='text-gray-500 fw-semibold fs-6'>
          <Trans i18nKey={'your.social.campaigns'}>Your Social Campaigns</Trans>
        </div>
      </div>
      <>
        <InputFormController
          label={trans('registration.first.name', {defaultValue: 'First name'})}
          name='firstname'
          control={control}
          required
          placeholder={trans('registration.first.name', {defaultValue: 'First name'})}
          type={'text'}
        />
      </>
      <>
        <InputFormController
          label={trans('registration.last.name', {defaultValue: 'Last name'})}
          name='lastname'
          control={control}
          required
          placeholder={trans('registration.last.name', {defaultValue: 'Last name'})}
          type={'text'}
        />
      </>

      <>
        <InputFormController
          label={trans('registration.phonenumber', {defaultValue: 'Mobile Number'})}
          name='phone'
          control={control}
          placeholder={'5000000000'}
          required
          type={'phone'}
          {...register}
        />
      </>
      <>
        <InputController
          name='email'
          label={trans('signin.email')}
          type='text'
          control={control}
          placeholder={trans('signin.email.placeholder')}
        />
      </>
      <>
        <InputController
          name='password'
          label={trans('signin.password')}
          type='password'
          control={control}
          placeholder={trans('signin.password.placeholder')}
        />
        {/* <div className='mb-3 d-flex align-items-center' data-kt-password-meter-control='highlight'>
          <div className='rounded flex-grow-1 bg-secondary bg-active-success h-5px me-2'></div>
          <div className='rounded flex-grow-1 bg-secondary bg-active-success h-5px me-2'></div>
          <div className='rounded flex-grow-1 bg-secondary bg-active-success h-5px me-2'></div>
          <div className='rounded flex-grow-1 bg-secondary bg-active-success h-5px'></div>
        </div>
        <div className='mb-8 text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div> */}
      </>
      <>
        <InputFormController
          label={trans('registration.companyName.name', {defaultValue: 'Company Name'})}
          name='companyName'
          control={control}
          required
          placeholder={trans('registration.companyName.name', {defaultValue: 'Company Name'})}
          type={'text'}
        />
      </>
      <>
        <DropdownController
          className='mb-8'
          name='type'
          label={trans('registration.type', {defaultValue: 'Type'})}
          items={options}
          control={control}
          placeholder={trans('registration.type', {defaultValue: 'Type'})}
          required
        />

        {/* <InputFormController
          label={trans('promo.code.optional', {defaultValue: 'Promo Code (optional)'})}
          name='promo_code'
          control={control}
          placeholder={trans('promo.code', {defaultValue: 'Promo Code'})}
          type={'number'}
        /> */}
      </>

      <div className='mb-8 fv-row'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...register('acceptTerms')}
          />
          <span>
            <Trans i18nKey={'i.accept.the'}> I Accept the</Trans>
            <a href='#' target='_blank' className='ms-1 link-primary'>
              <Trans i18nKey={'terms'}> Terms</Trans>
            </a>
            .
          </span>
        </label>
        {/* {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )} */}
      </div>
      {/* begin::Form group */}
      <div className='text-center'>
        <Button
          type='submit'
          id='kt_sign_up_submit'
          className='mb-5 btn btn-lg btn-primary w-100'
          disabled={!isValid || isEmpty(dirtyFields) || !acceptTerms || Boolean(loading)}
          loading={Boolean(loading)}
        >
          <Trans i18nKey={'g.submit'}>g.submit</Trans>
        </Button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='mb-5 btn btn-lg btn-light-primary w-100'
          >
            <Trans i18nKey={'g.cancel'}>Cancel</Trans>
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
