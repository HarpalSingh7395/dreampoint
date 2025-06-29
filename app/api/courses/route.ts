import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/courses - List all courses with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get('teacherId')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const where: any = {}
    
    if (teacherId) where.teacherId = teacherId
    if (type) where.type = type
    if (status) where.status = status

    const courses = await prisma.course.findMany({
      where,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            specialization: true,
            experience: true
          }
        },
        enrollments: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                currentGrade: true
              }
            }
          }
        },
        schedule: true,
        classes: {
          where: {
            date: {
              gte: new Date()
            }
          },
          orderBy: {
            date: 'asc'
          },
          take: 5
        },
        _count: {
          select: {
            enrollments: true,
            classes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: courses
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      type, 
      startDate, 
      endDate, 
      teacherId,
      schedule 
    } = body

    // Validate required fields
    if (!title || !type || !startDate || !endDate || !teacherId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify teacher exists and has TEACHER role
    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: 'TEACHER',
        profileStatus: 'APPROVED'
      }
    })

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher or teacher not approved' },
        { status: 400 }
      )
    }

    // Create course with schedule
    const course = await prisma.course.create({
      data: {
        title,
        description,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        teacherId,
        schedule: {
          create: schedule?.map((s: any) => ({
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime
          })) || []
        }
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        schedule: true
      }
    })

    return NextResponse.json({
      success: true,
      data: course
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    )
  }
}