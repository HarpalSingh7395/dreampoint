"use client"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Clock, Mail, LogOut } from "lucide-react"
import { signOut } from "next-auth/react" // Assuming you're using next-auth
import Link from "next/link"

export default function ApprovalPending() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-indigo-200 bg-white pt-0 pb-0">
        <CardHeader className=" bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500 p-6 rounded-t-2xl">
          <div className="flex flex-col items-center space-y-3">
            <Clock className="h-12 w-12 text-white" />
            <h1 className="text-2xl font-bold text-white text-center">
              Approval Pending
            </h1>
            <p className="text-sm text-indigo-100 text-center">
              Your profile is under review
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-indigo-900">{`What's happening now?`}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our team is reviewing your profile. This usually takes 1–2 business days.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Bell className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-indigo-900">What happens next?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {`You'll receive an email notification once your profile is approved. Then you can access all features.`}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 p-6 flex flex-col sm:flex-row sm:justify-between gap-3 rounded-b-2xl">
          <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 w-full sm:w-auto" asChild>
            <Link href={"mailto:support@mypathshaala.com"}>
              Contact Support
            </Link>
          </Button>
          <Button
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50 w-full sm:w-auto"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
