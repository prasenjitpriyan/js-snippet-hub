import SnippetCard from './SnippetCard'

interface Snippet {
  _id: string
  title: string
  description: string
  code: string
  tags: string[]
  createdAt: string
}

interface SnippetListProps {
  snippets: Snippet[]
  onSelect: (snippet: Snippet) => void
}

export default function SnippetList({ snippets, onSelect }: SnippetListProps) {
  return (
    <div className="flex justify-center mt-16 gap-8 flex-wrap">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} onSelect={onSelect} />
      ))}
    </div>
  )
}
