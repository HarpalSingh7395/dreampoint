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
      if (weekdayToNumber[s.dayOfWeek]  === undefined) {
        return NextResponse.json(
          { success: false, error: `Invalid day: ${s.dayOfWeek}` },
          { status: 400 }
        )
      }
      if (!isValidTimeString(s.start) || !isValidTimeString(s.end)) {
        return NextResponse.json(
          { success: false, error: `Invalid time for ${s.dayOfWeek}` },
          { status: 400 }
        )
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
      return NextResponse.json(
        { success: false, error: "Invalid teacher" },
        { status: 400 }
      )
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
        return NextResponse.json(
          { success: false, error: "Invalid substitute teacher" },
          { status: 400 }
        )
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
          capacity: capacity ? parseInt(capacity, 10) : undefined,
          schedule: {
            create: schedule?.map((s: {
              dayOfWeek: string,
              start: string,
              end: string
            }) => ({
              dayOfWeek: s.dayOfWeek,
              startTime: s.start,
              endTime: s.end
            })) ?? []
          }
        },
        include: {
          schedule: true
        }
      })

      const classData: Omit<Class, "id">[] = []
      const start = new Date(startDate)
      const end = new Date(endDate)

      for (let d = new Date(start); isBefore(d, addDays(end, 1)); d = addDays(d, 1)) {
        const currentDay = d.getDay()

        for (const sched of course.schedule) {
          if (weekdayToNumber[sched.dayOfWeek] === currentDay) {
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

      if (classData.length > 0) {
        await tx.class.createMany({ data: classData })
      }

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

    return NextResponse.json(
      {
        success: true,
        data: result.course,
        generatedClasses: result.generatedClasses,
        enrolledStudents: result.enrolledStudents
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Course creation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)
  const type = searchParams.get("type")
  const teacherId = searchParams.get("teacherId")
  const status = searchParams.get("status") // active, upcoming, completed, cancelled

  try {
    // Build where clause based on filters
    const where: Prisma.CourseWhereInput = {}

    if (type && type !== "all") {
      where.type = type as CourseType
    }

    if (teacherId && teacherId !== "all") {
      where.teacherId = teacherId
    }

    // Filter by course status based on dates
    const now = new Date()
    if (status && status !== "all") {
      switch (status) {
        case "upcoming":
          where.startDate = { gt: now }
          break
        case "active":
          where.AND = [
            { startDate: { lte: now } },
            { endDate: { gte: now } }
          ]
          break
        case "completed":
          where.endDate = { lt: now }
          break
      }
    }

    const [courses, total] = await prisma.$transaction([
      prisma.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          teacher: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
            },
          },
          schedule: true,
          enrollments: {
            include: {
              student: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phoneNumber: true,
                },
              },
            },
          },
          classes: {
            select: {
              id: true,
              status: true,
              date: true,
            },
          },
          _count: {
            select: {
              enrollments: true,
              classes: true,
            },
          },
        },
      }),
      prisma.course.count({ where }),
    ])

    // Calculate additional stats for each course
    const coursesWithStats = courses.map(course => {
      const now = new Date()
      const isActive = course.startDate <= now && course.endDate >= now
      const isUpcoming = course.startDate > now
      const isCompleted = course.endDate < now

      let status = 'completed'
      if (isUpcoming) status = 'upcoming'
      else if (isActive) status = 'active'

      const completedClasses = course.classes.filter(c => c.status === 'COMPLETED').length
      const totalClasses = course.classes.length
      const scheduledClasses = course.classes.filter(c => c.status === 'SCHEDULED').length
      const cancelledClasses = course.classes.filter(c => c.status === 'CANCELLED').length

      return {
        ...course,
        status,
        isActive,
        isUpcoming,
        isCompleted,
        studentCount: course._count.enrollments,
        totalClasses: course._count.classes,
        completedClasses,
        scheduledClasses,
        cancelledClasses,
        progressPercentage: totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0,
        scheduleDisplay: course.schedule.map(s =>
          `${s.dayOfWeek.charAt(0) + s.dayOfWeek.slice(1).toLowerCase()} ${s.startTime}-${s.endTime}`
        ).join(', '),
      }
    })

    return NextResponse.json({
      success: true,
      data: coursesWithStats,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      }
    })
  } catch (error) {
    console.error("Error listing courses:", error)
    return NextResponse.json({ success: false, error: "Failed to list courses" }, { status: 500 })
  }
}