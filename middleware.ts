export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/teacher/:path*", "/complete", "/pending-approval", "/dashboard-redirect"], // run only on protected pages
}