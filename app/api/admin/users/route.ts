import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1")
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10")

  const [total, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        role: true,
        approved: true,
        createdAt: true,
      },
    })
  ])

  return NextResponse.json({ users, total, page, limit })
}