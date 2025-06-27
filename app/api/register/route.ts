import { ID, storage } from "@/lib/appwrite"
import { prisma } from "@/prisma"
import { DocumentType, Role, ProfileStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        const userType = formData.get('userType') as string
        const fullName = formData.get('fullName') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const age = parseInt(formData.get('age') as string)
        const address = formData.get('address') as string
        const city = formData.get('city') as string
        const state = formData.get('state') as string
        const zipCode = formData.get('zipCode') as string
        const qualification = formData.get('qualification') as string
        const institution = formData.get('institution') as string
        const currentGrade = formData.get('currentGrade') as string | null
        const subjects = formData.get('subjects') as string
        const experience = formData.get('experience') ? parseInt(formData.get('experience') as string) : null
        const hourlyRate = formData.get('hourlyRate') ? parseInt(formData.get('hourlyRate') as string) : null
        const specialization = formData.get('specialization') as string | null
        const availability = formData.get('availability') as string | null
        const bio = formData.get('bio') as string | null
        const teachingGrades = formData.get('teachingGrades') as string | null
        const extraQualifications = formData.get('extraQualifications')
            ? JSON.parse(formData.get('extraQualifications') as string)
            : null

        const documentTypes: { field: string; type: DocumentType }[] = [
            { field: 'profilePicture', type: DocumentType.PROFILE_PICTURE },
            ...(userType === 'teacher'
                ? [
                    { field: 'governmentId', type: DocumentType.GOVERNMENT_ID },
                    { field: 'educationCerts', type: DocumentType.EDUCATION_CERT },
                    { field: 'resume', type: DocumentType.RESUME },
                    { field: 'experienceCerts', type: DocumentType.EXPERIENCE_CERT },
                    { field: 'policeVerification', type: DocumentType.POLICE_VERIFICATION }
                ]
                : [
                    { field: 'studentId', type: DocumentType.STUDENT_ID },
                    { field: 'reportCard', type: DocumentType.REPORT_CARD },
                    { field: 'parentId', type: DocumentType.PARENT_ID }
                ])
        ]

        const uploadedDocs: {
            field: string
            type: DocumentType
            fileId: string
            mimeType: string
            size: number
        }[] = []

        for (const docType of documentTypes) {
            const file = formData.get(docType.field) as File | null

            if (file && file.size > 0) {
                const uploadedFile = await storage.createFile(
                    process.env.APPWRITE_BUCKET_ID!,
                    ID.unique(),
                    file
                )

                uploadedDocs.push({
                    field: docType.field,
                    type: docType.type,
                    fileId: uploadedFile.$id,
                    mimeType: file.type,
                    size: file.size
                })
            }
        }

        // Step 2: Now run Prisma transaction — fast DB-only logic
        const result = await prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({ where: { email } })

            const user = existingUser
                ? await tx.user.update({
                    where: { email },
                    data: {
                        name: fullName,
                        phoneNumber: phone,
                        age,
                        address,
                        city,
                        state,
                        zipCode,
                        qualification,
                        institution,
                        currentGrade,
                        subjects,
                        experience,
                        hourlyRate,
                        specialization,
                        availability,
                        bio,
                        teachingGrades,
                        role: userType === 'teacher' ? Role.TEACHER : Role.STUDENT,
                        extraQualifications,
                        profileStatus: ProfileStatus.PENDING_APPROVAL
                    }
                })
                : await tx.user.create({
                    data: {
                        name: fullName,
                        email,
                        phoneNumber: phone,
                        age,
                        address,
                        city,
                        state,
                        zipCode,
                        qualification,
                        institution,
                        currentGrade,
                        subjects,
                        experience,
                        hourlyRate,
                        specialization,
                        availability,
                        bio,
                        teachingGrades,
                        role: userType === 'teacher' ? Role.TEACHER : Role.STUDENT,
                        extraQualifications,
                        profileStatus: ProfileStatus.PENDING_APPROVAL
                    }
                })

            // Link uploaded documents
            for (const doc of uploadedDocs) {
                await tx.document.create({
                    data: {
                        userId: user.id,
                        name: doc.type,
                        path: process.env.APPWRITE_BUCKET_ID!,
                        fileId: doc.fileId,
                        mimeType: doc.mimeType,
                        size: doc.size,
                        type: doc.type
                    }
                })
            }

            return user
        })

        return NextResponse.json({
            success: true,
            message: 'Profile submitted for approval',
            user: result
        }, { status: 201 })

    } catch (err: any) {
        console.error("Profile completion error:", err)
        return NextResponse.json(
            { error: err?.message || "Internal Server Error" },
            { status: err.message?.includes("User already exists") ? 400 : 500 }
        )
    }
}
