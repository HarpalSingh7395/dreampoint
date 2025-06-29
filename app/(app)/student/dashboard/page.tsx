'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, BookOpen, User, CreditCard, Bell } from 'lucide-react'

// Mock data based on schema
const studentData = {
  id: "student_123",
  name: "John Doe",
  email: "john.doe@example.com",
  image: null,
  currentGrade: "10th Grade",
  profileStatus: "APPROVED",
  city: "Mumbai",
  state: "Maharashtra"
}

const enrollments = [
  {
    id: "enroll_1",
    course: {
      id: "course_1",
      title: "Advanced Mathematics",
      description: "Calculus and Algebra",
      type: "PERSONAL",
      teacher: { name: "Dr. Smith", image: null },
      startDate: "2024-01-15",
      endDate: "2024-06-15"
    }
  },
  {
    id: "enroll_2",
    course: {
      id: "course_2", 
      title: "Physics Fundamentals",
      description: "Mechanics and Thermodynamics",
      type: "GROUP",
      teacher: { name: "Prof. Johnson", image: null },
      startDate: "2024-02-01",
      endDate: "2024-07-01"
    }
  }
]

const upcomingClasses = [
  {
    id: "class_1",
    course: { title: "Advanced Mathematics" },
    date: "2024-07-01",
    startTime: "10:00",
    endTime: "11:00",
    status: "SCHEDULED",
    teacher: { name: "Dr. Smith" }
  },
  {
    id: "class_2",
    course: { title: "Physics Fundamentals" },
    date: "2024-07-02", 
    startTime: "14:00",
    endTime: "15:30",
    status: "SCHEDULED",
    teacher: { name: "Prof. Johnson" }
  }
]

const attendanceData = [
  {
    course: "Advanced Mathematics", 
    present: 15,
    total: 18,
    percentage: 83
  },
  {
    course: "Physics Fundamentals",
    present: 12, 
    total: 15,
    percentage: 80
  }
]

const payments = [
  {
    id: "pay_1",
    class: { course: { title: "Advanced Mathematics" }, date: "2024-06-25" },
    amount: 50000, // in paisa = ₹500
    status: "PAID",
    paidAt: "2024-06-25T10:30:00Z"
  },
  {
    id: "pay_2", 
    class: { course: { title: "Physics Fundamentals" }, date: "2024-06-28" },
    amount: 75000, // in paisa = ₹750
    status: "PENDING"
  }
]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (amountInPaisa: number) => {
    return `₹${(amountInPaisa / 100).toFixed(2)}`
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'APPROVED': return 'bg-green-500'
      case 'PENDING_APPROVAL': return 'bg-yellow-500' 
      case 'REJECTED': return 'bg-red-500'
      case 'PAID': return 'bg-green-500'
      case 'PENDING': return 'bg-yellow-500'
      case 'FAILED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={studentData.image || undefined} />
                <AvatarFallback className="text-xl font-semibold">
                  {studentData.name?.charAt(0) || 'S'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
                <p className="text-gray-600">{studentData.currentGrade} • {studentData.city}, {studentData.state}</p>
                <Badge className={`mt-2 ${getStatusColor(studentData.profileStatus)}`}>
                  {studentData.profileStatus.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrollments.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classes This Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingClasses.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {payments.filter(p => p.status === 'PENDING').length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your next scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cls.course.title}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(cls.date).toLocaleDateString()} • {cls.startTime} - {cls.endTime}
                          </p>
                          <p className="text-sm text-gray-500">with {cls.teacher.name}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{cls.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{enrollment.course.title}</CardTitle>
                      <Badge variant={enrollment.course.type === 'PERSONAL' ? 'default' : 'secondary'}>
                        {enrollment.course.type}
                      </Badge>
                    </div>
                    <CardDescription>{enrollment.course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{enrollment.course.teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{enrollment.course.teacher.name}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Start: {new Date(enrollment.course.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(enrollment.course.endDate).toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full" variant="outline">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>Your upcoming classes for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">
                            {new Date(cls.date).getDate()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(cls.date).toLocaleDateString('en', { month: 'short' })}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{cls.course.title}</h4>
                          <p className="text-sm text-gray-600">{cls.startTime} - {cls.endTime}</p>
                          <p className="text-sm text-gray-500">Teacher: {cls.teacher.name}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Join Class</Button>
                        <Button variant="ghost" size="sm">Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attendanceData.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{course.course}</CardTitle>
                    <CardDescription>Attendance Summary</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Present: {course.present}/{course.total} classes</span>
                      <span className={`font-semibold ${course.percentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                        {course.percentage}%
                      </span>
                    </div>
                    <Progress value={course.percentage} className="w-full" />
                    {course.percentage < 75 && (
                      <p className="text-sm text-red-600">
                        ⚠️ Attendance below 75% requirement
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your class payments and pending dues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{payment.class.course.title}</h4>
                          <p className="text-sm text-gray-600">
                            Class Date: {new Date(payment.class.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Amount: {formatCurrency(payment.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        {payment.paidAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Paid: {new Date(payment.paidAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}