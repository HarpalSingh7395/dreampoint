import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import { addDays, isBefore } from "date-fns"
import { Class, CourseType, Prisma } from "@prisma/client"

const weekdayToNumber: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

function isValidTimeString(str: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(str)
}

// GET /api/courses - List all courses with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get('teacherId')
    const type = searchParams.get('type')
    // const status = searchParams.get('status')

    const where: Prisma.CourseWhereInput = {}
    
    if (teacherId) where.teacherId = teacherId
    if (type) where.type = type as CourseType
    // if (status) where.status = status

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
      substituteTeacherId,
      fee,
      capacity,
      schedule,
      studentIds = []
    } = body

    if (!title || !type || !startDate || !endDate || !teacherId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    for (const s of schedule ?? []) {
      if (!weekdayToNumber[s.dayOfWeek]) {
        return NextResponse.json({ success: false, error: `Invalid day: ${s.dayOfWeek}` }, { status: 400 })
      }
      if (!isValidTimeString(s.startTime) || !isValidTimeString(s.endTime)) {
        return NextResponse.json({ success: false, error: `Invalid time for ${s.dayOfWeek}` }, { status: 400 })
      }
    }

    // Validate teacher
    const teacher = await prisma.user.findFirst({
      where: {
        id: teacherId,
        role: "TEACHER",
        profileStatus: "APPROVED"
      }
    })

    if (!teacher) {
      return NextResponse.json({ success: false, error: "Invalid teacher" }, { status: 400 })
    }

    // Validate substitute if provided
    if (substituteTeacherId) {
      const sub = await prisma.user.findFirst({
        where: {
          id: substituteTeacherId,
          role: "TEACHER",
          profileStatus: "APPROVED"
        }
      })

      if (!sub) {
        return NextResponse.json({ success: false, error: "Invalid substitute teacher" }, { status: 400 })
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const course = await tx.course.create({
        data: {
          title,
          description,
          type,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          teacherId,
          fee: fee ? parseFloat(fee) : undefined,
          capacity,
          schedule: {
            create: schedule?.map((s: {
              dayOfWeek: string
              startTime: string
              endTime: string
            }) => ({
              dayOfWeek: s.dayOfWeek,
              startTime: s.startTime,
              endTime: s.endTime
            })) ?? []
          }
        },
        include: {
          schedule: true
        }
      })

      const classData: Omit<Class, 'id'>[] = []
      const start = new Date(startDate)
      const end = new Date(endDate)

      for (let d = new Date(start); isBefore(d, addDays(end, 1)); d = addDays(d, 1)) {
        const currentDay = d.getDay()

        for (const sched of course.schedule) {
          if (weekdayToNumber[sched.dayOfWeek] === currentDay) {

            // Prevent overlapping for this teacher
            const overlap = await tx.class.findFirst({
              where: {
                teacherId: teacherId,
                date: d,
                AND: [
                  { startTime: { lt: sched.endTime } },
                  { endTime: { gt: sched.startTime } }
                ]
              }
            })

            if (!overlap) {
              classData.push({
                date: d,
                startTime: sched.startTime,
                endTime: sched.endTime,
                courseId: course.id,
                teacherId: teacherId,
                status: "SCHEDULED",
                replacementFor: null,
                cancellationReason: null
              })
            }
          }
        }
      }

      if (classData.length > 0) {
        await tx.class.createMany({ data: classData })
      }

      // Enroll students if present
      if (studentIds.length > 0) {
        await tx.enrollment.createMany({
          data: studentIds.map((studentId: string) => ({
            studentId,
            courseId: course.id
          })),
          skipDuplicates: true
        })
      }

      return {
        course,
        generatedClasses: classData.length,
        enrolledStudents: studentIds.length
      }
    })

    return NextResponse.json({
      success: true,
      data: result.course,
      generatedClasses: result.generatedClasses,
      enrolledStudents: result.enrolledStudents
    }, { status: 201 })

  } catch (error) {
    console.error("Course creation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 }
    )
  }
}
