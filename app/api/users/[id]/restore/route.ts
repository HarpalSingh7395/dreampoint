import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.user.update({
      where: { id },
      data: { deletedAt: null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Restore user failed:", error)
    return NextResponse.json({ error: "Failed to restore user" }, { status: 500 })
  }
}
