"use client"
import React, { useState, useEffect } from 'react'
import {
  User as UserIcon,
  MapPin,
  BookOpen,
  Award,
  Users,
  Clock,
  FileText,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Document, ProfileStatus, Role, User } from '@prisma/client'


export default function UserDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params;
  const [user, setUser] = useState<User & { documents: Document[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    fetch("/api/users/" + id, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log({ data })
        setUser(data)
      })
      .catch(e => {
        setError(e?.message)
      })
      .finally(() => {
        setLoading(false)
      })
    // setTimeout(() => {
    //   setUser(mockUser)
    //   setLoading(false)
    // }, 1000)
  }, [id])

  const getStatusColor = (status: ProfileStatus) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-50'
      case 'PENDING_APPROVAL': return 'text-yellow-600 bg-yellow-50'
      case 'REJECTED': return 'text-red-600 bg-red-50'
      case 'INCOMPLETE': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: ProfileStatus) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="size-4" />
      case 'PENDING_APPROVAL': return <AlertCircle className="size-4" />
      case 'REJECTED': return <XCircle className="size-4" />
      case 'INCOMPLETE': return <Clock className="size-4" />
      default: return <Clock className="size-4" />
    }
  }

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'TEACHER': return 'bg-blue-100 text-blue-800'
      case 'STUDENT': return 'bg-green-100 text-green-800'
      case 'ADMIN': return 'bg-purple-100 text-purple-800'
      case 'SUPER_ADMIN': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatBytes = (bytes?: number) => {
    if (!bytes) return 'N/A'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const parseSubjects = (subjects?: string) => {
    return subjects ? subjects.split(',').filter(Boolean) : []
  }

  const parseGrades = (grades?: string) => {
    return grades ? grades.split(',').filter(Boolean) : []
  }

  const parseAvailability = (availability?: string) => {
    return availability ? availability.split(',').filter(Boolean) : []
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="size-8 animate-spin" />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="size-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Error Loading User</h3>
              <p className="text-muted-foreground">{error || "User not found"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6">
          <Avatar className="size-24">
            <AvatarImage src="/placeholder-avatar.jpg" alt={user.name || 'User'} />
            <AvatarFallback className="text-2xl">
              {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user.name || 'Unnamed User'}</h1>
              <Badge className={getRoleColor(user.role)}>
                {user.role.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {getStatusIcon(user.profileStatus)}
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(user.profileStatus)}`}>
                {user.profileStatus.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user.email}
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-1">
                  <Phone className="size-4" />
                  {user.phoneNumber}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined {formatDate(user.createdAt?.toString())}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="size-5" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="font-medium">{user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{user.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="font-medium">{user.phoneNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Age</label>
                    <p className="font-medium">{user.age ? `${user.age} years` : 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="size-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p className="font-medium">{user.address || 'Not provided'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">City</label>
                      <p className="font-medium">{user.city || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">State</label>
                      <p className="font-medium">{user.state || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">PIN Code</label>
                    <p className="font-medium">{user.zipCode || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5" />
                  Educational Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                    <p className="font-medium">{user.qualification || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Institution</label>
                    <p className="font-medium">{user.institution || 'Not provided'}</p>
                  </div>
                  {user.currentGrade && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Current Grade</label>
                      <p className="font-medium">{user.currentGrade}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="size-5" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.subjects && parseSubjects(user.subjects).map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                  {user.subjects && parseSubjects(user.subjects).length === 0 && (
                    <p className="text-muted-foreground">No subjects specified</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Extra Qualifications */}
          {user.extraQualifications && Array.isArray(user.extraQualifications) && user.extraQualifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="size-5" />
                  Additional Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {user.extraQualifications.map((qualification: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{qualification.title}</h4>
                      <p className="text-sm text-muted-foreground">{qualification.institution}</p>
                      <p className="text-sm text-muted-foreground">Year: {qualification.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          {user.role === 'TEACHER' && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Teaching Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="size-5" />
                    Teaching Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Experience</label>
                      <p className="font-medium">{user.experience ? `${user.experience} years` : 'Not provided'}</p>
                    </div>
                    {user.hourlyRate && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Hourly Rate</label>
                        <p className="font-medium">₹{user.hourlyRate}</p>
                      </div>
                    )}
                    {user.specialization && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Specialization</label>
                        <p className="font-medium">{user.specialization}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Teaching Grades & Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="size-5" />
                    Availability & Grades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Teaching Grades</label>
                    <div className="flex flex-wrap gap-2">
                      {user.teachingGrades && parseGrades(user.teachingGrades).map((grade, index) => (
                        <Badge key={index} variant="outline">
                          {grade}
                        </Badge>
                      ))}
                      {user.teachingGrades && parseGrades(user.teachingGrades).length === 0 && (
                        <p className="text-muted-foreground">No grades specified</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Availability</label>
                    <div className="flex flex-wrap gap-2">
                      {user.availability && parseAvailability(user.availability).map((day, index) => (
                        <Badge key={index} variant="outline">
                          {day}
                        </Badge>
                      ))}
                      {user.availability && parseAvailability(user.availability).length === 0 && (
                        <p className="text-muted-foreground">No availability specified</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio */}
              {user.bio && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{user.bio}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {user.role === 'STUDENT' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Grade</label>
                    <p className="font-medium">{user.currentGrade || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Looking for help in</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.subjects && parseSubjects(user.subjects).map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Uploaded Documents
              </CardTitle>
              <CardDescription>
                All documents uploaded during registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {user.documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="size-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{document.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{document.type.replace('_', ' ')}</span>
                          <span>•</span>
                          {document.size && <span>{formatBytes(document.size)}</span>}
                          <span>•</span>
                          <span>{formatDate(document.createdAt?.toString())}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="size-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="size-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
                {user.documents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="size-12 mx-auto mb-4 opacity-50" />
                    <p>No documents uploaded</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}