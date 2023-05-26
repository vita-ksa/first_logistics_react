import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required('required'),
  sku: yup.string().required('required'),
})
