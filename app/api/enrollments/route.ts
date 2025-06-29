import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, courseId } = body

    if (!studentId || !courseId) {
      return NextResponse.json(
        { success: false, error: 'Student ID and Course ID are required' },
        { status: 400 }
      )
    }

    // Verify student exists and has STUDENT role
    const student = await prisma.user.findFirst({
      where: {
        id: studentId,
        role: 'STUDENT',
        profileStatus: 'APPROVED'
      }
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Invalid student or student not approved' },
        { status: 400 }
      )
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enrollments: true
      }
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    // Check if student is already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId
      }
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'Student is already enrolled in this course' },
        { status: 400 }
      )
    }

    // For PERSONAL courses, check if already has a student
    if (course.type === 'PERSONAL' && course.enrollments.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Personal course already has a student enrolled' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            currentGrade: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            type: true,
            teacher: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: enrollment
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to enroll student' },
      { status: 500 }
    )
  }
}

// GET /api/enrollments - List enrollments with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const courseId = searchParams.get('courseId')

    const where: any = {}
    if (studentId) where.studentId = studentId
    if (courseId) where.courseId = courseId

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            currentGrade: true,
            phoneNumber: true
          }
        },
        course: {
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
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: enrollments
    })
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}