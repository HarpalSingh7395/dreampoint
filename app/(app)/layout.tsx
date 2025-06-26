import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
