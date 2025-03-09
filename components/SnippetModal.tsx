import { FiCopy, FiX } from 'react-icons/fi'
import { Highlight, themes } from 'prism-react-renderer'

interface Snippet {
  _id: string
  title: string
  description: string
  code: string
  tags: string[]
  createdAt: string
}

interface SnippetModalProps {
  snippet: Snippet
  onClose: () => void
  onCopy: () => void
  copied: boolean
}

export default function SnippetModal({
  snippet,
  onClose,
  onCopy,
  copied
}: SnippetModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full relative shadow-lg border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FiX size={20} />
        </button>
        <h2 className="text-2xl font-bold text-blue-400">{snippet.title}</h2>
        <p className="text-gray-500 text-sm">
          Added on: {new Date(snippet.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={onCopy}
          className="absolute top-3 right-10 text-gray-400 hover:text-white"
        >
          <FiCopy size={18} />
        </button>
        {copied && (
          <p className="text-green-400 text-sm text-center mt-2">Copied!</p>
        )}

        <div className="mt-4 bg-gray-800 rounded-lg overflow-auto max-h-80 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-400">
          <Highlight
            theme={themes.nightOwl}
            code={snippet.code}
            language="javascript"
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                style={style}
                className="p-4 rounded-lg text-sm leading-relaxed"
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    </div>
  )
}
