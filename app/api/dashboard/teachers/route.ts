export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, ProfileStatus } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') // 'APPROVED', 'PENDING_APPROVAL', etc.
    const offset = (page - 1) * limit

    const where = {
      role: 'TEACHER' as const,
      deletedAt: null,
      ...(status && { profileStatus: status as ProfileStatus }),
    }

    const [teachers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          profileStatus: true,
          hourlyRate: true,
          subjects: true,
          teachingGrades: true,
          experience: true,
          qualification: true,
          city: true,
          state: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      teachers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Teachers fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    )
  }
}