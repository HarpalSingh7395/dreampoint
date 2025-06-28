import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Soft delete failed:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
