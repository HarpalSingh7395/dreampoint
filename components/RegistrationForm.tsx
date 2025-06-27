"use client"

import React, { useState } from 'react'
import { GalleryVerticalEnd, Upload, FileText, User, MapPin, BookOpen, Calendar, Award, Users, Clock, DollarSign, Loader2, Camera, Plus, X } from "lucide-react"
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useSession } from 'next-auth/react'
import LogoIcon from './icons/LogoIcon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// File validation helper
const fileSchema = z.custom<FileList>((val) => {
    if (val instanceof FileList) return val.length > 0
    return false
}, "Please select a file")

const optionalFileSchema = z.custom<FileList>((val) => {
    if (val instanceof FileList) return true
    return false
}, "Invalid file")

// Base schema
const baseSchema = z.object({
    userType: z.enum(['student', 'teacher']),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),
    age: z.number().min(13, "Age must be at least 13").max(100, "Age must be less than 100"),
    address: z.string().min(10, "Please enter a complete address"),
    city: z.string().min(2, "City name is required"),
    state: z.string().min(2, "State name is required"),
    zipCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit PIN code"),
    qualification: z.string().min(1, "Please select your qualification"),
    institution: z.string().min(2, "Institution name is required"),
    subjects: z.array(z.string()).min(1, "Please select at least one subject"),
    profilePicture: fileSchema,
})

// Student-specific schema
const studentSchema = baseSchema.extend({
    userType: z.literal('student'),
    currentGrade: z.string().min(1, "Please select your current grade"),
    studentId: fileSchema,
    reportCard: optionalFileSchema,
    parentId: optionalFileSchema,
})

