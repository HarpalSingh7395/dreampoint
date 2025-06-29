import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const course = await prisma.course.findUnique({
            where: { id },
            include: {
                teacher: true,
                schedule: true,
                enrollments: {
                    include: { student: true }
                },
                classes: {
                    include: {
                        attendances: true,
                        teacher: true
                    },
                    orderBy: { date: "desc" }
                }
            }
        })

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }

        // Compute stats
        const totalClasses = course.classes.length
        const completedClasses = course.classes.filter(c => c.status === "COMPLETED").length
        const scheduledClasses = course.classes.filter(c => c.status === "SCHEDULED").length
        const cancelledClasses = course.classes.filter(c => c.status === "CANCELLED").length

        const totalStudents = course.enrollments.length
        const totalAttendances = course.classes.flatMap(c => c.attendances || [])
        const presentCount = totalAttendances.filter(a => a.status === "PRESENT").length

        const averageAttendance =
            totalStudents > 0 && totalClasses > 0
                ? Math.round((presentCount / (totalClasses * totalStudents)) * 100)
                : 0

        const progressPercentage =
            totalClasses === 0
                ? 0
                : Math.round((completedClasses / totalClasses) * 100)

        const stats = {
            totalClasses,
            completedClasses,
            scheduledClasses,
            cancelledClasses,
            totalStudents,
            averageAttendance,
            progressPercentage
        }

        // Attach stats to course object
        return NextResponse.json({
            ...course,
            stats
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
