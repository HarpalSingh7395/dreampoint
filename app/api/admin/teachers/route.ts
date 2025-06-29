import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)
  const status = searchParams.get("status")
  const deleted = searchParams.get("deleted")

  const where: any = {
    role: Role.TEACHER,
  }

  if (status && status !== "all") {
    where.profileStatus = status
  }

  if (deleted === "deleted") {
    where.deletedAt = { not: null }
  } else if (deleted === "active") {
    where.deletedAt = null
  }

  const [teachers, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ])

  return NextResponse.json({ teachers, total })
}
