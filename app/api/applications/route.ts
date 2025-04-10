import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { JobApplication } from "@/lib/types"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const applications = await db.collection("applications").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const data: JobApplication = await request.json()

    // Add timestamps
    const applicationWithTimestamps = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection("applications").insertOne(applicationWithTimestamps)

    return NextResponse.json(
      {
        message: "Application created successfully",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 })
  }
}
