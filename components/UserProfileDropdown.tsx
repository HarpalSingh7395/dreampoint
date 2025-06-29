"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { storage } from "@/lib/appwrite"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LifeBuoy, LogOut } from "lucide-react"

const UserAvatarDropdown = () => {
  const { data, status } = useSession()
  const [profileImageUrl, setProfileImageUrl] = useState<string>()

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/me")
      const data = await res.json()

      if (data?.profilePicture?.fileId && data?.profilePicture?.path) {
        const fileUrl = storage.getFileView(data.profilePicture.path, data.profilePicture.fileId)
        console.log({fileUrl})
        setProfileImageUrl(fileUrl)
      }
    }

    fetchProfile()
  }, [])

  const user = data?.user
  if (status === "loading" || !user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer">
          <AvatarImage src={profileImageUrl || ""} alt={user.name || ""} />
          <AvatarFallback className="bg-blue-500 text-white">
            {user.name?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Go to profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Go to settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectTo: "/login" })} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatarDropdown
