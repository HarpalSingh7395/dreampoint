import UsersTable from '@/components/admin/UsersTable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function page() {
    return (
        <div className='py-4 px-6' >
            <UsersTable />
        </div >
    )
}
