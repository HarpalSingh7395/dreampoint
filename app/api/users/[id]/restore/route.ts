import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.update({
      where: { id: params.id },
      data: { deletedAt: null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Restore user failed:", error)
    return NextResponse.json({ error: "Failed to restore user" }, { status: 500 })
  }
}
