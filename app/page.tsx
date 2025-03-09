'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import SearchBar from '@/components/SearchBar'
import SnippetList from '@/components/SnippetList'
import SnippetModal from '@/components/SnippetModal'

interface Snippet {
  _id: string
  title: string
  description: string
  code: string
  tags: string[]
  createdAt: string
}

async function getSnippets(): Promise<Snippet[]> {
  const query = `*[_type == "snippet"] | order(createdAt desc)`
  return await client.fetch(query)
}

export default function HomePage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([])
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null)
  const [copied, setCopied] = useState(false)

  // Fetch snippets from Sanity
  useEffect(() => {
    getSnippets().then((data) => {
      setSnippets(data)
      setFilteredSnippets(data) // Initialize with all snippets
    })
  }, [])

  // Filter snippets based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSnippets(snippets)
    } else {
      const lowerQuery = searchQuery.toLowerCase()
      setFilteredSnippets(
        snippets.filter(
          (snippet) =>
            snippet.title.toLowerCase().includes(lowerQuery) ||
            snippet.description.toLowerCase().includes(lowerQuery) || // Ensure description is included in the search
            snippet.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
      )
    }
  }, [searchQuery, snippets])

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
        JavaScript Snippet Hub
      </h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SnippetList snippets={filteredSnippets} onSelect={setSelectedSnippet} />
      {selectedSnippet && (
        <SnippetModal
          snippet={selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
          onCopy={() => {
            navigator.clipboard.writeText(selectedSnippet.code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          copied={copied}
        />
      )}
    </main>
  )
}
