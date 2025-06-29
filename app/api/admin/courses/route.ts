import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import * as yup from "yup"

const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/

const scheduleSchema = yup
  .object({
    dayOfWeek: yup
      .mixed<"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY">()
      .oneOf([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ])
      .required(),
    start: yup.string().matches(timeRegex, "Invalid start time").required(),
    end: yup.string().matches(timeRegex, "Invalid end time").required(),
  })
  .test("time-logic", "End time must be after start time", (value) => {
    if (!value?.start || !value?.end) return true
    const s = new Date(`2000-01-01T${value.start}:00`)
    const e = new Date(`2000-01-01T${value.end}:00`)
    return s < e
  })

const courseSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  type: yup.mixed<"PERSONAL" | "GROUP">().oneOf(["PERSONAL", "GROUP"]).required(),
  teacherId: yup.string().required("Teacher ID is required"),
  startDate: yup.date().typeError("Invalid start date").required("Start date is required"),
  endDate: yup
    .date()
    .typeError("Invalid end date")
    .required("End date is required")
    .when("startDate", (startDate: Date, schema: any) => schema.min(startDate, "End date must be after start date")),
  schedule: yup.array().of(scheduleSchema).min(1, "At least one schedule entry is required"),
  studentIds: yup.array().of(yup.string()).when("type", {
    is: "GROUP",
    then: (schema) => schema.min(1, "At least one student is required for group courses"),
    otherwise: (schema) => schema.optional(),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = await courseSchema.validate(body, { abortEarly: false })
    const { title, description, type, teacherId, startDate, endDate, schedule, studentIds } = validated

    const course = await prisma.course.create({
      data: {
        title,
        description,
        type,
        teacherId,
        startDate,
        endDate,
        schedule: {
          create: schedule.map((s) => ({
            dayOfWeek: s.dayOfWeek,
            startTime: s.start,
            endTime: s.end,
          })),
        },
        enrollments: {
          create: studentIds?.map((id) => ({ student: { connect: { id } } })) || [],
        },
      },
      include: {
        teacher: true,
        schedule: true,
        enrollments: {
          include: { student: true },
        },
      },
    })

    return NextResponse.json({ success: true, data: course })
  } catch (err: any) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.reduce((acc: Record<string, string>, e) => {
        acc[e.path ?? "form"] = e.message
        return acc
      }, {})
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    console.error("Error creating course:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
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
    const where: any = {}
    
    if (type && type !== "all") {
      where.type = type
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