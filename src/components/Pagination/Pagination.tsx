type Props = {
  page: number
  totalPage: number
  onUpdatePage: (page: number) => void
}

const Pagination = ({ page, totalPage, onUpdatePage }: Props) => {
  const handlePagination = (updatedPage: number) => {
    if (updatedPage >= 1 && updatedPage <= totalPage) {
      onUpdatePage(updatedPage)
    }
  }

  return (
    <div className="inline-flex w-full">
      <button
        className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 disabled:bg-gray-100"
        disabled={page === 1}
        onClick={() => handlePagination(page - 1)}
      >
        Prev
      </button>
      <div className="flex-1 px-4 py-2 text-center text-gray-800 bg-gray-100">
        Page: {page}
      </div>
      <button
        className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400 disabled:bg-gray-100"
        disabled={page === totalPage}
        onClick={() => handlePagination(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
