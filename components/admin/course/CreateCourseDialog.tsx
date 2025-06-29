"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, Users, User, BookOpen, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Weekday = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"

const weekdays: { key: Weekday; label: string; short: string }[] = [
    { key: "MONDAY", label: "Monday", short: "Mon" },
    { key: "TUESDAY", label: "Tuesday", short: "Tue" },
    { key: "WEDNESDAY", label: "Wednesday", short: "Wed" },
    { key: "THURSDAY", label: "Thursday", short: "Thu" },
    { key: "FRIDAY", label: "Friday", short: "Fri" },
    { key: "SATURDAY", label: "Saturday", short: "Sat" },
    { key: "SUNDAY", label: "Sunday", short: "Sun" },
]

export default function CreateCourseDialog({ onSuccess }: { onSuccess?: () => void }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)

    const [teachers, setTeachers] = useState<{ id: string; name: string; email: string }[]>([])
    const [students, setStudents] = useState<{ id: string; name: string; email: string }[]>([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<"PERSONAL" | "GROUP">("PERSONAL")
    const [teacherId, setTeacherId] = useState("")
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])

    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()

    const [schedule, setSchedule] = useState<Record<Weekday, { start: string; end: string } | null>>({
        MONDAY: null,
        TUESDAY: null,
        WEDNESDAY: null,
        THURSDAY: null,
        FRIDAY: null,
        SATURDAY: null,
        SUNDAY: null,
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true)
            try {
                const [teachersRes, studentsRes] = await Promise.all([
                    fetch("/api/admin/teachers?limit=100&deleted=active"),
                    fetch("/api/admin/students?limit=100&deleted=active")
                ])

                const teachersData = await teachersRes.json()
                const studentsData = await studentsRes.json()

                setTeachers(teachersData.teachers || [])
                setStudents(studentsData.students || [])
            } catch (error) {
                console.error("Failed to fetch data:", error)
            } finally {
                setLoadingData(false)
            }
        }

        if (open) {
            fetchData()
        }
    }, [open])

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setType("PERSONAL")
        setTeacherId("")
        setSelectedStudents([])
        setStartDate(undefined)
        setEndDate(undefined)
        setSchedule({
            MONDAY: null,
            TUESDAY: null,
            WEDNESDAY: null,
            THURSDAY: null,
            FRIDAY: null,
            SATURDAY: null,
            SUNDAY: null,
        })
        setErrors({})
    }

    const toggleStudent = (id: string) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        )
    }

    const updateSchedule = (day: Weekday, field: "start" | "end", value: string) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day] ? { ...prev[day], [field]: value } : { start: field === "start" ? value : "", end: field === "end" ? value : "" },
        }))
    }

    const clearScheduleDay = (day: Weekday) => {
        setSchedule(prev => ({
            ...prev,
            [day]: null,
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!title.trim()) newErrors.title = "Title is required"
        if (!description.trim()) newErrors.description = "Description is required"
        if (!teacherId) newErrors.teacherId = "Teacher selection is required"
        if (!startDate) newErrors.startDate = "Start date is required"
        if (!endDate) newErrors.endDate = "End date is required"
        if (startDate && endDate && startDate >= endDate) {
            newErrors.endDate = "End date must be after start date"
        }

        const hasSchedule = Object.values(schedule).some(day =>
            day && day.start && day.end
        )
        if (!hasSchedule) {
            newErrors.schedule = "At least one day schedule is required"
        }

        // Validate time format and logic for each scheduled day
        Object.entries(schedule).forEach(([day, times]) => {
            if (times && (times.start || times.end)) {
                if (!times.start) newErrors[`${day}_start`] = "Start time required"
                if (!times.end) newErrors[`${day}_end`] = "End time required"

                if (times.start && times.end) {
                    const startTime = new Date(`2000-01-01T${times.start}:00`)
                    const endTime = new Date(`2000-01-01T${times.end}:00`)
                    if (startTime >= endTime) {
                        newErrors[`${day}_time`] = "End time must be after start time"
                    }
                }
            }
        })

        if (type === "GROUP" && selectedStudents.length === 0) {
            newErrors.students = "At least one student must be selected for group courses"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

        setLoading(true)
        try {
            const courseRes = await fetch("/api/admin/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                    type,
                    teacherId,
                    startDate,
                    endDate,
                    schedule: Object.entries(schedule)
                        .filter(([_, val]) => val !== null && val.start && val.end)
                        .map(([day, val]) => ({ dayOfWeek: day, ...val })),
                    studentIds: selectedStudents,
                }),
            })

            if (courseRes.ok) {
                setOpen(false)
                resetForm()
                onSuccess?.()
            } else {
                const errorData = await courseRes.json()
                setErrors({ submit: errorData.message || "Failed to create course" })
            }
        } catch (error) {
            setErrors({ submit: "Network error. Please try again." })
        } finally {
            setLoading(false)
        }
    }

    const selectedStudentNames = students
        .filter(s => selectedStudents.includes(s.id))
        .map(s => s.name)

    const activeScheduleDays = Object.entries(schedule)
        .filter(([_, times]) => times && times.start && times.end)
        .length

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            setOpen(newOpen)
            if (!newOpen) resetForm()
        }}>
            <DialogTrigger asChild>
                <Button variant="default" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    New Course
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full sm:min-w-6xl max-h-[95vh] flex flex-col">
                <DialogHeader className="shrink-0 pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">Create New Course</DialogTitle>
                </DialogHeader>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="space-y-6 py-4">
                        {/* Basic Information */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                                        Basic Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Course Title *</Label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                placeholder="Enter course title"
                                                className={errors.title ? "border-red-500" : ""}
                                            />
                                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="type">Course Type *</Label>
                                            <Select value={type} onValueChange={v => setType(v as any)}>
                                                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                                                    <SelectValue placeholder="Select course type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PERSONAL">
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4" />
                                                            Personal (1-on-1)
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="GROUP">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="h-4 w-4" />
                                                            Group Class
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            placeholder="Enter course description"
                                            rows={3}
                                            className={errors.description ? "border-red-500" : ""}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Teacher Selection */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                                        Teacher Assignment
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="teacher">Select Teacher *</Label>
                                        <Select value={teacherId} onValueChange={setTeacherId} disabled={loadingData}>
                                            <SelectTrigger className={errors.teacherId ? "border-red-500" : ""}>
                                                <SelectValue placeholder={loadingData ? "Loading teachers..." : "Select a teacher"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {teachers.map(teacher => (
                                                    <SelectItem key={teacher.id} value={teacher.id}>
                                                        <div className="flex flex-col items-start">
                                                            <span className="font-medium">{teacher.name}</span>
                                                            <span className="text-sm text-muted-foreground">{teacher.email}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.teacherId && <p className="text-sm text-red-500">{errors.teacherId}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Schedule */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                                            Course Schedule
                                        </h3>
                                        {activeScheduleDays > 0 && (
                                            <Badge variant="secondary">
                                                {activeScheduleDays} day{activeScheduleDays !== 1 ? 's' : ''} scheduled
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date *</Label>
                                            <Popover modal={true}>
                                                <PopoverTrigger className={buttonVariants({
                                                    variant: "outline",
                                                    className: `w-full justify-start text-left font-normal ${errors.startDate ? "border-red-500" : ""}`
                                                })}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {startDate ? format(startDate, "PPP") : "Select start date"}
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={startDate}
                                                        onSelect={setStartDate}
                                                        initialFocus
                                                        disabled={(date) => date < new Date()}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>End Date *</Label>
                                            <Popover>
                                                <PopoverTrigger className={buttonVariants({
                                                    variant: "outline",
                                                    className: `w-full justify-start text-left font-normal ${errors.startDate ? "border-red-500" : ""}`
                                                })}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {endDate ? format(endDate, "PPP") : "Select end date"}
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={endDate}
                                                        onSelect={setEndDate}
                                                        initialFocus
                                                        disabled={(date) => date < new Date() || (startDate && date <= startDate)}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Weekly Schedule *</Label>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                            {weekdays.map(({ key: day, label, short }) => (
                                                <div key={day} className="border rounded-lg p-3 space-y-2 bg-muted/20">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-sm">{label}</span>
                                                        {schedule[day] && (
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => clearScheduleDay(day)}
                                                                className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="flex-1 space-y-1">
                                                            <Input
                                                                type="time"
                                                                placeholder="Start"
                                                                value={schedule[day]?.start ?? ""}
                                                                onChange={e => updateSchedule(day, "start", e.target.value)}
                                                                className={`text-sm ${errors[`${day}_start`] || errors[`${day}_time`] ? "border-red-500" : ""}`}
                                                            />
                                                        </div>
                                                        <div className="flex items-center text-muted-foreground">
                                                            <Clock className="h-3 w-3" />
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <Input
                                                                type="time"
                                                                placeholder="End"
                                                                value={schedule[day]?.end ?? ""}
                                                                onChange={e => updateSchedule(day, "end", e.target.value)}
                                                                className={`text-sm ${errors[`${day}_end`] || errors[`${day}_time`] ? "border-red-500" : ""}`}
                                                            />
                                                        </div>
                                                    </div>
                                                    {(errors[`${day}_start`] || errors[`${day}_end`] || errors[`${day}_time`]) && (
                                                        <p className="text-xs text-red-500">
                                                            {errors[`${day}_start`] || errors[`${day}_end`] || errors[`${day}_time`]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {errors.schedule && <p className="text-sm text-red-500">{errors.schedule}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Student Enrollment */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                                            Student Enrollment {type === "GROUP" && "*"}
                                        </h3>
                                        {selectedStudents.length > 0 && (
                                            <Badge variant="secondary">
                                                {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
                                            </Badge>
                                        )}
                                    </div>

                                    {selectedStudents.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {selectedStudentNames.map(name => (
                                                <Badge key={name} variant="outline" className="text-xs">
                                                    {name}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <ScrollArea className={`h-48 border rounded-md p-3 ${errors.students ? "border-red-500" : ""}`}>
                                        {loadingData ? (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                Loading students...
                                            </div>
                                        ) : students.length === 0 ? (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                No students available
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {students.map(student => (
                                                    <div key={student.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
                                                        <Checkbox
                                                            checked={selectedStudents.includes(student.id)}
                                                            onCheckedChange={() => toggleStudent(student.id)}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium truncate">{student.name}</div>
                                                            <div className="text-sm text-muted-foreground truncate">{student.email}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ScrollArea>
                                    {errors.students && <p className="text-sm text-red-500">{errors.students}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter className="shrink-0 pt-4 border-t bg-background">
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                            className="flex-1 sm:flex-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || loadingData}
                            className="flex-1 sm:flex-none"
                        >
                            {loading ? "Creating..." : "Create Course"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}