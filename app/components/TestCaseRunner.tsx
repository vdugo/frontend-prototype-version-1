import { Button } from "@/components/ui/button"

export default function TestCaseRunner({ onRunTests, testsPassed }: { onRunTests: () => void, testsPassed: boolean }) {
  return (
    <div className="w-full">
      <Button onClick={onRunTests} disabled={testsPassed} className="w-full">
        {testsPassed ? '✅ Tests Passed!' : 'Run Tests'}
      </Button>
    </div>
  )
}