// Teacher-specific schema
const teacherSchema = baseSchema.extend({
    userType: z.literal('teacher'),
    teachingGrades: z.array(z.string()).min(1, "Please select at least one grade level"),
    experience: z.number().min(0, "Experience cannot be negative"),
    hourlyRate: z.number().min(100, "Hourly rate must be at least ₹100"),
    specialization: z.string().optional(),
    availability: z.array(z.string()).min(1, "Please select at least one day"),
    bio: z.string().optional(),
    extraQualifications: z.array(z.object({
        title: z.string().min(1, "Qualification title is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.number().min(1950, "Year must be valid").max(new Date().getFullYear(), "Year cannot be in the future"),
        certificate: optionalFileSchema,
    })).optional(),
    governmentId: fileSchema,
    educationCerts: fileSchema,
    resume: fileSchema,
    experienceCerts: optionalFileSchema,
    policeVerification: optionalFileSchema.optional(),
})

// Union schema
const registrationSchema = z.discriminatedUnion('userType', [
    studentSchema,
    teacherSchema,
])

type RegistrationFormData = z.infer<typeof registrationSchema>

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { data: session } = useSession();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const router = useRouter()
    const subjects = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
        'History', 'Geography', 'Computer Science', 'Economics', 'Accountancy'
    ]

    const grades = ['1st-5th', '6th-8th', '9th-10th', '11th-12th', 'Undergraduate', 'Graduate']
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            userType: 'student'
        }
    })

    const { fields: qualificationFields, append: appendQualification, remove: removeQualification } = useFieldArray({
        control: form.control,
        name: "extraQualifications" as any,
    })

    const userType = form.watch('userType')

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setProfilePreview(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = async (data: RegistrationFormData) => {
        try {
            setIsSubmitting(true)

            const formData = new FormData()

            // Add all form fields to FormData
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'subjects' || key === 'teachingGrades' || key === 'availability') {
                    formData.append(key, (value as string[]).join(','))
                } else if (key === 'extraQualifications' && Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value))
                } else if (value instanceof FileList) {
                    if (value.length > 0) {
                        for (let i = 0; i < value.length; i++) {
                            formData.append(key, value[i])
                        }
                    }
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString())
                }
            })

            formData.set("email", session?.user?.email || "");

            const res = await fetch("/api/register", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (!res.ok) {
                console.error("Registration failed:", result.error || result);
            } else {
                console.log("Registration successful:", result);
            }
            router.push("/pending-approval")
        } catch (err) {
            console.error("Unexpected error during registration:", err);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={cn("max-w-4xl mx-auto space-y-8", className)} {...props}>
            {/* Header */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-md bg-primary">
                        <LogoIcon variant='base' className="size-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">My Pathshaala Registration</h1>
                </div>
                <p className="text-muted-foreground text-center">Complete your profile to get started</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* User Type Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="size-5" />
                                Account Type
                            </CardTitle>
                            <CardDescription>Select whether you are registering as a student or teacher</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="userType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="student" id="student" />
                                                    <Label htmlFor="student">Student - Looking for tutoring</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="teacher" id="teacher" />
                                                    <Label htmlFor="teacher">Teacher/Tutor - Offering tutoring services</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Profile Picture */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Camera className="size-5" />
                                Profile Picture
                            </CardTitle>
                            <CardDescription>Upload a clear photo of yourself</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-4">
                                            <div className="relative size-20 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                                                {profilePreview ? (
                                                    <Image fill src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Camera className="size-8 text-muted-foreground/50" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            onChange(e.target.files);
                                                            handleProfilePictureChange(e);
                                                        }}
                                                        {...field}
                                                        value={undefined} // Important: Clear the value to prevent controlled/uncontrolled issues
                                                    />
                                                </FormControl>
                                                <FormDescription className='mt-2'>
                                                    Upload a JPG, PNG, or GIF image (max 5MB)
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="size-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your full name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormLabel>Email Address *</FormLabel>
                                    <Input
                                        type="email"
                                        disabled
                                        value={session?.user?.email || ""}
                                        placeholder="your.email@example.com"
                                    />
                                </FormItem>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number *</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="+91 9876543210" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="25"
                                                    min="13"
                                                    max="100"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Address Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="size-5" />
                                Address Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address *</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter your complete address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-4 sm:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Mumbai" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Maharashtra" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>PIN Code *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="400001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Educational Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="size-5" />
                                Educational Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="qualification"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Highest Qualification *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select qualification" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="10th">10th Grade</SelectItem>
                                                    <SelectItem value="12th">12th Grade</SelectItem>
                                                    <SelectItem value="diploma">Diploma</SelectItem>
                                                    <SelectItem value="bachelor">{`Bachelor's Degree`}</SelectItem>
                                                    <SelectItem value="master">{`Master's Degree`}</SelectItem>
                                                    <SelectItem value="phd">PhD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="institution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Institution/School/College *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name of your institution" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {userType === 'student' && (
                                <FormField
                                    control={form.control}
                                    name="currentGrade"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Grade/Class *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your current grade" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {grades.map(grade => (
                                                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Subject Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="size-5" />
                                {userType === 'student' ? 'Subjects You Need Help With' : 'Subjects You Can Teach'}
                            </CardTitle>
                            <CardDescription>
                                {userType === 'student'
                                    ? 'Select the subjects you need tutoring for'
                                    : 'Select all subjects you are qualified to teach'
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="subjects"
                                render={() => (
                                    <FormItem>
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {subjects.map(subject => (
                                                <FormField
                                                    key={subject}
                                                    control={form.control}
                                                    name="subjects"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(subject)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange(field.value ? [...field.value, subject] : [subject])
                                                                            : field.onChange(field.value?.filter(value => value !== subject))
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">{subject}</FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Teacher-specific fields */}
                    {userType === 'teacher' && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="size-5" />
                                        Teaching Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="teachingGrades"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Grade Levels You Can Teach *</FormLabel>
                                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                    {grades.map(grade => (
                                                        <FormField
                                                            key={grade}
                                                            control={form.control}
                                                            name="teachingGrades"
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(grade)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange(field.value ? [...field.value, grade] : [grade])
                                                                                    : field.onChange(field.value?.filter(value => value !== grade))
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-sm font-normal">{grade}</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="experience"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Teaching Experience (Years) *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="5"
                                                            min="0"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="hourlyRate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Hourly Rate (₹) *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="500"
                                                            min="100"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="specialization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Specialization</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., IIT-JEE Preparation, Board Exam Specialist" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="availability"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Availability *</FormLabel>
                                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                                    {days.map(day => (
                                                        <FormField
                                                            key={day}
                                                            control={form.control}
                                                            name="availability"
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(day)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange(field.value ? [...field.value, day] : [day])
                                                                                    : field.onChange(field.value?.filter(value => value !== day))
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-sm font-normal">{day}</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio/Introduction</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell students about yourself, your teaching methodology, achievements..."
                                                        rows={4}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Extra Qualifications */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="size-5" />
                                        Additional Qualifications
                                    </CardTitle>
                                    <CardDescription>
                                        Add any additional certifications, courses, or qualifications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {qualificationFields.map((field, index) => (
                                        <div key={field.id} className="p-4 border rounded-lg space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-sm font-medium">Qualification {index + 1}</h4>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeQualification(index)}
                                                >
                                                    <X className="size-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`extraQualifications.${index}.title`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Qualification Title *</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g., B.Ed, CTET, TET" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`extraQualifications.${index}.institution`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Institution *</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Institution/Board name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`extraQualifications.${index}.year`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Completion Year *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="2020"
                                                                    min="1950"
                                                                    max={new Date().getFullYear()}
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`extraQualifications.${index}.certificate`}
                                                    render={({ field: { onChange, value, ...field } }) => (
                                                        <FormItem>
                                                            <FormLabel>Certificate (Optional)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="file"
                                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                                    onChange={(e) => onChange(e.target.files)}
                                                                    value={undefined}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => appendQualification({ title: '', institution: '', year: new Date().getFullYear(), certificate: undefined })}
                                        className="w-full"
                                    >
                                        <Plus className="size-4 mr-2" />
                                        Add Another Qualification
                                    </Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Document Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="size-5" />
                                Document Upload
                            </CardTitle>
                            <CardDescription>
                                {userType === 'student'
                                    ? 'Upload your school ID or any identification document'
                                    : 'Upload required documents for verification'
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userType === 'student' ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-medium text-blue-900 mb-2">Required Documents for Students:</h4>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• School/College ID Card (mandatory)</li>
                                            <li>• Recent Report Card or Mark Sheet</li>
                                            <li>• Parent/Guardian ID Proof (for minors)</li>
                                        </ul>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="studentId"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>School/College ID *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="reportCard"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Recent Report Card</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="parentId"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Parent/Guardian ID (for minors)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <h4 className="font-medium text-green-900 mb-2">Required Documents for Tutors:</h4>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>• Government ID Proof (Aadhar/PAN/Passport) - mandatory</li>
                                            <li>• Educational Certificates/Degrees - mandatory</li>
                                            <li>• Resume/CV - mandatory</li>
                                            <li>• Teaching Experience Certificates</li>
                                            {/* <li>• Police Verification Certificate (recommended)</li> */}
                                        </ul>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="governmentId"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Government ID Proof *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="educationCerts"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Educational Certificates *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        multiple
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="resume"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Resume/CV *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="experienceCerts"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Teaching Experience Certificates</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        multiple
                                                        onChange={(e) => onChange(e.target.files)}
                                                        value={undefined}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <FormField
                                        control={form.control}
                                        name="policeVerification"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>Police Verification Certificate</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* Submit Button */}
                    <div className="flex flex-col gap-4">
                        <Button disabled={isSubmitting} type="submit" size="lg" className="w-full">
                            {isSubmitting ? <Loader2 className='animate-spin size-4 mr-2' /> : null}
                            {isSubmitting ? "Submitting..." : "Complete Registration"}
                        </Button>
                        <div className="text-muted-foreground text-center text-xs text-balance">
                            By registering, you agree to our{" "}
                            <a href="#" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </a>
                            .
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}