"use client"
import { AppSidebar, NavDataList } from "@/components/app-sidebar"
import BreadcrumbBar from "@/components/BreadcrumbBar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"

const data = {
    navMain: [
        {
            title: "Admin",
            url: "#",
            items: [
                {
                    title: "Dashboard",
                    url: "/student/dashboard",
                },
            ],
        },
    ],
} as NavDataList;

export default function Page({ children }: { children: ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar data={data} />
            <SidebarInset>
                <BreadcrumbBar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
