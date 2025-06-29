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
import { storage } from '@/lib/appwrite'
import { ApproveButton } from '@/components/admin/ApproveButton'


export default function UserDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params;
  const [user, setUser] = useState<User & { documents: Document[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fileUrls, setFileUrls] = useState<{ [fileId: string]: { preview: string; download: string } }>({})

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
  }, [id])

  useEffect(() => {
    if (!user) return;
    const fetchUrls = async () => {
      const urls: any = {}

      for (const doc of user.documents) {
        urls[doc.fileId] = {
          preview: storage.getFileView(doc.path, doc.fileId),
          download: storage.getFileDownload(doc.path, doc.fileId)
        }
      }

      setFileUrls(urls)
    }

    if (user?.documents?.length) {
      fetchUrls()
    }
  }, [user])

  //@ts-ignore
  const onApprove = (user: User) => setUser(oldUser => ({ ...oldUser, profileStatus: user.profileStatus }));

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
      case 'APPROVED': return <CheckCircle className="w-4 h-4" />
      case 'PENDING_APPROVAL': return <AlertCircle className="w-4 h-4" />
      case 'REJECTED': return <XCircle className="w-4 h-4" />
      case 'INCOMPLETE': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
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
      <div className="flex items-center justify-center min-h-screen px-4">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Error Loading User</h3>
              <p className="text-muted-foreground">{error || "User not found"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
            <AvatarImage src="/placeholder-avatar.jpg" alt={user.name || 'User'} />
            <AvatarFallback className="text-xl sm:text-2xl">
              {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold break-words">{user.name || 'Unnamed User'}</h1>
              <Badge className={getRoleColor(user.role)}>
                {user.role.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              {getStatusIcon(user.profileStatus)}
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(user.profileStatus)}`}>
                {user.profileStatus.replace('_', ' ')}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span className="break-all">{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {user.phoneNumber}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="whitespace-nowrap">Joined {formatDate(user.createdAt?.toString())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="personal" className="text-xs sm:text-sm px-2 py-2">Personal Info</TabsTrigger>
          <TabsTrigger value="education" className="text-xs sm:text-sm px-2 py-2">Education</TabsTrigger>
          <TabsTrigger value="professional" className="text-xs sm:text-sm px-2 py-2">Professional</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm px-2 py-2">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserIcon className="w-5 h-5" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="font-medium break-words">{user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium break-all">{user.email || 'Not provided'}</p>
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
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p className="font-medium break-words">{user.address || 'Not provided'}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <TabsContent value="education" className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Basic Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Educational Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                    <p className="font-medium break-words">{user.qualification || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Institution</label>
                    <p className="font-medium break-words">{user.institution || 'Not provided'}</p>
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
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.subjects && parseSubjects(user.subjects).map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
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
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="w-5 h-5" />
                  Additional Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {user.extraQualifications.map((qualification: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium break-words">{qualification.title}</h4>
                      <p className="text-sm text-muted-foreground break-words">{qualification.institution}</p>
                      <p className="text-sm text-muted-foreground">Year: {qualification.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="professional" className="space-y-4 sm:space-y-6">
          {user.role === 'TEACHER' && (
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {/* Teaching Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5" />
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
                        <p className="font-medium break-words">{user.specialization}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Teaching Grades & Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5" />
                    Availability & Grades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Teaching Grades</label>
                    <div className="flex flex-wrap gap-2">
                      {user.teachingGrades && parseGrades(user.teachingGrades).map((grade, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
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
                        <Badge key={index} variant="outline" className="text-xs">
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
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed break-words">{user.bio}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {user.role === 'STUDENT' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Grade</label>
                    <p className="font-medium">{user.currentGrade || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Looking for help in</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.subjects && parseSubjects(user.subjects).map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
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

        <TabsContent value="documents" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Uploaded Documents
              </CardTitle>
              <CardDescription>
                All documents uploaded during registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {user.documents.length > 0 ? (
                  user.documents.map((document: any) => (
                    <div key={document.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium break-words">{document.name}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground">
                            <span>{document.type.replace('_', ' ')}</span>
                            {document.size && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span>{formatBytes(document.size)}</span>
                              </>
                            )}
                            <span className="hidden sm:inline">•</span>
                            <span className="whitespace-nowrap">{formatDate(document.createdAt?.toString())}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a href={fileUrls[document.fileId]?.preview} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                          <Button disabled={!!!fileUrls[document.fileId]?.preview} variant="outline" size="sm" className="w-full sm:w-auto">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </a>
                        <a href={fileUrls[document.fileId]?.download} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                          <Button disabled={!!!fileUrls[document.fileId]?.download} variant="outline" size="sm" className="w-full sm:w-auto">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No documents uploaded</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {user && (
        <div className='w-full flex justify-center sm:justify-end items-center mt-6'>
          <ApproveButton user={user} onApprove={onApprove} />
        </div>
      )}
    </div>
  )
}