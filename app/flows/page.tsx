"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit, Play, Trash2 } from "lucide-react"

// Mock data - in a real app, you'd fetch this from your NestJS API
const mockFlows = [
  { id: "1", name: "Customer Onboarding", nodeCount: 8, createdAt: "2023-10-15" },
  { id: "2", name: "Product Recommendation", nodeCount: 12, createdAt: "2023-10-10" },
  { id: "3", name: "Support Troubleshooting", nodeCount: 15, createdAt: "2023-10-05" },
]

export default function FlowsPage() {
  const [flows, setFlows] = useState(mockFlows)

  // In a real app, you'd fetch flows from your API
  useEffect(() => {
    // Fetch flows from API
    // const fetchFlows = async () => {
    //   const response = await fetch('/api/flows')
    //   const data = await response.json()
    //   setFlows(data)
    // }
    // fetchFlows()
  }, [])

  const handleDelete = (id: string) => {
    // In a real app, you'd call your API to delete the flow
    setFlows(flows.filter((flow) => flow.id !== id))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Flows</h1>
        <Link href="/builder">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Flow
          </Button>
        </Link>
      </div>

      {flows.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-4">You haven't created any flows yet</p>
          <Link href="/builder">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Flow
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.map((flow) => (
            <Card key={flow.id} className="overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>{flow.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-sm text-slate-500">
                  <p>{flow.nodeCount} nodes</p>
                  <p>Created: {flow.createdAt}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-slate-50 p-2">
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(flow.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
