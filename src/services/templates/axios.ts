import {default as axiosDefault} from 'axios'
import {withVersioning, VersioningStrategy, AxiosInstanceWithVersioning} from 'axios-api-versioning'

interface AxiosProps {
  url: string
  method?: string
  params?: any
}

const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_URL

if (process.env.NODE_ENV === 'development' && !BACKEND_API_ENDPOINT) {
  console.log(
    'BACKEND_API_ENDPOINT config value not found. Please check your environment variables.'
  )
}

const baseClient = axiosDefault.create({
  baseURL: `${BACKEND_API_ENDPOINT}`,
  withCredentials: false,
})

export const clientAction: AxiosInstanceWithVersioning = withVersioning(baseClient, {
  apiVersion: '',
  versioningStrategy: VersioningStrategy.UrlPath,
})

const axios = async ({url, method, params = {}, ...rest}: AxiosProps) => {
  const config = {
    url,
    method,
    data: {},
  }

  switch (method) {
    case 'POST':
    case 'PATCH':
    case 'PUT':
    case 'DELETE': {
      config.data = params?.data || params
      break
    }
    case 'UPLOAD': {
      config.data = params?.formData
      config.method = 'POST'
      break
    }
    case 'PATCH_UPLOAD': {
      config.data = params?.formData
      config.method = 'PATCH'
      break
    }
    default:
      break
  }

  return await clientAction({
    ...config,
    ...rest,
  })
}

export default axios
