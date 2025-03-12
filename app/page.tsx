'use client'

import { useState, useEffect, useRef } from 'react'
import { client } from '@/sanity/lib/client'
import SearchBar from '@/components/SearchBar'
import SnippetList from '@/components/SnippetList'
import SnippetModal from '@/components/SnippetModal'
import Loading from '@/components/Loading'

interface Snippet {
  _id: string
  title: string
  description: string
  code: string
  tags: string[]
  createdAt: string
}

async function getSnippets(start: number, limit: number): Promise<Snippet[]> {
  const query = `*[_type == "snippet"] | order(createdAt desc) [${start}...${start + limit}]`
  return await client.fetch(query)
}

export default function HomePage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([])
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [start, setStart] = useState(0)
  const limit = 10

  const observer = useRef<IntersectionObserver | null>(null)
  const lastSnippetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getSnippets(0, limit).then((data) => {
      setSnippets(data)
      setFilteredSnippets(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSnippets(snippets)
    } else {
      const lowerQuery = searchQuery.toLowerCase()
      setFilteredSnippets(
        snippets.filter(
          (snippet) =>
            snippet.title.toLowerCase().includes(lowerQuery) ||
            snippet.description.toLowerCase().includes(lowerQuery) ||
            snippet.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
      )
    }
  }, [searchQuery, snippets])

  useEffect(() => {
    if (loading || loadingMore) return

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreSnippets()
        }
      },
      { threshold: 1.0 }
    )

    if (lastSnippetRef.current) {
      observer.current.observe(lastSnippetRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [snippets])

  const loadMoreSnippets = () => {
    setLoadingMore(true)
    const newStart = start + limit

    getSnippets(newStart, limit).then((data) => {
      if (data.length > 0) {
        setSnippets((prev) => [...prev, ...data])
        setFilteredSnippets((prev) => [...prev, ...data])
        setStart(newStart)
      }
      setLoadingMore(false)
    })
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
        JavaScript Snippet Hub
      </h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SnippetList snippets={filteredSnippets} onSelect={setSelectedSnippet} />
      <div ref={lastSnippetRef} className="h-10" />
      {loadingMore && <Loading />}
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
