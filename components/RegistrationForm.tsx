"use client"

import React, { useState } from 'react'
import { GalleryVerticalEnd, Upload, FileText, User, MapPin, BookOpen, Calendar, Award, Users, Clock, DollarSign, Loader2 } from "lucide-react"

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
import { useSession } from 'next-auth/react'

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { data } = useSession();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [userType, setUserType] = useState("student")
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
    const [selectedGrades, setSelectedGrades] = useState<string[]>([])
    const [availability, setAvailability] = useState<string[]>([])

    const subjects = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
        'History', 'Geography', 'Computer Science', 'Economics', 'Accountancy'
    ]

    const grades = ['1st-5th', '6th-8th', '9th-10th', '11th-12th', 'Undergraduate', 'Graduate']

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const handleSubjectChange = (subject: string, checked: boolean) => {
        setSelectedSubjects(prev =>
            checked ? [...prev, subject] : prev.filter(s => s !== subject)
        )
    }

    const handleGradeChange = (grade: string, checked: boolean) => {
        setSelectedGrades(prev =>
            checked ? [...prev, grade] : prev.filter(g => g !== grade)
        )
    }

    const handleAvailabilityChange = (day: string, checked: boolean) => {
        setAvailability(prev =>
            checked ? [...prev, day] : prev.filter(d => d !== day)
        )
    }

    return (
        <div className={cn("max-w-4xl mx-auto space-y-8", className)} {...props}>
            {/* Header */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-md bg-primary">
                        <GalleryVerticalEnd className="size-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">My Pathshaala Registration</h1>
                </div>
                <p className="text-muted-foreground text-center">Complete your profile to get started</p>
            </div>

            <form
                action={async (formData) => {
                    try {
                        setIsSubmitting(true)
                        console.log("Registration form data", formData)
                        formData.set("email", data?.user.email || "");
                        const res = await fetch("/api/register", {
                            method: "POST",
                            body: formData,
                            headers: {
                                // Don't manually set Content-Type if using FormData
                                "Accept": "application/json",
                            },
                        });

                        const result = await res.json();

                        if (!res.ok) {
                            console.error("Registration failed:", result.error || result);
                            // Show error to user, e.g., toast.error(...)
                        } else {
                            console.log("Registration successful:", result);
                            // Redirect or notify user
                        }
                    } catch (err) {
                        console.error("Unexpected error during registration:", err);
                        // Show fallback error
                    }
                    finally{
                        setIsSubmitting(false)
                    }
                }}
                className="space-y-8"
            >
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
                        <RadioGroup value={userType} onValueChange={setUserType} name="userType">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="student" />
                                <Label htmlFor="student">Student - Looking for tutoring</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="teacher" id="teacher" />
                                <Label htmlFor="teacher">Teacher/Tutor - Offering tutoring services</Label>
                            </div>
                        </RadioGroup>
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
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    disabled
                                    value={data?.user.email || ""}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age *</Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    placeholder="25"
                                    min="13"
                                    max="100"
                                    required
                                />
                            </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="address">Address *</Label>
                            <Textarea
                                id="address"
                                name="address"
                                placeholder="Enter your complete address"
                                required
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="city">City *</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    placeholder="Mumbai"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State *</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    placeholder="Maharashtra"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zipCode">PIN Code *</Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    placeholder="400001"
                                    required
                                />
                            </div>
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
                            <div className="space-y-2">
                                <Label htmlFor="qualification">Highest Qualification *</Label>
                                <Select name="qualification" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select qualification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10th">10th Grade</SelectItem>
                                        <SelectItem value="12th">12th Grade</SelectItem>
                                        <SelectItem value="diploma">Diploma</SelectItem>
                                        <SelectItem value="bachelor">{`Bachelor's Degree`}</SelectItem>
                                        <SelectItem value="master">{`Master's Degree`}</SelectItem>
                                        <SelectItem value="phd">PhD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="institution">Institution/School/College *</Label>
                                <Input
                                    id="institution"
                                    name="institution"
                                    placeholder="Name of your institution"
                                    required
                                />
                            </div>
                        </div>
                        {userType === 'student' && (
                            <div className="space-y-2">
                                <Label htmlFor="currentGrade">Current Grade/Class *</Label>
                                <Select name="currentGrade" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your current grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {grades.map(grade => (
                                            <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
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
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {subjects.map(subject => (
                                <div key={subject} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={subject}
                                        checked={selectedSubjects.includes(subject)}
                                        onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                                    />
                                    <Label htmlFor={subject} className="text-sm">{subject}</Label>
                                </div>
                            ))}
                        </div>
                        <input
                            type="hidden"
                            name="subjects"
                            value={selectedSubjects.join(',')}
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
                                <div className="space-y-2">
                                    <Label>Grade Levels You Can Teach *</Label>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {grades.map(grade => (
                                            <div key={grade} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`grade-${grade}`}
                                                    checked={selectedGrades.includes(grade)}
                                                    onCheckedChange={(checked) => handleGradeChange(grade, checked as boolean)}
                                                />
                                                <Label htmlFor={`grade-${grade}`} className="text-sm">{grade}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="hidden" name="teachingGrades" value={selectedGrades.join(',')} />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Teaching Experience (Years) *</Label>
                                        <Input
                                            id="experience"
                                            name="experience"
                                            type="number"
                                            placeholder="5"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                                        <Input
                                            id="hourlyRate"
                                            name="hourlyRate"
                                            type="number"
                                            placeholder="500"
                                            min="100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specialization">Specialization</Label>
                                    <Input
                                        id="specialization"
                                        name="specialization"
                                        placeholder="e.g., IIT-JEE Preparation, Board Exam Specialist"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Availability *</Label>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        {days.map(day => (
                                            <div key={day} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`day-${day}`}
                                                    checked={availability.includes(day)}
                                                    onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
                                                />
                                                <Label htmlFor={`day-${day}`} className="text-sm">{day}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="hidden" name="availability" value={availability.join(',')} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio/Introduction</Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        placeholder="Tell students about yourself, your teaching methodology, achievements..."
                                        rows={4}
                                    />
                                </div>
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
                                <div className="space-y-2">
                                    <Label htmlFor="studentId">School/College ID *</Label>
                                    <Input
                                        id="studentId"
                                        name="studentId"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reportCard">Recent Report Card</Label>
                                    <Input
                                        id="reportCard"
                                        name="reportCard"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentId">Parent/Guardian ID (for minors)</Label>
                                    <Input
                                        id="parentId"
                                        name="parentId"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </div>
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
                                        <li>• Police Verification Certificate (recommended)</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="governmentId">Government ID Proof *</Label>
                                    <Input
                                        id="governmentId"
                                        name="governmentId"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="educationCerts">Educational Certificates *</Label>
                                    <Input
                                        id="educationCerts"
                                        name="educationCerts"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        multiple
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="resume">Resume/CV *</Label>
                                    <Input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experienceCerts">Teaching Experience Certificates</Label>
                                    <Input
                                        id="experienceCerts"
                                        name="experienceCerts"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        multiple
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="policeVerification">Police Verification Certificate</Label>
                                    <Input
                                        id="policeVerification"
                                        name="policeVerification"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Separator />

                {/* Submit Button */}
                <div className="flex flex-col gap-4">
                    <Button disabled={isSubmitting} type="submit" size="lg" className="w-full">
                        {isSubmitting?<Loader2 className='animate-spin' />:"Complete Registration"}
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
        </div>
    )
}