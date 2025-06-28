export const dynamic = "force-dynamic"
import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1)
    const limit = Math.max(parseInt(searchParams.get("limit") || "10"), 1)
    const status = searchParams.get("status")?.toUpperCase()
    const deleted = searchParams.get("deleted")?.toLowerCase() // expecting 'active' or 'deleted'
    const role = searchParams.get("role")?.toUpperCase()

    const where: any = {}

    if (status) {
      where.profileStatus = status
    }

    if (role) {
      where.role = role
    }

    // Handle deleted filter
    if (deleted === "active") {
      where.deletedAt = null
    } else if (deleted === "deleted") {
      where.deletedAt = { not: null }
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          address: true,
          role: true,
          profileStatus: true,
          createdAt: true,
          city: true,
          state: true,
          deletedAt: true,
        },
      }),
    ])

    return NextResponse.json({ users, total, page, limit })
  } catch (error) {
    console.error("GET /api/users error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
