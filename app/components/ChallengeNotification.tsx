import { Button } from "@/components/ui/button"

export default function ChallengeNotification({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full text-center">
      <p className="mb-4 text-lg font-semibold text-green-600">Congratulations! You've completed this challenge.</p>
      <Button onClick={onNext} className="w-full">Solve Challenge Without AI</Button>
    </div>
  )
}

