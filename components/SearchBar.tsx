import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchBar({
  searchQuery,
  setSearchQuery
}: SearchBarProps) {
  return (
    <div className="mt-6 flex items-center justify-center max-w-lg mx-auto bg-gray-800 p-3 rounded-lg">
      <FiSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search snippets by title or tag..."
        className="w-full bg-transparent text-white focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
