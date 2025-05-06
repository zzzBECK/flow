import { NextResponse } from "next/server"
import type { Flow } from "@/lib/types"

// Mock database - in a real app, you'd connect to your NestJS backend
const flows: Flow[] = []

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const flow = flows.find((f) => f.id === params.id)

  if (!flow) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 })
  }

  return NextResponse.json(flow)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const flowIndex = flows.findIndex((f) => f.id === params.id)

  if (flowIndex === -1) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 })
  }

  const updatedFlow = {
    ...flows[flowIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  }

  flows[flowIndex] = updatedFlow

  return NextResponse.json(updatedFlow)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const flowIndex = flows.findIndex((f) => f.id === params.id)

  if (flowIndex === -1) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 })
  }

  flows.splice(flowIndex, 1)

  return NextResponse.json({ success: true })
}
