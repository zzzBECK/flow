import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import type { Flow } from "@/lib/types"

// This is a mock implementation - in a real app, you'd connect to your NestJS backend
// or use a database directly

// Mock database
const flows: Flow[] = []

export async function GET() {
  return NextResponse.json(flows)
}

export async function POST(request: Request) {
  const body = await request.json()

  const newFlow: Flow = {
    id: uuidv4(),
    name: body.name || "Untitled Flow",
    nodes: body.nodes || [],
    edges: body.edges || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  flows.push(newFlow)

  return NextResponse.json(newFlow)
}
