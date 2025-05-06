"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

// This would come from your API in a real application
const mockFlow = {
  id: "1",
  name: "Customer Onboarding",
  nodes: [
    {
      id: "start",
      type: "question",
      question: "Are you a new customer?",
      options: [
        { value: "yes", label: "Yes", nextNodeId: "new-customer" },
        { value: "no", label: "No", nextNodeId: "existing-customer" },
      ],
    },
    {
      id: "new-customer",
      type: "question",
      question: "What product are you interested in?",
      options: [
        { value: "product-a", label: "Product A", nextNodeId: "product-a-info" },
        { value: "product-b", label: "Product B", nextNodeId: "product-b-info" },
      ],
    },
    {
      id: "existing-customer",
      type: "question",
      question: "Do you need support with an existing product?",
      options: [
        { value: "yes", label: "Yes", nextNodeId: "support-options" },
        { value: "no", label: "No", nextNodeId: "upsell-options" },
      ],
    },
    {
      id: "product-a-info",
      type: "result",
      content: "Product A is our flagship solution for small businesses. Here's how to get started...",
    },
    {
      id: "product-b-info",
      type: "result",
      content: "Product B is designed for enterprise customers. Our team will contact you to schedule a demo.",
    },
    {
      id: "support-options",
      type: "result",
      content: "Please visit our support portal or call our customer service at 1-800-123-4567.",
    },
    {
      id: "upsell-options",
      type: "result",
      content: "Check out our latest offerings and special discounts for existing customers!",
    },
  ],
}

export default function RunFlowPage({ params }: { params: { id: string } }) {
  const [currentNode, setCurrentNode] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])

  // In a real app, you'd fetch the flow from your API
  useEffect(() => {
    // Fetch flow from API
    // const fetchFlow = async () => {
    //   const response = await fetch(`/api/flows/${params.id}`)
    //   const data = await response.json()
    //   setCurrentNode(data.nodes.find(node => node.id === 'start'))
    // }
    // fetchFlow()

    // Using mock data for now
    setCurrentNode(mockFlow.nodes.find((node) => node.id === "start"))
  }, [params.id])

  const handleOptionSelect = (nextNodeId: string) => {
    setHistory([...history, currentNode])
    setCurrentNode(mockFlow.nodes.find((node) => node.id === nextNodeId))
  }

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1]
      setCurrentNode(previousNode)
      setHistory(history.slice(0, -1))
    }
  }

  if (!currentNode) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{mockFlow.name}</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl">{currentNode.type === "question" ? currentNode.question : "Result"}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentNode.type === "question" ? (
            <div className="space-y-4">
              {currentNode.options.map((option: any) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleOptionSelect(option.nextNodeId)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          ) : (
            <div className="prose">
              <p>{currentNode.content}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={history.length === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </CardFooter>
      </Card>

      <div className="text-sm text-slate-500 mt-8">
        <p>
          Progress: {history.length + 1} / {history.length + (currentNode.type === "result" ? 1 : 2)}
        </p>
      </div>
    </div>
  )
}
