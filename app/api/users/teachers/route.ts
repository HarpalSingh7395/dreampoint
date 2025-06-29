import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const specialization = searchParams.get('specialization')
    const subjects = searchParams.get('subjects')

    const where: any = {
      role: 'TEACHER',
      profileStatus: 'APPROVED'
    }

    if (specialization) {
      where.specialization = {
        contains: specialization,
        mode: 'insensitive'
      }
    }

    if (subjects) {
      where.subjects = {
        contains: subjects,
        mode: 'insensitive'
      }
    }

    const teachers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        specialization: true,
        experience: true,
        hourlyRate: true,
        subjects: true,
        teachingGrades: true,
        bio: true,
        city: true,
        state: true,
        coursesTeaching: {
          include: {
            enrollments: {
              select: {
                id: true
              }
            }
          }
        },
        feedbackReceived: {
          select: {
            rating: true
          }
        },
        _count: {
          select: {
            coursesTeaching: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate average rating for each teacher
    const teachersWithRating = teachers.map(teacher => {
      const ratings = teacher.feedbackReceived.map(f => f.rating)
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0

      return {
        ...teacher,
        avgRating: Math.round(avgRating * 10) / 10,
        totalStudents: teacher.coursesTeaching.reduce(
          (sum, course) => sum + course.enrollments.length, 0
        )
      }
    })

    return NextResponse.json({
      success: true,
      data: teachersWithRating
    })
  } catch (error) {
    console.error('Error fetching teachers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teachers' },
      { status: 500 }
    )
  }
}