"use client"

import { useState } from "react"
import { FlowBuilder } from "@/components/flow-builder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function BuilderPage() {
  const [flowName, setFlowName] = useState("Untitled Flow")
  const router = useRouter()

  const handleSave = async () => {
    // Here you would save the flow to your NestJS backend
    // For now, we'll just redirect back to the home page
    router.push("/")
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/")}>
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Label htmlFor="flow-name" className="sr-only">
              Flow Name
            </Label>
            <Input
              id="flow-name"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="font-medium text-lg w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Preview
          </Button>
          <Button onClick={handleSave}>Save Flow</Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <FlowBuilder />
      </div>
    </div>
  )
}
