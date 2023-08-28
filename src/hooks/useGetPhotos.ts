import { useEffect, useState } from 'react'
import { ColorId, SearchOrderBy } from 'unsplash-js'
import { Basic as PhotoType } from 'unsplash-js/dist/methods/photos/types'
import unsplashApi from 'utils/unsplashApi'

export type GetPhotoProps = {
  query: string
  page: number
  orderBy?: SearchOrderBy
  color?: ColorId
}

export type GetPhotoResult = {
  data?: PhotoType[]
  totalPage: number
  loading: boolean
}

const PAGE_LIMIT = 12

const useGetPhotos = ({ query, page, orderBy, color }: GetPhotoProps) => {
  const [list, setList] = useState<PhotoType[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [totalPage, setTotalPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    unsplashApi.search
      .getPhotos({ query, page, perPage: PAGE_LIMIT, orderBy, color })
      .then((res) => res.response)
      .then((data) => {
        setList(data?.results ?? [])
        setTotalPage(data?.total_pages ?? 0)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [color, orderBy, page, query])

  return {
    data: list,
    totalPage,
    loading,
  }
}

export default useGetPhotos
