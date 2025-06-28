// app/login/page.tsx
import { LoginForm } from "@/components/LoginForm"

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm error={searchParams.error} />
      </div>
    </div>
  )
}
