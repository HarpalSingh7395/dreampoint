import { auth } from "@/auth" // your Auth.js config
import { NextResponse } from "next/server"
import { prisma } from "@/prisma"
import { DocumentType } from "@prisma/client"

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      documents: {
        where: { type: DocumentType.PROFILE_PICTURE },
        take: 1
      }
    }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({
    user: {
      name: user.name,
      email: user.email
    },
    profilePicture: user.documents[0] || null
  })
}
