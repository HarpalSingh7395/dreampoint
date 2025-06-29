import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.enrollment.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Student removed from course successfully'
    })
  } catch (error) {
    console.error('Error removing enrollment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove student from course' },
      { status: 500 }
    )
  }
}