import * as yup from 'yup'

export const schema = yup.object().shape({
  shopLink: yup.string().url().required('Shop link is required'),
  delevaryLink: yup.string().url().required('Shop link is required'),
})
