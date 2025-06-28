import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Get current date for comparison
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

    // Active Teachers (Approved and not deleted)
    const activeTeachers = await prisma.user.count({
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        deletedAt: null,
      },
    })

    const activeTeachersLastMonth = await prisma.user.count({
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        deletedAt: null,
        createdAt: {
          lte: lastMonth,
        },
      },
    })

    // Registered Students
    const registeredStudents = await prisma.user.count({
      where: {
        role: 'STUDENT',
        deletedAt: null,
      },
    })

    const registeredStudentsLastMonth = await prisma.user.count({
      where: {
        role: 'STUDENT',
        deletedAt: null,
        createdAt: {
          lte: lastMonth,
        },
      },
    })

    // Pending Approvals
    const pendingApprovals = await prisma.user.count({
      where: {
        role: 'TEACHER',
        profileStatus: 'PENDING_APPROVAL',
        deletedAt: null,
      },
    })

    const pendingApprovalsLastMonth = await prisma.user.count({
      where: {
        role: 'TEACHER',
        profileStatus: 'PENDING_APPROVAL',
        deletedAt: null,
        createdAt: {
          lte: lastMonth,
        },
      },
    })

    // Average Hourly Rate
    const avgHourlyRateResult = await prisma.user.aggregate({
      _avg: {
        hourlyRate: true,
      },
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        hourlyRate: {
          not: null,
        },
        deletedAt: null,
      },
    })

    const avgHourlyRateLastMonth = await prisma.user.aggregate({
      _avg: {
        hourlyRate: true,
      },
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        hourlyRate: {
          not: null,
        },
        deletedAt: null,
        createdAt: {
          lte: lastMonth,
        },
      },
    })

    // Calculate percentage changes
    const teacherChange = activeTeachersLastMonth > 0 
      ? ((activeTeachers - activeTeachersLastMonth) / activeTeachersLastMonth) * 100 
      : 0

    const studentChange = registeredStudentsLastMonth > 0 
      ? ((registeredStudents - registeredStudentsLastMonth) / registeredStudentsLastMonth) * 100 
      : 0

    const approvalChange = pendingApprovalsLastMonth > 0 
      ? ((pendingApprovals - pendingApprovalsLastMonth) / pendingApprovalsLastMonth) * 100 
      : 0

    const rateChange = avgHourlyRateLastMonth._avg.hourlyRate 
      ? ((avgHourlyRateResult._avg.hourlyRate || 0) - avgHourlyRateLastMonth._avg.hourlyRate) / avgHourlyRateLastMonth._avg.hourlyRate * 100 
      : 0

    const stats = {
      activeTeachers: {
        count: activeTeachers,
        change: Math.round(teacherChange * 100) / 100,
        trend: teacherChange >= 0 ? 'up' : 'down',
      },
      registeredStudents: {
        count: registeredStudents,
        change: Math.round(studentChange * 100) / 100,
        trend: studentChange >= 0 ? 'up' : 'down',
      },
      pendingApprovals: {
        count: pendingApprovals,
        change: Math.round(approvalChange * 100) / 100,
        trend: approvalChange >= 0 ? 'up' : 'down',
      },
      avgHourlyRate: {
        amount: Math.round(avgHourlyRateResult._avg.hourlyRate || 0),
        change: Math.round(rateChange * 100) / 100,
        trend: rateChange >= 0 ? 'up' : 'down',
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}