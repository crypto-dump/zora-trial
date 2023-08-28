import { COLORS, ORDER_BY_LIST } from 'constants/unsplash'

import Dropdown from 'components/Dropdown/Dropdown'
import Pagination from 'components/Pagination/Pagination'
import SearchForm from 'components/SearchForm/SearchForm'
import useGetPhotos from 'hooks/useGetPhotos'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ColorId, SearchOrderBy } from 'unsplash-js'

const Gallery = () => {
  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [orderBy, setOrderBy] = useState<SearchOrderBy>()
  const [color, setColor] = useState<ColorId>()

  const { data, totalPage, loading } = useGetPhotos({
    query,
    page,
    orderBy,
    color,
  })

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col w-full p-2 mx-auto max-w-screen-md sm:p-4 gap-4">
        <div className="flex items-center gap-2 ">
          <SearchForm
            onSearch={(searchQuery) => {
              setPage(1)
              setQuery(searchQuery)
            }}
          />
        </div>
        <div className="flex flex-col w-full mx-auto gap-4 sm:flex-row max-w-screen-md">
          <Dropdown
            label="Filter by color:"
            value={color}
            onChange={(value) => setColor(value as ColorId)}
            options={COLORS}
          />
          <Dropdown
            label="Sort by:"
            value={orderBy}
            onChange={(value) => setOrderBy(value as SearchOrderBy)}
            options={ORDER_BY_LIST}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        {loading ? (
          <h5 className="m-auto">loading ...</h5>
        ) : !data?.length ? (
          <h5 className="m-auto">No data available</h5>
        ) : (
          <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 sm:px-4">
            {data?.map((item) => (
              <LazyLoadImage
                src={item.urls.regular}
                key={item.id}
                alt={item.alt_description ?? ''}
                className="object-cover w-full h-[300px]"
                effect="opacity"
                placeholderSrc={item.urls.thumb}
              />
            ))}
          </div>
        )}
      </div>
      <div className="inline-flex w-full p-4 mx-auto max-w-screen-md">
        <Pagination page={page} onUpdatePage={setPage} totalPage={totalPage} />
      </div>
    </div>
  )
}

export default Gallery
