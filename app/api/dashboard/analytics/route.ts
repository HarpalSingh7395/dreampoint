import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Subject distribution
    const subjectData = await prisma.user.findMany({
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        subjects: { not: null },
        deletedAt: null,
      },
      select: { subjects: true },
    })

    // Grade distribution
    const gradeData = await prisma.user.findMany({
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        teachingGrades: { not: null },
        deletedAt: null,
      },
      select: { teachingGrades: true },
    })

    // Geographic distribution
    const locationData = await prisma.user.groupBy({
      by: ['city', 'state'],
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        city: { not: null },
        state: { not: null },
        deletedAt: null,
      },
      _count: {
        id: true,
      },
    })

    // Experience distribution
    const experienceData = await prisma.user.groupBy({
      by: ['experience'],
      where: {
        role: 'TEACHER',
        profileStatus: 'APPROVED',
        experience: { not: null },
        deletedAt: null,
      },
      _count: {
        id: true,
      },
      orderBy: {
        experience: 'asc',
      },
    })

    return NextResponse.json({
      subjects: subjectData,
      grades: gradeData,
      locations: locationData,
      experience: experienceData,
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}