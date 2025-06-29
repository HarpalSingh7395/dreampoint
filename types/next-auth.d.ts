import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "BASE_USER"
      profileStatus: "INCOMPLETE" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
    } & DefaultSession["user"]
  }

  interface User {
    role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "BASE_USER"
    profileStatus: "INCOMPLETE" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
  }

  interface JWT {
    role?: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "BASE_USER"
    profileStatus?: "INCOMPLETE" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
  }
}
