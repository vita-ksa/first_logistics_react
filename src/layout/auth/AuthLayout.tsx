import {useEffect} from 'react'
import {Outlet, Link, useLocation} from 'react-router-dom'
import Logo from 'assets/icons/default-small.svg'
import {Notification} from 'pages/notification'
import {DropdownController} from 'components'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {setLang} from 'locales/localesSlice'
import styled from 'styled-components'

export const DropdownControllerStyled = styled(DropdownController)`
  width: 100%;
  max-width: 250px;
  margin-inline-end: 3.5rem;
`

const langs = [
  {label: 'English', value: 'en'},
  {
    label: 'Arabic',
    value: 'ar',
  },
]

export const AuthLayout = () => {
  const {pathname} = useLocation()
  const {lang} = useSelector<any>((state) => state?.locales) as any
  const dispatch = useDispatch<any>()

  const {control} = useForm({
    mode: 'all',
    defaultValues: {
      lang: {label: lang === 'en' ? 'English' : 'Arabic', value: lang},
    } as any,
  })

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  const handelChangeLangAction = (value: any) => {
    dispatch(setLang<any>(value?.value))
  }

  return (
    <div
      className='d-flex flex-column flex-lg-row flex-column-fluid'
      style={{height: `${pathname === '/auth/registration' ? 'unset' : '100%'}`}}
    >
      {/* begin::Body */}

      <div className='order-2 p-10 d-flex flex-column flex-lg-row-fluid w-lg-50 order-lg-2'>
        <div className='d-flex justify-content-end align-items-center'>
          <DropdownControllerStyled
            setExternalValue={handelChangeLangAction}
            className=''
            name='lang'
            items={langs}
            control={control}
          />
        </div>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='p-10 w-lg-500px'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='order-1 d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-lg-1'
        style={{
          background: 'linear-gradient(to right, #000000, #434343)',
        }}
      >
        {/* begin::Content */}
        <div className='px-5 d-flex flex-column flex-center py-15 px-md-15 w-100'>
          {/* begin::Logo */}
          <Link to='/' className='mb-12'>
            <img alt='Logo' src={Logo} className='h-75px' />
          </Link>
          {/* end::Logo */}
          {/* begin::Title */}
          <h1 className='text-center text-white fs-2qx fw-bolder mb-7 '>Welcome</h1>
          {/* end::Title */}
          {/* begin::Image */}

          <img
            className='mx-auto mb-10 w-275px w-md-50 w-xl-350px mb-lg-20'
            src={Logo}
            alt='auth Screen'
          />
          {/* end::Image */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
      <Notification />
    </div>
  )
}
