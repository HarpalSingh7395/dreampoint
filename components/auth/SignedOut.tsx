// import { auth } from '@/auth'
import { auth } from '@/auth';
import React, { ReactNode } from 'react'

export default async function SignedOut({ children }: { children: ReactNode }) {
    const session = await auth();
    if(session) return null;
    return (
        <>
            {children}
        </>
    )
}
