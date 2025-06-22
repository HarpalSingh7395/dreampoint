import NextAuth from "next-auth"
import Mailgun from "next-auth/providers/mailgun"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [Mailgun({
    from: "test@sandbox2ebecabb31ab4e5595ae9e264095a200.mailgun.org",
  }), Google],
  pages: {
    signIn: "/login",
    signOut: "/login",
  }
})