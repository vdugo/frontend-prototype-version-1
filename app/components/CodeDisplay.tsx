import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeDisplay({ code }: { code: string }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Generated Code:</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-md">
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

