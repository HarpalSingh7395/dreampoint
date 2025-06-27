import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-react"
import LogoIcon from "./icons/LogoIcon"

export interface NavDataItem {
  title: string;
  url: string;
  items: NavDataItem[];
  isActive?: boolean;
}

export interface NavDataList {
  navMain: NavDataItem[]
}

export function AppSidebar({ data, ...props }: React.ComponentProps<typeof Sidebar> & { data: NavDataList }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex justify-start items-center flex-row">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <LogoIcon variant="base" className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-medium">My Pathshaala</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
