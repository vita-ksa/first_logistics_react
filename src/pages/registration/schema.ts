import {isValidPhoneNumber} from 'react-phone-number-input'
import * as yup from 'yup'

export const schema = yup
  .object()
  .shape({
    firstname: yup
      .string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('First name is required'),
    email: yup
      .string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    lastname: yup
      .string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Last name is required'),
    password: yup
      .string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
    //   changepassword: yup.string()
    //     .required('Password confirmation is required')
    //     .when('password', {
    //       is: (val: string) => (val && val.length > 0 ? true : false),
    //       then: yup.string().oneOf([yup.ref('password')], "Password and Confirm Password didn't match"),
    //     }),
    acceptTerms: yup.bool().required('You must accept the terms and conditions'),
    phone: yup
      .string()
      .nullable()
      .test({
        message: 'Phone Number is not valid, check country code',
        test: (phoneNumber: any) => {
          return isValidPhoneNumber(String(phoneNumber))
        },
      })
      .required('required'),
  })
  .required()
