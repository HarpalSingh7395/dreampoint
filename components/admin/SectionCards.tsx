"use client"
import { IconTrendingDown, IconTrendingUp, IconUsers, IconUserCheck, IconClock, IconStar } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react"

interface DashboardStats {
  activeTeachers: {
    count: number
    change: number
    trend: 'up' | 'down'
  }
  registeredStudents: {
    count: number
    change: number
    trend: 'up' | 'down'
  }
  pendingApprovals: {
    count: number
    change: number
    trend: 'up' | 'down'
  }
  avgHourlyRate: {
    amount: number
    change: number
    trend: 'up' | 'down'
  }
}

export default function SectionCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="@container/card animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </CardHeader>
            <CardFooter>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-600">Error loading dashboard: {error}</p>
      </div>
    )
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Teachers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.activeTeachers.count.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.activeTeachers.trend === 'up' ? <IconTrendingUp /> : <IconTrendingDown />}
              {stats.activeTeachers.change > 0 ? '+' : ''}{stats.activeTeachers.change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.activeTeachers.trend === 'up' ? 'Growing teacher base' : 'Teacher growth slowing'} <IconUserCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Approved and available for sessions
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Registered Students</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.registeredStudents.count.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.registeredStudents.trend === 'up' ? <IconTrendingUp /> : <IconTrendingDown />}
              {stats.registeredStudents.change > 0 ? '+' : ''}{stats.registeredStudents.change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.registeredStudents.trend === 'up' ? 'Steady student growth' : 'Student growth declining'} <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Active learners seeking tutors
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Approvals</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.pendingApprovals.count.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.pendingApprovals.trend === 'up' ? <IconTrendingUp /> : <IconTrendingDown />}
              {stats.pendingApprovals.change > 0 ? '+' : ''}{stats.pendingApprovals.change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.pendingApprovals.trend === 'down' ? 'Faster approval process' : 'Approval backlog growing'} <IconClock className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Teacher applications awaiting review
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Avg Hourly Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{stats.avgHourlyRate.amount.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.avgHourlyRate.trend === 'up' ? <IconTrendingUp /> : <IconTrendingDown />}
              {stats.avgHourlyRate.change > 0 ? '+' : ''}{stats.avgHourlyRate.change}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.avgHourlyRate.trend === 'up' ? 'Premium pricing trend' : 'Rate pressure declining'} <IconStar className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Quality tutors command higher rates
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}