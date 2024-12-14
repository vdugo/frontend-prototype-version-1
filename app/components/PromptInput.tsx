import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const examplePrompts = [
  { value: 'example1', label: 'Print numbers 1 to 10', prompt: 'Create a function that prints numbers from 1 to 10' },
  { value: 'example2', label: 'Calculate sum of 1 to 10', prompt: 'Write a function to calculate the sum of numbers from 1 to 10' },
  { value: 'example3', label: 'Print even numbers', prompt: 'Create a function that prints even numbers from 1 to 10' },
  { value: 'example4', label: 'Calculate product of 1 to 5', prompt: 'Write a function to calculate the product of numbers from 1 to 5' },
]

export default function PromptInput({ onSubmit, onReset }: { onSubmit: (prompt: string) => void, onReset: () => void }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onReset()
    onSubmit(prompt)
  }

  const handleExampleSelect = (value: string) => {
    const selectedPrompt = examplePrompts.find(p => p.value === value)
    if (selectedPrompt) {
      onReset()
      setPrompt(selectedPrompt.prompt)
      onSubmit(selectedPrompt.prompt)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select onValueChange={handleExampleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an example prompt" />
        </SelectTrigger>
        <SelectContent>
          {examplePrompts.map((example) => (
            <SelectItem key={example.value} value={example.value}>
              {example.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        className="min-h-[100px]"
      />
      <Button type="submit" className="w-full">Generate Code</Button>
    </form>
  )
}

