import NextAuth, { DefaultSession } from "next-auth"
import Mailgun from "next-auth/providers/mailgun"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"
import type { NextAuthConfig } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT"
    } & DefaultSession["user"]
  }

  interface User {
    role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT"
  }

  interface JWT {
    role?: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT"
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Mailgun({
      from: "test@sandbox2ebecabb31ab4e5595ae9e264095a200.mailgun.org",
    }),
    Google,
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Only on initial sign-in
      if (user) {
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as "ADMIN" | "TEACHER" | "STUDENT"
      }
      return session
    },

    authorized: async ({ request, auth }) => {
      const isAdmin = auth?.user?.role === "ADMIN" || auth?.user?.role === "SUPER_ADMIN"
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

      if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }

      return !!auth?.user
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
} satisfies NextAuthConfig)
