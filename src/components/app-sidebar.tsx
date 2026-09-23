import { BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem ,SidebarFooter } from "@/components/ui/sidebar";

import { currentUser } from "@/lib/mock-data-vars";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  // { title: "ตารางเรียน", url: "/schedule", icon: Calendar },    501 not implemented
  // { title: "ตั้งค่า", url: "/settings", icon: Settings },        501 not implemented
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ✅ แก้ไข: Base UI ใช้ `render={<Link />}` แทน `asChild` */}
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className= "flex">
            <Avatar size="lg">
              <AvatarImage src={currentUser.avatar} alt="@shadcn" className="" />
              <AvatarFallback>Us</AvatarFallback>
            </Avatar>
            <div className= "flex-col">
              <div>{currentUser.nickname}</div>
              <Badge>{currentUser.role}</Badge>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
