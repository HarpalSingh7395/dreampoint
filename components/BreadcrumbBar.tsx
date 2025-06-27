"use client"
import React from 'react'
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

export default function BreadcrumbBar() {

    const handleSignOut = () => {
        signOut({
            redirectTo: "/login"
        });
    };


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
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2 transition-colors"
            >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Button>
        </div>
    )
}
