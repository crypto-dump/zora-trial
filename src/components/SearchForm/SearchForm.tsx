import { useState } from 'react'

type Props = {
  onSearch: (query: string) => void
}

const SearchForm = ({ onSearch }: Props) => {
  const [search, setSearch] = useState<string>('')

  return (
    <>
      <input
        type="text"
        name="query"
        className="flex-1 h-10 p-4 border rounded border-1-black"
        placeholder={`Search photos ...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => onSearch(search)}
      >
        Search
      </button>
    </>
  )
}
export default SearchForm
