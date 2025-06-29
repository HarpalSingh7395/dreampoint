"use client"
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
// Using basic table elements since @/components/ui/table might not be available
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    GraduationCap,
    Mail,
    Phone,
    MapPin,
    Edit,
    Trash2,
    Plus,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    AlertCircle,
    BookOpen,
    TrendingUp,
    User as UserIcon
} from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Attendance, Class, Course, CourseType, Enrollment, Schedule, User } from '@prisma/client'
import { useRouter } from 'next/navigation'

// Mock data - replace with actual API calls
const mockCourseData = {
    id: "course_123",
    title: "Advanced Mathematics for Grade 10",
    description: "Comprehensive mathematics course covering algebra, geometry, and trigonometry for grade 10 students. This course focuses on building strong foundational concepts while preparing students for higher-level mathematics.",
    type: "GROUP",
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-05-30T00:00:00Z",
    status: "active",
    teacher: {
        id: "teacher_456",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@school.edu",
        phoneNumber: "+91-9876543210",
        image: null,
        qualification: "PhD in Mathematics",
        experience: 8,
        hourlyRate: 1500
    },
    schedule: [
        {
            id: "schedule_1",
            dayOfWeek: "MONDAY",
            startTime: "10:00",
            endTime: "11:30"
        },
        {
            id: "schedule_2",
            dayOfWeek: "WEDNESDAY",
            startTime: "10:00",
            endTime: "11:30"
        },
        {
            id: "schedule_3",
            dayOfWeek: "FRIDAY",
            startTime: "10:00",
            endTime: "11:30"
        }
    ],
    enrollments: [
        {
            id: "enrollment_1",
            student: {
                id: "student_1",
                name: "Amit Kumar",
                email: "amit.kumar@email.com",
                phoneNumber: "+91-9876543201",
                currentGrade: "Grade 10",
                image: null
            }
        },
        {
            id: "enrollment_2",
            student: {
                id: "student_2",
                name: "Priya Sharma",
                email: "priya.sharma@email.com",
                phoneNumber: "+91-9876543202",
                currentGrade: "Grade 10",
                image: null
            }
        },
        {
            id: "enrollment_3",
            student: {
                id: "student_3",
                name: "Rahul Patel",
                email: "rahul.patel@email.com",
                phoneNumber: "+91-9876543203",
                currentGrade: "Grade 10",
                image: null
            }
        }
    ],
    classes: [
        {
            id: "class_1",
            date: "2024-02-05T10:00:00Z",
            startTime: "10:00",
            endTime: "11:30",
            status: "COMPLETED",
            attendances: [
                { studentId: "student_1", status: "PRESENT" },
                { studentId: "student_2", status: "PRESENT" },
                { studentId: "student_3", status: "ABSENT" }
            ]
        },
        {
            id: "class_2",
            date: "2024-02-07T10:00:00Z",
            startTime: "10:00",
            endTime: "11:30",
            status: "COMPLETED",
            attendances: [
                { studentId: "student_1", status: "PRESENT" },
                { studentId: "student_2", status: "LATE" },
                { studentId: "student_3", status: "PRESENT" }
            ]
        },
        {
            id: "class_3",
            date: "2024-02-12T10:00:00Z",
            startTime: "10:00",
            endTime: "11:30",
            status: "SCHEDULED"
        }
    ],
    stats: {
        totalClasses: 48,
        completedClasses: 12,
        scheduledClasses: 36,
        cancelledClasses: 0,
        progressPercentage: 25,
        totalStudents: 3,
        averageAttendance: 85
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active': return 'bg-green-100 text-green-800 border-green-200'
        case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200'
        default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

const getCourseTypeColor = (type: string) => {
    return type === 'GROUP'
        ? 'bg-purple-100 text-purple-800 border-purple-200'
        : 'bg-orange-100 text-orange-800 border-orange-200'
}

const getAttendanceColor = (status: string) => {
    switch (status) {
        case 'PRESENT': return 'text-green-600'
        case 'ABSENT': return 'text-red-600'
        case 'LATE': return 'text-yellow-600'
        case 'EXCUSED': return 'text-blue-600'
        default: return 'text-gray-600'
    }
}

const getAttendanceIcon = (status: string) => {
    switch (status) {
        case 'PRESENT': return <CheckCircle className="h-4 w-4" />
        case 'ABSENT': return <XCircle className="h-4 w-4" />
        case 'LATE': return <AlertCircle className="h-4 w-4" />
        case 'EXCUSED': return <CheckCircle className="h-4 w-4" />
        default: return <AlertCircle className="h-4 w-4" />
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}:00`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}

const getCourseStatus = (course: Course) => {
    const now = new Date()
    if (new Date(course.startDate) > now) return "upcoming"
    if (new Date(course.endDate) < now) return "completed"
    return "active"
}


type FullCourse = Course & {
  teacher: User
  schedule: Schedule[]
  enrollments: (Enrollment & { student: User })[]
  classes: (Class & { attendances: Attendance[] })[]
  stats: {
    totalClasses: number
    completedClasses: number
    scheduledClasses: number
    cancelledClasses: number
    totalStudents: number
    averageAttendance: number
    progressPercentage: number
  }
}

export default function ViewCoursePage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = params;
    const router = useRouter();
    const [courseData, setCourseData] = useState<FullCourse>()
    const [loading, setLoading] = useState(false)
    const [cancelReason, setCancelReason] = useState('')
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/admin/courses/${id}`)
                const data = await res.json()
                if (res.ok) {
                    setCourseData(data)
                } else {
                    console.error(data.error)
                }
            } catch (err) {
                console.error("Error fetching course:", err)
            } finally {
                setFetching(false)
            }
        }

        fetchCourse()
    }, [id])

    const handleDeleteCourse = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/courses/${courseData?.id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Failed to delete course")
            router.push("/admin/courses") // or wherever your courses list is
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCancelClass = async (classId: string) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/classes/${classId}/cancel`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: cancelReason })
            })

            if (!res.ok) throw new Error("Failed to cancel class")

            // Optionally refetch or update state
            const updated = await res.json()
            setCourseData((prev) => {
                if (!prev) return prev
                return {
                    ...prev,
                    classes: prev.classes.map(c => c.id === classId ? updated : c)
                }
            })

            setCancelReason('')
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (fetching || !courseData) {
        return <div className="p-8 text-center text-muted-foreground">Loading course details...</div>
    }

    const recentClasses = courseData?.classes?.filter(c => c.status === 'COMPLETED').slice(-5).reverse() || []
    const upcomingClasses = courseData?.classes?.filter(c => c.status === 'SCHEDULED').slice(0, 5) || []

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{courseData.title}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className={getCourseTypeColor(courseData.type)}>
                                {courseData.type}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(getCourseStatus(courseData))}>
                                {getCourseStatus(courseData).charAt(0).toUpperCase() + getCourseStatus(courseData).slice(1)}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Course
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete Course
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this course? This action cannot be undone.
                                    All associated classes, enrollments, and data will be permanently removed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteCourse} disabled={loading}>
                                    {loading ? 'Deleting...' : 'Delete Course'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Course Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courseData.stats.totalStudents}</div>
                        <p className="text-xs text-muted-foreground">Enrolled students</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courseData.stats.totalClasses}</div>
                        <p className="text-xs text-muted-foreground">
                            {courseData.stats.completedClasses} completed, {courseData.stats.scheduledClasses} scheduled
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Progress</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courseData.stats.progressPercentage}%</div>
                        <Progress value={courseData.stats.progressPercentage} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courseData.stats.averageAttendance}%</div>
                        <p className="text-xs text-muted-foreground">Average attendance</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                                <p className="mt-1">{courseData.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                                    <p className="mt-1 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(courseData.startDate?.toString())}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                                    <p className="mt-1 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(courseData.endDate?.toString())}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Schedule</Label>
                                <div className="mt-2 space-y-2">
                                    {courseData.schedule.map((schedule) => (
                                        <div key={schedule.id} className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4" />
                                            <span className="font-medium">
                                                {schedule.dayOfWeek.charAt(0) + schedule.dayOfWeek.slice(1).toLowerCase()}
                                            </span>
                                            <span>
                                                {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Classes */}
                    <CardContent>
                        {upcomingClasses.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingClasses.map((classItem) => (
                                    <div key={classItem.id} className="p-4 border rounded-lg flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="font-medium">{formatDate(classItem.date?.toString())}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                                            </p>
                                        </div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    Cancel
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Cancel Class</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to cancel this class? Please provide a reason.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <Textarea
                                                        placeholder="Reason for cancellation"
                                                        value={cancelReason}
                                                        onChange={(e) => setCancelReason(e.target.value)}
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" onClick={() => setCancelReason('')}>
                                                            Close
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleCancelClass(classItem.id)}
                                                            disabled={loading || !cancelReason.trim()}
                                                        >
                                                            {loading ? 'Cancelling...' : 'Confirm Cancel'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-8">
                                No upcoming classes scheduled
                            </p>
                        )}
                    </CardContent>
                    {/* Recent Classes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentClasses.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Attendance</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentClasses.map((classItem) => {
                                            const presentCount = classItem.attendances?.filter(a => a.status === 'PRESENT').length || 0
                                            const totalStudents = classItem.attendances?.length || 0
                                            return (
                                                <TableRow key={classItem.id}>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <p className="font-medium">{formatDate(classItem.date?.toString())}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm">
                                                                {presentCount}/{totalStudents}
                                                            </span>
                                                            <div className="flex gap-1">
                                                                {classItem.attendances?.map((attendance, idx) => (
                                                                    <span key={idx} className={getAttendanceColor(attendance.status)}>
                                                                        {getAttendanceIcon(attendance.status)}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="bg-green-100 text-green-800">
                                                            {classItem.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No completed classes yet</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Teacher Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Teacher
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={courseData.teacher.image || undefined} />
                                    <AvatarFallback>
                                        {courseData.teacher.name?.split(' ').map(n => n[0]).join('') || 'T'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{courseData.teacher.name}</p>
                                    <p className="text-sm text-muted-foreground">{courseData.teacher.qualification}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{courseData.teacher.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{courseData.teacher.phoneNumber}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{courseData.teacher.experience} years experience</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Rate:</span>
                                    <span>₹{courseData.teacher.hourlyRate}/hour</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Enrolled Students */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Students ({courseData.enrollments.length})
                            </CardTitle>
                            <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {courseData.enrollments.map((enrollment) => (
                                <div key={enrollment.id} className="flex items-center gap-3 p-2 rounded-lg border">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={enrollment.student.image || undefined} />
                                        <AvatarFallback className="text-xs">
                                            {enrollment.student.name?.split(' ').map(n => n[0]).join('') || 'S'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{enrollment.student.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {enrollment.student.currentGrade}
                                        </p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Remove from Course
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}