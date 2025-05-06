"use client"

import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

type ResultNodeData = {
  content: string
}

export function ResultNode({ data, isConnectable }: NodeProps<ResultNodeData>) {
  const [content, setContent] = useState<string>(data.content)

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent)
    // In a real app, you'd update the node data in the parent component
  }, [])

  return (
    <Card className="min-w-[250px] max-w-[300px] border-2 border-green-200">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-green-500" />

      <CardContent className="p-3">
        <div className="bg-green-50 text-green-800 text-xs font-medium px-2 py-1 rounded mb-2">Result</div>
        <Textarea
          value={content}
          onChange={(e) => updateContent(e.target.value)}
          className="min-h-[100px] text-sm resize-none"
          placeholder="Enter result content..."
        />
      </CardContent>
    </Card>
  )
}
