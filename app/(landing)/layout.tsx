import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <section className=' bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
                <Header />
                {children}
                <Footer />
            </section>
        </SessionProvider>
    )
}
