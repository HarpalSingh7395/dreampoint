import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/auth"
import Logo from "./Logo"
import SigninWithGoogleButton from "./auth/SigninWithGoogleButton"
import { IconExclamationCircle } from "@tabler/icons-react"

type LoginFormProps = React.ComponentProps<"div"> & {
  error?: string | null
}

export function LoginForm({ className, error, ...props }: LoginFormProps) {
  let errorMessage: string | null = null

  if (error === "OAuthAccountNotLinked") {
    errorMessage =
      "An account with this email already exists but is linked to a different provider. Please use the correct login method."
  } else if (error === "AccessDenied") {
    errorMessage = "Access was denied. Please contact support."
  } else if (error === "Verification") {
    errorMessage = "The magic link is invalid or has expired. Please try again."
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {errorMessage && (
        <Alert variant="destructive">
          <IconExclamationCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-6">
        <form
          action={async (formData) => {
            "use server"
            await signIn("mailgun", {
              redirectTo: "/dashboard-redirect",
              email: formData.get("email")
            })
          }}
        >
          <div className="flex flex-col items-center gap-2 mb-6">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-12 items-center justify-center rounded-md">
                <Logo className="size-12" />
              </div>
              <span className="sr-only">My Pathshaala</span>
            </a>
            <h1 className="text-xl font-bold">Sign In to My Pathshaala</h1>
            <p className="text-sm text-muted-foreground text-center">
              We use secure magic links and SSO \u2014 no passwords required.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
              <p className="text-xs text-muted-foreground">
                A secure login link will be sent to your inbox.
              </p>
            </div>
            <Button type="submit" variant="gradient" className="w-full">
              Send Magic Link
            </Button>
          </div>
        </form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-1">
          <SigninWithGoogleButton />
        </div>
      </div>
      <div className="text-muted-foreground hover:[a]:*:text-primary text-center text-xs text-balance [a]:*:underline [a]:*:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
