import NextAuth from "next-auth"
import Mailgun from "next-auth/providers/mailgun"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"
import type { NextAuthConfig } from "next-auth"
import { ProfileStatus, Role } from "@prisma/client"


export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Mailgun({
      from: process.env.MAILGUN_FROM_ADDRESS,
    }),
    Google,
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // Only on initial sign-in
      if (user) {
        token.role = user.role
        token.profileStatus = user.profileStatus
      }
      if(trigger == "update" && session) {
        if(session?.role) token.role = session?.role
        if(session?.profileStatus) token.profileStatus = session?.profileStatus
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as Role
        session.user.profileStatus = token.profileStatus as ProfileStatus
      }
      return session
    },

    authorized: async ({ request, auth }) => {
      const isAdmin = auth?.user?.role === "ADMIN" || auth?.user?.role === "SUPER_ADMIN"
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

      // ✅ Redirect incomplete profiles to /admin/complete
      if (auth?.user.role == "BASE_USER" && auth?.user?.profileStatus === "INCOMPLETE" && !request.nextUrl.pathname.startsWith("/complete")) {
        return NextResponse.redirect(new URL("/complete", request.url))
      }

      // ✅ Redirect users with PENDING_APPROVAL status to /pending-approval
      if (auth?.user?.profileStatus === "PENDING_APPROVAL" && !request.nextUrl.pathname.startsWith("/pending-approval")) {
        return NextResponse.redirect(new URL("/pending-approval", request.url))
      }

      // ✅ Prevent non-admins from accessing admin routes
      if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }


      return !!auth?.user
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/complete",
    verifyRequest: "/verify-request"
  },
} satisfies NextAuthConfig)
