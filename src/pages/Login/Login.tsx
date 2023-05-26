import {useDispatch, useSelector} from 'react-redux'
import {authAPI} from 'services/apis'
import {useLocales} from 'hooks'
import {InputController, Button} from 'components'
import {useForm} from 'react-hook-form'
import {schema} from './schema'
import {yupResolver} from '@hookform/resolvers/yup'
import {useState} from 'react'
import {SUCCESS_STATUS} from 'constants/auth'
import {Link} from 'react-router-dom'

const initialValues = {
  email: '',
  password: '',
}

export const Login = () => {
  const dispatch = useDispatch<any>()
  const authLoading = useSelector<any>((state) => state.auth.loading === 'pending')
  const {Trans, trans} = useLocales()
  const [error, setError] = useState()

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValues as any,
  })

  const login = async (data: any) => {
    const {payload} = await dispatch(authAPI.signIn()({...data}))

    if (!SUCCESS_STATUS.includes(payload?.status)) {
      setError(payload?.message?.message)
    }
  }

  return (
    <form className='form w-100' noValidate id='kt_login_signin_form'>
      <div className='text-start mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>
          <Trans i18nKey={'login.sign.in.to'} />
        </h1>
      </div>

      {error ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{error}</div>
        </div>
      ) : null}

      <InputController
        name='email'
        label={trans('signin.email')}
        type='text'
        control={control}
        placeholder={trans('signin.email.placeholder')}
      />
      <InputController
        name='password'
        label={trans('signin.password')}
        type='password'
        control={control}
        placeholder={trans('signin.password.placeholder')}
      />

      <div className='d-grid mb-10'>
        <Button
          disabled={!isValid || Boolean(authLoading)}
          onClick={handleSubmit((data) => login(data))}
          loading={Boolean(authLoading)}
        >
          <span className='indicator-label'> {trans('signin.entrance')}</span>
        </Button>
      </div>
      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
