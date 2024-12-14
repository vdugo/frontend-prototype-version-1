'use client'

import { useState, useCallback } from 'react'
import PromptInput from './components/PromptInput'
import CodeDisplay from './components/CodeDisplay'
import TestCaseRunner from './components/TestCaseRunner'
import ChallengeNotification from './components/ChallengeNotification'
import SolveChallengeWithoutAI from './components/SolveChallengeWithoutAI'
import CodeExecutor from './components/CodeExecutor'

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState('')
  const [testsPassed, setTestsPassed] = useState(false)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [newChallenge, setNewChallenge] = useState(false)
  const [executionOutput, setExecutionOutput] = useState('')
  const [newChallengeCompleted, setNewChallengeCompleted] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [originalPrompt, setOriginalPrompt] = useState('')

  const resetState = useCallback(() => {
    setGeneratedCode('')
    setTestsPassed(false)
    setChallengeCompleted(false)
    setNewChallenge(false)
    setExecutionOutput('')
    setNewChallengeCompleted(false)
    setCurrentChallenge('')
    setErrorMessage('')
    setOriginalPrompt('')
  }, [])

  const handlePromptSubmit = (prompt: string) => {
    setOriginalPrompt(prompt)
    let code = ''
    if (prompt.includes('prints numbers from 1 to 10')) {
      code = `
function printNumbers() {
  for (let i = 1; i <= 10; i++) {
    console.log(i);
  }
}
printNumbers();
`
      setCurrentChallenge('printNumbers')
    } else if (prompt.includes('calculate the sum of numbers from 1 to 10')) {
      code = `
function calculateSum() {
  let sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += i;
  }
  console.log("Sum:", sum);
}
calculateSum();
`
      setCurrentChallenge('calculateSum')
    } else if (prompt.includes('prints even numbers from 1 to 10')) {
      code = `
function printEvenNumbers() {
  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
}
printEvenNumbers();
`
      setCurrentChallenge('printEvenNumbers')
    } else if (prompt.includes('calculate the product of numbers from 1 to 5')) {
      code = `
function calculateProduct() {
  let product = 1;
  for (let i = 1; i <= 5; i++) {
    product *= i;
  }
  console.log("Product:", product);
}
calculateProduct();
`
      setCurrentChallenge('calculateProduct')
    }
    setGeneratedCode(code)
  }

  const runTests = () => {
    const output = executionOutput.trim().split('\n')
    let passed = false

    if (generatedCode.includes('printNumbers()')) {
      passed = output.length === 10 && output.every((num, index) => parseInt(num) === index + 1)
    } else if (generatedCode.includes('calculateSum()')) {
      passed = output.length === 1 && output[0] === 'Sum: 55'
    } else if (generatedCode.includes('printEvenNumbers()')) {
      passed = output.length === 5 && output.every((num, index) => parseInt(num) === (index + 1) * 2)
    } else if (generatedCode.includes('calculateProduct()')) {
      passed = output.length === 1 && output[0] === 'Product: 120'
    }

    setTestsPassed(passed)
    setChallengeCompleted(true)
  }

  const startNewChallenge = () => {
    setNewChallenge(true)
    setGeneratedCode('')
    setTestsPassed(false)
    setChallengeCompleted(false)
    setExecutionOutput('')
    setNewChallengeCompleted(false)
    setErrorMessage('')
  }

  const handleNewChallengeSubmit = (code: string, output: string) => {
    const lines = output.trim().split('\n')
    let isCorrect = false

    if (currentChallenge === 'printNumbers') {
      isCorrect = lines.length === 10 &&
        lines.every((line, index) => parseInt(line.trim()) === index + 1)
      if (!isCorrect) {
        setErrorMessage("Great effort! Your output is close, but not quite right. Make sure you're printing numbers from 1 to 10, each on a new line. Try again!")
      }
    } else if (currentChallenge === 'calculateSum') {
      isCorrect = lines.length === 1 && lines[0].trim() === 'Sum: 55'
      if (!isCorrect) {
        setErrorMessage("You're on the right track! Remember to calculate the sum of numbers from 1 to 10 and print it as 'Sum: X'. Keep going!")
      }
    } else if (currentChallenge === 'printEvenNumbers') {
      isCorrect = lines.length === 5 &&
        lines.every((line, index) => parseInt(line.trim()) === (index + 1) * 2)
      if (!isCorrect) {
        setErrorMessage("Nice try! Make sure you're only printing even numbers from 1 to 10. Double-check your logic and try again!")
      }
    } else if (currentChallenge === 'calculateProduct') {
      isCorrect = lines.length === 1 && lines[0].trim() === 'Product: 120'
      if (!isCorrect) {
        setErrorMessage("You're close! Remember to calculate the product of numbers from 1 to 5 and print it as 'Product: X'. Give it another shot!")
      }
    }

    setNewChallengeCompleted(isCorrect)
    if (isCorrect) {
      setErrorMessage('')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Computational Thinking Learning System</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <PromptInput onSubmit={handlePromptSubmit} onReset={resetState} />
        </div>
        <Tabs defaultValue="code" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Generated Code</TabsTrigger>
            <TabsTrigger value="output">Code Output</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="bg-white rounded-lg shadow-lg p-6">
            <CodeDisplay code={generatedCode} />
          </TabsContent>
          <TabsContent value="output" className="bg-white rounded-lg shadow-lg p-6">
            <CodeExecutor code={generatedCode} onExecute={setExecutionOutput} />
          </TabsContent>
        </Tabs>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <TestCaseRunner onRunTests={runTests} testsPassed={testsPassed} />
        </div>
        {challengeCompleted && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <ChallengeNotification onNext={startNewChallenge} />
          </div>
        )}
        {newChallenge && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <SolveChallengeWithoutAI onSubmit={handleNewChallengeSubmit} challenge={currentChallenge} originalPrompt={originalPrompt} />
            {newChallengeCompleted && (
              <div className="mt-4 p-4 bg-green-100 rounded-md">
                <p className="text-green-800 font-semibold">Congratulations, you've solved the challenge without AI assistance! You are not overreliant on AI.</p>
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-4 bg-yellow-100 rounded-md">
                <p className="text-yellow-800">{errorMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

