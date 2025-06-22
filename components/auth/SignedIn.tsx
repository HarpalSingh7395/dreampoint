import { auth } from '@/auth';
import React, { ReactNode } from 'react'

export default async function SignedIn({ children }: { children: ReactNode }) {
    const session = await auth();
    if(!session) return null;
    return (
        <>
            {children}
        </>
    )
}
