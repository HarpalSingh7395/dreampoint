"use client"
import { LogOut } from 'lucide-react'
import React, { HTMLAttributes, useState } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react';
import Spinner from '../ui/spinner';
import { cn } from '@/lib/utils';

export default function LogoutButton({ className, variant = "outline", size = "default", ...props}: HTMLAttributes<HTMLButtonElement> & {
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "gradient",
    size?: "default" | "sm" | "lg" | "icon"
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleSignOut = async () => {
        setIsLoading(true)
        await signOut({
            redirectTo: "/login"
        })
        setIsLoading(false)
    }
    return (
        <Button
            variant={variant}
            className={cn("flex items-center space-x-2", className)}
            onClick={handleSignOut}
            size={size}
            {...props   }
        >
            {isLoading ? <Spinner /> : <><LogOut />
                <span>Logout</span></>}
        </Button>
    )
}
