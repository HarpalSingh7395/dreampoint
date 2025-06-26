import { ID, storage } from "@/lib/appwrite"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        // Extract user data
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

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser && existingUser.profileStatus !== 'INCOMPLETE') {
            return NextResponse.json(
                { error: "User already exists with completed profile" },
                { status: 400 }
            )
        }

        // Create/update user
        const userData = {
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
            role: userType === 'teacher' ? 'TEACHER' : 'STUDENT',
            profileStatus: 'PENDING_APPROVAL'
        } as {
            readonly name: string;
            readonly email: string;
            readonly phoneNumber: string;
            readonly age: number;
            readonly address: string;
            readonly city: string;
            readonly state: string;
            readonly zipCode: string;
            readonly qualification: string;
            readonly institution: string;
            readonly currentGrade: string | null;
            readonly subjects: string;
            readonly experience: number | null;
            readonly hourlyRate: number | null;
            readonly specialization: string | null;
            readonly availability: string | null;
            readonly bio: string | null;
            readonly teachingGrades: string | null;
            readonly role: "TEACHER" | "STUDENT";
            readonly profileStatus: "PENDING_APPROVAL";
        }

        const user = existingUser
            ? await prisma.user.update({ where: { email }, data: userData })
            : await prisma.user.create({ data: userData })

        // Process documents based on user type
        const documentTypes = userType === 'teacher'
            ? [
                { field: 'governmentId', type: 'GOVERNMENT_ID' },
                { field: 'educationCerts', type: 'EDUCATION_CERT' },
                { field: 'resume', type: 'RESUME' },
                { field: 'experienceCerts', type: 'EXPERIENCE_CERT' },
                { field: 'policeVerification', type: 'POLICE_VERIFICATION' }
            ]
            : [
                { field: 'studentId', type: 'STUDENT_ID' },
                { field: 'reportCard', type: 'REPORT_CARD' },
                { field: 'parentId', type: 'PARENT_ID' }
            ]

        for (const docType of documentTypes) {
            const file = formData.get(docType.field) as File | null
            if (file && file.size > 0) {

                // Upload to Appwrite
                const uploadedFile = await storage.createFile(
                    process.env.APPWRITE_BUCKET_ID!,
                    ID.unique(),
                    file
                )

                // Create document record
                await prisma.document.create({
                    data: {
                        userId: user.id,
                        name: docType.type,
                        path: process.env.APPWRITE_BUCKET_ID!,
                        fileId: uploadedFile.$id,
                        mimeType: file.type,
                        size: file.size,
                        type: docType.type
                    }
                })
            }
        }

        // Send approval notification to admin
        // await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
        //     from: `Pathshaala Notifications <notifications@${process.env.MAILGUN_DOMAIN!}>`,
        //     to: [process.env.ADMIN_EMAIL!],
        //     subject: `New ${userType} Profile Awaiting Approval`,
        //     text: `A new ${userType} profile has been submitted for approval.\n\n` +
        //         `Name: ${fullName}\n` +
        //         `Email: ${email}\n` +
        //         `View in admin panel: ${process.env.ADMIN_URL}/users/${user.id}\n\n` +
        //         `Please review and approve or reject this profile.`
        // })

        return NextResponse.json({
            success: true,
            message: 'Profile submitted for approval',
            user
        }, { status: 201 })

    } catch (err) {
        console.error("Profile completion error:", err)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
