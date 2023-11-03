import * as yup from 'yup'

export const schema = yup.object().shape({
  paymentLink: yup.string().url().required('payment link is required'),
})
