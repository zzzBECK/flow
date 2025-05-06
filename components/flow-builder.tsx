"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  Panel,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow"
import "reactflow/dist/style.css"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { QuestionNode } from "@/components/nodes/question-node"
import { ResultNode } from "@/components/nodes/result-node"
import { HelpCircle, CheckCircle, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define custom node types
const nodeTypes: NodeTypes = {
  question: QuestionNode,
  result: ResultNode,
}

export function FlowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const { project } = useReactFlow()

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds))
    },
    [setEdges],
  )

  // Add a new question node
  const addQuestionNode = useCallback(() => {
    if (!reactFlowWrapper.current) return

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = project({
      x: reactFlowBounds.width / 2,
      y: reactFlowBounds.height / 3,
    })

    const newNode: Node = {
      id: uuidv4(),
      type: "question",
      position,
      data: {
        label: "New Question",
        options: [
          { id: uuidv4(), text: "Yes" },
          { id: uuidv4(), text: "No" },
        ],
      },
    }

    setNodes((nds) => nds.concat(newNode))
  }, [project, setNodes])

  // Add a new result node
  const addResultNode = useCallback(() => {
    if (!reactFlowWrapper.current) return

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = project({
      x: reactFlowBounds.width / 2,
      y: reactFlowBounds.height / 2,
    })

    const newNode: Node = {
      id: uuidv4(),
      type: "result",
      position,
      data: {
        content: "This is a result node. Edit this text to provide information or a conclusion.",
      },
    }

    setNodes((nds) => nds.concat(newNode))
  }, [project, setNodes])

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  // Delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
      setSelectedNode(null)
    }
  }, [selectedNode, setNodes, setEdges])

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />

        <Panel position="top-left" className="bg-white p-2 rounded-md shadow-sm border border-slate-200">
          <div className="flex flex-col space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={addQuestionNode} size="sm" className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a question node with multiple choice options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={addResultNode} size="sm" variant="outline" className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Add Result
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a result node (endpoint of the flow)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {selectedNode && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={deleteSelectedNode} size="sm" variant="destructive" className="flex items-center">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Node
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete the selected node</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export function FlowBuilderWrapper() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  )
}
