import { createApi } from 'unsplash-js'

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY

const unsplashApi = createApi({
  accessKey: UNSPLASH_ACCESS_KEY || '',
  fetch,
})

export default unsplashApi
