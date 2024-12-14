'use client'

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function SolveChallengeWithoutAI({ onSubmit, challenge, originalPrompt }: { onSubmit: (code: string, output: string) => void, challenge: string, originalPrompt: string }) {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

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
      onSubmit(code, outputString)
    } catch (error) {
      const errorOutput = `Error: ${error}`
      setOutput(errorOutput)
      onSubmit(code, errorOutput)
    }
  }

  const getChallengeDescription = () => {
    switch (challenge) {
      case 'printNumbers':
        return "Print numbers from 1 to 10, each on a new line."
      case 'calculateSum':
        return "Calculate the sum of numbers from 1 to 10 and print the result as 'Sum: X'."
      case 'printEvenNumbers':
        return "Print even numbers from 1 to 10, each on a new line."
      case 'calculateProduct':
        return "Calculate the product of numbers from 1 to 5 and print the result as 'Product: X'."
      default:
        return "Solve the challenge based on the previous example."
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    setOutput('') // Clear the output when the code changes
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold">Solve Challenge Without AI:</h2>
      <p className="text-lg">Original prompt:</p>
      <p className="font-semibold text-blue-700">{originalPrompt}</p>
      <p className="text-lg">Challenge description:</p>
      <p className="font-semibold text-blue-700">{getChallengeDescription()}</p>
      <Textarea 
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter your solution here..." 
        className="min-h-[150px]"
      />
      <Button onClick={executeCode} className="w-full">Execute Code</Button>
      {output && (
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code>{output}</code>
        </pre>
      )}
    </div>
  )
}

