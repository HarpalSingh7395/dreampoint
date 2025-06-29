'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, BookOpen, Users, Star, DollarSign, FileText, Bell, Plus, Settings } from 'lucide-react'

// Mock data based on schema
const teacherData = {
  id: "teacher_123",
  name: "Dr. Sarah Smith",
  email: "sarah.smith@example.com",
  image: null,
  profileStatus: "APPROVED",
  experience: 8,
  hourlyRate: 150000, // in paisa = ₹1500
  specialization: "Mathematics & Physics",
  subjects: "Mathematics,Physics,Chemistry",
  teachingGrades: "9th,10th,11th,12th",
  city: "Delhi",
  state: "Delhi",
  bio: "Experienced educator with 8+ years in STEM subjects"
}

const courses = [
  {
    id: "course_1",
    title: "Advanced Mathematics",
    description: "Calculus and Algebra for Grade 11-12",
    type: "PERSONAL",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    enrollments: [
      { student: { name: "John Doe", image: null, currentGrade: "11th" } },
      { student: { name: "Jane Smith", image: null, currentGrade: "12th" } }
    ]
  },
  {
    id: "course_2", 
    title: "Physics Fundamentals",
    description: "Mechanics and Thermodynamics",
    type: "GROUP",
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    enrollments: [
      { student: { name: "Mike Johnson", image: null, currentGrade: "10th" } },
      { student: { name: "Emma Wilson", image: null, currentGrade: "10th" } },
      { student: { name: "Alex Brown", image: null, currentGrade: "11th" } }
    ]
  }
]

const todayClasses = [
  {
    id: "class_1",
    course: { title: "Advanced Mathematics", type: "PERSONAL" },
    date: "2024-07-01",
    startTime: "10:00",
    endTime: "11:00",
    status: "SCHEDULED",
    enrollments: [{ student: { name: "John Doe" } }]
  },
  {
    id: "class_2",
    course: { title: "Physics Fundamentals", type: "GROUP" },
    date: "2024-07-01", 
    startTime: "14:00",
    endTime: "15:30",
    status: "SCHEDULED",
    enrollments: [
      { student: { name: "Mike Johnson" } },
      { student: { name: "Emma Wilson" } }
    ]
  }
]

const recentFeedback = [
  {
    id: "feedback_1",
    author: { name: "John Doe" },
    rating: 5,
    comment: "Excellent teaching method! Very clear explanations.",
    createdAt: "2024-06-25T10:30:00Z"
  },
  {
    id: "feedback_2",
    author: { name: "Jane Smith" },
    rating: 4,
    comment: "Great teacher, helped me understand complex concepts.",
    createdAt: "2024-06-20T15:45:00Z"
  }
]

const earnings = {
  thisMonth: 4500000, // in paisa = ₹45,000
  lastMonth: 3800000, // in paisa = ₹38,000
  totalClasses: 28,
  avgRating: 4.8
}

