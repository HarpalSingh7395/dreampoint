import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
  }

  await prisma.user.update({
    where: { id },
    data: { profileStatus: "APPROVED" },
  })

  return NextResponse.json({ message: "User approved" })
}
