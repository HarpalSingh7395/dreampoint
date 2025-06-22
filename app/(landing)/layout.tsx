import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <section>
                <Header />
                {children}
                <Footer />
            </section>
        </SessionProvider>
    )
}
