import { sendMailgunEmail } from "@/lib/mailgun"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

const FROM_EMAIL = `Team My Pathshaala <${process.env.MAILGUN_FROM_ADDRESS}>`

export async function POST(req: Request) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id },
    data: { profileStatus: "APPROVED" },
  })

  if (!user?.email) {
    return NextResponse.json({ error: "User email not found" }, { status: 400 })
  }

  const html = `
    <div style="background-color:#f4f4f7; font-family:'Segoe UI', Tahoma, sans-serif; padding:40px 0;">
      <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.1);">
        <div style="background:linear-gradient(90deg,#6366f1,#8b5cf6);padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;">My Pathshaala</h1>
        </div>
        <div style="padding:30px;">
          <h2 style="color:#111827;">🎉 Your Profile is Approved!</h2>
          <p style="color:#4b5563;">Hi ${user.name || "there"},</p>
          <p style="color:#4b5563;">
            We're excited to let you know that your profile has been <strong style="color:#10b981;">approved</strong>.
            One of our team members will connect with you shortly.
          </p>
          <p style="color:#4b5563;">
            In the meantime, you can log in to your dashboard and begin your journey with My Pathshaala.
          </p>
          <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/"
               style="background-color:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
              Go to Dashboard
            </a>
          </div>
          <p style="color:#6b7280;font-size:14px;">If you have any questions, just reply to this email. We're here to help you.</p>
          <p style="margin-top:30px;color:#111827;">Warm regards,<br/>The My Pathshaala Team</p>
        </div>
        <div style="background:#f9fafb;text-align:center;padding:16px;font-size:12px;color:#9ca3af;">
          © ${new Date().getFullYear()} My Pathshaala. All rights reserved.
        </div>
      </div>
    </div>
  `

  const { success, error } = await sendMailgunEmail({
    to: user.email,
    subject: "🎉 Your Profile Has Been Approved!",
    html,
    text: `Hi ${user.name || "there"}, your profile has been approved. Login at ${process.env.NEXT_PUBLIC_APP_URL}/dashboard.`,
  })

  if (!success) {
    console.error("Mailgun error:", error)
    return NextResponse.json({ error: "User approved, but email failed to send" }, { status: 500 })
  }

  return NextResponse.json({ message: "User approved and email sent" })
}
