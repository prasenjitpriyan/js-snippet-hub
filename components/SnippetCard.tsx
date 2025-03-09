import { Highlight, themes } from 'prism-react-renderer'

interface Snippet {
  _id: string
  title: string
  description: string
  code: string
  tags: string[]
  createdAt: string
}

interface SnippetCardProps {
  snippet: Snippet
  onSelect: (snippet: Snippet) => void
}

export default function SnippetCard({ snippet, onSelect }: SnippetCardProps) {
  return (
    <div
      className="p-5 max-w-[440px] bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-800 cursor-pointer"
      onClick={() => onSelect(snippet)}
    >
      <h2 className="text-2xl font-semibold text-blue-400">{snippet.title}</h2>
      <p className="text-gray-500 text-sm">
        Added on: {new Date(snippet.createdAt).toLocaleDateString()}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {snippet.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm font-semibold bg-gray-800 text-gray-300 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-gray-400 mt-3 text-sm">{snippet.description}</p>

      {/* Code Preview without Scrollbar */}
      <div className="mt-4 bg-gray-800 rounded-lg overflow-hidden">
        <Highlight
          theme={themes.nightOwl}
          code={snippet.code}
          language="javascript"
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, whiteSpace: 'pre-wrap' }} // Prevents horizontal scroll
              className="p-4 rounded-lg text-sm leading-relaxed"
            >
              {tokens.slice(0, 4).map(
                (
                  line,
                  i // Limit to 4 lines
                ) => (
                  <div key={i} {...getLineProps({ line })} className="truncate">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                )
              )}
              <span className="text-gray-500">... Click to expand</span>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
