import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import { Prisma, ProfileStatus, Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)
  const status = searchParams.get("status")
  const deleted = searchParams.get("deleted")

  // ✅ Use correct type for user model
  const where: Prisma.UserWhereInput = {
    role: Role.STUDENT,
  }

  if (status && status !== "all") {
    where.profileStatus = status as ProfileStatus // ideally use enum if available
  }

  if (deleted === "deleted") {
    where.deletedAt = { not: null }
  } else if (deleted === "active") {
    where.deletedAt = null
  }

  const [students, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ])

  return NextResponse.json({ students, total })
}
