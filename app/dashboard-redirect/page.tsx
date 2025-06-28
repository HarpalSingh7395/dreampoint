import { redirect } from "next/navigation"
import { auth } from "@/auth" 

export default async function DashboardRedirectPage() {
  const session = await auth()

  const role = session?.user?.role
    console.log("Dashboard redirect", role)
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    redirect("/admin/dashboard")
  } else if (role === "BASE_USER") {
    redirect("/complete")
  } else if (role === "STUDENT") {
    redirect("/student/dashboard")
  } else if (role === "TEACHER") {
    redirect("/teacher/dashboard")
  } else {
    redirect("/")
  }
}
