/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Calendar as CalendarIcon, Clock, Users, User, BookOpen, X, Search, Copy, Zap } from "lucide-react"
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

const subjectButtons = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", "History",
    "Geography", "Computer Science", "Economics", "Literature", "Art", "Music",
    "French", "Spanish", "German", "Psychology", "Philosophy", "Statistics"
]

const timePresets = [
    { label: "Morning (9:00 - 12:00)", start: "09:00", end: "12:00" },
    { label: "Afternoon (13:00 - 16:00)", start: "13:00", end: "16:00" },
    { label: "Evening (17:00 - 20:00)", start: "17:00", end: "20:00" },
    { label: "Short Session (1 hour)", start: "10:00", end: "11:00" },
    { label: "Standard Session (2 hours)", start: "14:00", end: "16:00" },
]

interface Teacher {
    id: string
    name: string
    email: string
}

interface Student {
    id: string
    name: string
    email: string
}

export default function CreateCourseDialog({ onSuccess }: { onSuccess?: () => void }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingTeachers, setLoadingTeachers] = useState(false)
    const [loadingStudents, setLoadingStudents] = useState(false)

    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [students, setStudents] = useState<Student[]>([])
    const [teacherSearch, setTeacherSearch] = useState("")
    const [studentSearch, setStudentSearch] = useState("")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<"PERSONAL" | "GROUP">("PERSONAL")
    const [teacherId, setTeacherId] = useState("")
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])

    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()
    const [fee, setFee] = useState("")
    const [capacity, setCapacity] = useState("")

    const [schedule, setSchedule] = useState<Record<Weekday, { start: string; end: string } | null>>({
        MONDAY: null,
        TUESDAY: null,
        WEDNESDAY: null,
        THURSDAY: null,
        FRIDAY: null,
        SATURDAY: null,
        SUNDAY: null,
    })

    const [bulkTimeStart, setBulkTimeStart] = useState("")
    const [bulkTimeEnd, setBulkTimeEnd] = useState("")
    const [selectedDaysForBulk, setSelectedDaysForBulk] = useState<Weekday[]>([])

    const [errors, setErrors] = useState<Record<string, string>>({})


    const fetchTeachers = async (search = "", page = 1, reset = false) => {
        setLoadingTeachers(true)
        try {
            const response = await fetch(`/api/admin/teachers?limit=20&page=${page}&search=${encodeURIComponent(search)}&deleted=active`)
            const data = await response.json()

            if (reset) {
                setTeachers(data.teachers || [])
            } else {
                setTeachers(prev => [...prev, ...(data.teachers || [])])
            }
        } catch (error) {
            console.error("Failed to fetch teachers:", error)
        } finally {
            setLoadingTeachers(false)
        }
    }

    const fetchStudents = async (search = "", page = 1, reset = false) => {
        setLoadingStudents(true)
        try {
            const response = await fetch(`/api/admin/students?limit=20&page=${page}&search=${encodeURIComponent(search)}&deleted=active`)
            const data = await response.json()

            if (reset) {
                setStudents(data.students || [])
            } else {
                setStudents(prev => [...prev, ...(data.students || [])])
            }
        } catch (error) {
            console.error("Failed to fetch students:", error)
        } finally {
            setLoadingStudents(false)
        }
    }

    useEffect(() => {
        fetchTeachers()
        fetchStudents()
    }, [])

    // useEffect(() => {
    //     if (teacherSearch.trim() === "") {
    //         setTeacherPage(1)
    //         fetchTeachers("", 1, true)
    //     } else {
    //         debouncedTeacherSearch(teacherSearch)
    //     }
    // }, [])

    // useEffect(() => {
    //     if (studentSearch.trim() === "") {
    //         setStudentPage(1)
    //         fetchStudents("", 1, true)
    //     } else {
    //         debouncedStudentSearch(studentSearch)
    //     }
    // }, [])

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
        setBulkTimeStart("")
        setBulkTimeEnd("")
        setSelectedDaysForBulk([])
        setTeacherSearch("")
        setStudentSearch("")
        setFee("") // Add this line
        setCapacity("") // Add this line
        setErrors({})
    }

    const addSubjectToDescription = (subject: string) => {
        const currentDesc = description.trim()
        if (currentDesc === "") {
            setDescription(`${subject} course`)
        } else if (!currentDesc.toLowerCase().includes(subject.toLowerCase())) {
            setDescription(`${currentDesc}, ${subject}`)
        }
    }

    const applyTimePreset = (preset: { start: string; end: string }) => {
        setBulkTimeStart(preset.start)
        setBulkTimeEnd(preset.end)
    }

    const applyBulkTime = () => {
        if (bulkTimeStart && bulkTimeEnd && selectedDaysForBulk.length > 0) {
            setSchedule(prev => {
                const newSchedule = { ...prev }
                selectedDaysForBulk.forEach(day => {
                    newSchedule[day] = { start: bulkTimeStart, end: bulkTimeEnd }
                })
                return newSchedule
            })
            setSelectedDaysForBulk([])
        }
    }

    const toggleDayForBulk = (day: Weekday) => {
        setSelectedDaysForBulk(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        )
    }

    const copyScheduleToAll = (sourceDay: Weekday) => {
        const sourceSchedule = schedule[sourceDay]
        if (sourceSchedule) {
            setSchedule(prev => {
                const newSchedule = { ...prev }
                weekdays.forEach(({ key }) => {
                    if (key !== sourceDay) {
                        newSchedule[key] = { ...sourceSchedule }
                    }
                })
                return newSchedule
            })
        }
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

    // 3. Update the validateForm function to include fee and capacity validation:
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

        // Add fee validation
        if (!fee.trim()) {
            newErrors.fee = "Fee is required"
        } else {
            const feeNum = parseFloat(fee)
            if (isNaN(feeNum)) {
                newErrors.fee = "Fee must be a valid number"
            } else if (feeNum < 0) {
                newErrors.fee = "Fee cannot be negative"
            }
        }

        // Add capacity validation
        if (type === "GROUP") {
            if (!capacity.trim()) {
                newErrors.capacity = "Capacity is required for group courses"
            } else {
                const capacityNum = parseInt(capacity)
                if (isNaN(capacityNum)) {
                    newErrors.capacity = "Capacity must be a valid number"
                } else if (capacityNum <= 0) {
                    newErrors.capacity = "Capacity must be greater than zero"
                } else if (!Number.isInteger(parseFloat(capacity))) {
                    newErrors.capacity = "Capacity must be a whole number"
                }
            }
        }

        const hasSchedule = Object.values(schedule).some(day =>
            day && day.start && day.end
        )
        if (!hasSchedule) {
            newErrors.schedule = "At least one day schedule is required"
        }

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
                    fee: parseFloat(fee),
                    capacity: type === "GROUP" ? parseInt(capacity) : null,
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
        } catch {
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

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
    )

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.email.toLowerCase().includes(studentSearch.toLowerCase())
    )

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
                                                placeholder="e.g., Advanced Mathematics, Physics 101"
                                                className={errors.title ? "border-red-500" : ""}
                                            />
                                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="type">Course Type *</Label>
                                            <Select value={type} onValueChange={v => setType(v as "PERSONAL" | "GROUP")}>
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
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap gap-1">
                                                {subjectButtons.map(subject => (
                                                    <Button
                                                        key={subject}
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => addSubjectToDescription(subject)}
                                                        className="h-7 text-xs"
                                                    >
                                                        {subject}
                                                    </Button>
                                                ))}
                                            </div>
                                            <Textarea
                                                id="description"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                placeholder="Describe what this course covers, learning objectives, etc."
                                                rows={3}
                                                className={errors.description ? "border-red-500" : ""}
                                            />
                                        </div>
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fee">Course Fee * (₹)</Label>
                                            <Input
                                                id="fee"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={fee}
                                                onChange={e => setFee(e.target.value)}
                                                placeholder="e.g., 5000, 1500.50"
                                                className={errors.fee ? "border-red-500" : ""}
                                            />
                                            {errors.fee && <p className="text-sm text-red-500">{errors.fee}</p>}
                                        </div>

                                        {type === "GROUP" && (
                                            <div className="space-y-2">
                                                <Label htmlFor="capacity">Class Capacity *</Label>
                                                <Input
                                                    id="capacity"
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    value={capacity}
                                                    onChange={e => setCapacity(e.target.value)}
                                                    placeholder="e.g., 10, 25"
                                                    className={errors.capacity ? "border-red-500" : ""}
                                                />
                                                {errors.capacity && <p className="text-sm text-red-500">{errors.capacity}</p>}
                                            </div>
                                        )}
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
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search teachers by name or email..."
                                                    value={teacherSearch}
                                                    onChange={e => setTeacherSearch(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                            <Select value={teacherId} onValueChange={setTeacherId}>
                                                <SelectTrigger className={errors.teacherId ? "border-red-500" : ""}>
                                                    <SelectValue placeholder="Select a teacher" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className="h-48">
                                                        {loadingTeachers ? (
                                                            <div className="p-2 text-center text-muted-foreground">Loading...</div>
                                                        ) : filteredTeachers.length === 0 ? (
                                                            <div className="p-2 text-center text-muted-foreground">No teachers found</div>
                                                        ) : (
                                                            filteredTeachers.map(teacher => (
                                                                <SelectItem key={teacher.id} value={teacher.id}>
                                                                    <div className="flex flex-col items-start">
                                                                        <span className="font-medium">{teacher.name}</span>
                                                                        <span className="text-sm text-muted-foreground">{teacher.email}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                        </div>
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
                                                    className: `w-full justify-start text-left font-normal ${errors.endDate ? "border-red-500" : ""}`
                                                })}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {endDate ? format(endDate, "PPP") : "Select end date"}
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={endDate}
                                                        onSelect={setEndDate}
                                                        disabled={(date) => !!(date < new Date() || (startDate && date <= startDate))}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
                                        </div>
                                    </div>

                                    {/* Bulk Time Setting */}
                                    <Card className="bg-blue-50/50 border-blue-200">
                                        <CardContent className="pt-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Zap className="h-4 w-4 text-blue-600" />
                                                    <Label className="text-blue-800 font-medium">Quick Time Setup</Label>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {timePresets.map((preset, idx) => (
                                                        <Button
                                                            key={idx}
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => applyTimePreset(preset)}
                                                            className="text-xs"
                                                        >
                                                            {preset.label}
                                                        </Button>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Start Time</Label>
                                                        <Input
                                                            type="time"
                                                            value={bulkTimeStart}
                                                            onChange={e => setBulkTimeStart(e.target.value)}
                                                            className="text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">End Time</Label>
                                                        <Input
                                                            type="time"
                                                            value={bulkTimeEnd}
                                                            onChange={e => setBulkTimeEnd(e.target.value)}
                                                            className="text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Apply to Days</Label>
                                                        <Button
                                                            size="sm"
                                                            onClick={applyBulkTime}
                                                            disabled={!bulkTimeStart || !bulkTimeEnd || selectedDaysForBulk.length === 0}
                                                            className="w-full"
                                                        >
                                                            Apply ({selectedDaysForBulk.length})
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {weekdays.map(({ key, short }) => (
                                                        <Button
                                                            key={key}
                                                            size="sm"
                                                            variant={selectedDaysForBulk.includes(key) ? "default" : "outline"}
                                                            onClick={() => toggleDayForBulk(key)}
                                                            className="text-xs"
                                                        >
                                                            {short}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="space-y-3">
                                        <Label>Weekly Schedule *</Label>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                            {weekdays.map(({ key: day, label, short }) => (
                                                <div key={day} className="border rounded-lg p-3 space-y-2 bg-muted/20">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-sm">{label}</span>
                                                        <div className="flex gap-1">
                                                            {schedule[day] && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => copyScheduleToAll(day)}
                                                                    className="h-6 w-6 p-0 text-muted-foreground hover:text-blue-500"
                                                                    title="Copy to all days"
                                                                >
                                                                    <Copy className="h-3 w-3" />
                                                                </Button>
                                                            )}
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

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search students by name or email..."
                                                value={studentSearch}
                                                onChange={e => setStudentSearch(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>

                                        <ScrollArea className={`h-48 border rounded-md p-3 ${errors.students ? "border-red-500" : ""}`}>
                                            {loadingStudents ? (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    Loading students...
                                                </div>
                                            ) : filteredStudents.length === 0 ? (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    {studentSearch ? "No students found matching your search" : "No students available"}
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {filteredStudents.map(student => (
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
                                    </div>
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
                            disabled={loading || loadingTeachers || loadingStudents}
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