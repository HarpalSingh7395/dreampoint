"use client"
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import UserAvatarDropdown from './UserProfileDropdown'

export default function BreadcrumbBar() {
  const pathname = usePathname()
  
  const handleSignOut = () => {
    signOut({
      redirectTo: "/login"
    });
  };

  // Function to format path segments into readable labels
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    
    // If we're at the root, show a default breadcrumb
    if (pathSegments.length === 0) {
      return [
        <BreadcrumbItem key="home">
          <BreadcrumbPage>Home</BreadcrumbPage>
        </BreadcrumbItem>
      ]
    }

    const breadcrumbs: ReactNode[] = []
    let currentPath = ''

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      const label = formatSegment(segment)

      if (isLast) {
        // Last item should be a page (non-clickable)
        breadcrumbs.push(
          <BreadcrumbItem key={currentPath}>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        )
      } else {
        // Other items should be links
        breadcrumbs.push(
          <BreadcrumbItem key={currentPath} className="hidden md:block">
            <BreadcrumbLink href={currentPath}>
              {label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
        
        // Add separator after each item except the last
        breadcrumbs.push(
          <BreadcrumbSeparator key={`sep-${currentPath}`} className="hidden md:block" />
        )
      }
    })

    return breadcrumbs
  }

  return (
    <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className='flex gap-2 items-center shrink-0'>
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {generateBreadcrumbs()}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* <Button
        variant="outline"
        size="sm"
        onClick={handleSignOut}
        className="flex items-center space-x-2 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </Button> */}
      <UserAvatarDropdown />
    </div>
  )
}