const rescheduleRequests = [
  {
    id: "reschedule_1",
    class: { 
      course: { title: "Advanced Mathematics" },
      date: "2024-07-03",
      startTime: "10:00"
    },
    user: { name: "John Doe" },
    newDate: "2024-07-04",
    newStartTime: "11:00",
    reason: "Medical appointment conflict",
    status: "PENDING"
  }
]

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (amountInPaisa: number) => {
    return `₹${(amountInPaisa / 100).toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'APPROVED': return 'bg-green-500'
      case 'PENDING_APPROVAL': return 'bg-yellow-500' 
      case 'REJECTED': return 'bg-red-500'
      case 'SCHEDULED': return 'bg-blue-500'
      case 'COMPLETED': return 'bg-green-500'
      case 'CANCELLED': return 'bg-red-500'
      case 'PENDING': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const totalStudents = courses.reduce((acc, course) => acc + course.enrollments.length, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacherData.image || undefined} />
                <AvatarFallback className="text-xl font-semibold">
                  {teacherData.name?.split(' ').map(n => n.charAt(0)).join('') || 'T'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {teacherData.name}!</h1>
                <p className="text-gray-600">{teacherData.specialization} • {teacherData.experience} years experience</p>
                <p className="text-sm text-gray-500">{formatCurrency(teacherData.hourlyRate)}/hour • {teacherData.city}, {teacherData.state}</p>
                <Badge className={`mt-2 ${getStatusColor(teacherData.profileStatus)}`}>
                  {teacherData.profileStatus.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="schedule">{`Today's Schedule`}</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
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
                  <div className="text-2xl font-bold">{courses.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayClasses.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {earnings.avgRating}
                    <Star className="h-4 w-4 text-yellow-500 ml-1 fill-current" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>{`Today's Schedule`}</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cls.course.title}</h4>
                          <p className="text-sm text-gray-600">
                            {cls.startTime} - {cls.endTime}
                          </p>
                          <p className="text-sm text-gray-500">
                            {cls.enrollments.length} student{cls.enrollments.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(cls.status)}>
                          {cls.status}
                        </Badge>
                        <Button variant="outline" size="sm">Start Class</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Reschedule Requests */}
            {rescheduleRequests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Reschedule Requests</CardTitle>
                  <CardDescription>Pending requests from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rescheduleRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                        <div>
                          <h4 className="font-semibold">{request.class.course.title}</h4>
                          <p className="text-sm text-gray-600">
                            From: {new Date(request.class.date).toLocaleDateString()} at {request.class.startTime}
                          </p>
                          <p className="text-sm text-gray-600">
                            To: {new Date(request.newDate).toLocaleDateString()} at {request.newStartTime}
                          </p>
                          <p className="text-sm text-gray-500">Requested by: {request.user.name}</p>
                          <p className="text-sm text-gray-500">Reason: {request.reason}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Decline</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{course.title}</CardTitle>
                      <Badge variant={course.type === 'PERSONAL' ? 'default' : 'secondary'}>
                        {course.type}
                      </Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Students Enrolled</span>
                      <span className="font-semibold">{course.enrollments.length}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Start: {new Date(course.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(course.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1" variant="outline">Manage</Button>
                      <Button className="flex-1">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{`Today's Classes`}</CardTitle>
                <CardDescription>Your scheduled classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {cls.startTime}
                          </div>
                          <div className="text-xs text-gray-500">
                            {cls.endTime}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{cls.course.title}</h4>
                          <p className="text-sm text-gray-600">
                            {cls.course.type} • {cls.enrollments.length} student{cls.enrollments.length !== 1 ? 's' : ''}
                          </p>
                          <div className="flex space-x-1 mt-1">
                            {cls.enrollments.slice(0, 3).map((enrollment, idx) => (
                              <Avatar key={idx} className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {enrollment.student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {cls.enrollments.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                +{cls.enrollments.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                        <Button size="sm">Start Class</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.enrollments.length} enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {course.enrollments.map((enrollment, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={enrollment.student.image || undefined} />
                          <AvatarFallback>
                            {enrollment.student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{enrollment.student.name}</h4>
                          <p className="text-sm text-gray-600">{enrollment.student.currentGrade}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(earnings.thisMonth)}</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Month</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(earnings.lastMonth)}</div>
                  <p className="text-xs text-muted-foreground">
                    {earnings.totalClasses} classes completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hourly Rate</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(teacherData.hourlyRate)}</div>
                  <p className="text-xs text-muted-foreground">
                    Per hour rate
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Monthly earnings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>June 2024</span>
                    <span className="font-semibold">{formatCurrency(earnings.thisMonth)}</span>
                  </div>
                  <Progress value={85} className="w-full" />
                  
                  <div className="flex items-center justify-between">
                    <span>May 2024</span>
                    <span className="font-semibold">{formatCurrency(earnings.lastMonth)}</span>
                  </div>
                  <Progress value={72} className="w-full" />
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Classes:</span>
                        <span className="font-semibold ml-2">{earnings.totalClasses}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Average Rating:</span>
                        <span className="font-semibold ml-2">{earnings.avgRating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {earnings.avgRating}
                    <Star className="h-4 w-4 text-yellow-500 ml-1 fill-current" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentFeedback.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {recentFeedback.filter(f => f.rating === 5).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>What your students are saying</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {feedback.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{feedback.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{feedback.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>
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