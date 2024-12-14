'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function CodeExecutor({ code, onExecute }: { code: string, onExecute: (output: string) => void }) {
  const [output, setOutput] = useState<string>('')

  const executeCode = () => {
    try {
      const func = new Function(code)
      
      // Capture console.log output
      const originalLog = console.log
      let logs: string[] = []
      console.log = (...args) => {
        logs.push(args.join(' '))
      }

      // Execute the function
      func()

      // Restore original console.log
      console.log = originalLog

      // Set the output
      const outputString = logs.join('\n')
      setOutput(outputString)
      onExecute(outputString)
    } catch (error) {
      const errorOutput = `Error: ${error}`
      setOutput(errorOutput)
      onExecute(errorOutput)
    }
  }

  return (
    <div className="w-full">
      <Button onClick={executeCode} className="mb-4">Execute Code</Button>
      {output && (
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code>{output}</code>
        </pre>
      )}
    </div>
  )
}

