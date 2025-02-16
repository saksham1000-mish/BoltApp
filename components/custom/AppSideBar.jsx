import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import React from "react"
import { Button } from "../ui/button"
import { MessageSquarePlusIcon, SquareChevronLeft } from "lucide-react"
import WorkSpaceHistory from "./WorkspaceHistory"
import SideBarFooter from "./SideBarFooter"
import { useRouter } from "next/navigation"
import { googleLogout } from "@react-oauth/google"



function AppSideBar() {
    const {toggleSidebar}=useSidebar();
    const router = useRouter();

    

    return (
        <Sidebar>
            <SidebarHeader className='p-5'>
                <div className="flex items-center justify-between">
                <Image src={'/logo.svg'} alt="Logo" width={150} height={150} c />
                <SquareChevronLeft onClick={toggleSidebar}
                className="cursor-pointer"/>
                </div>
                <Button onClick={() => router.push('/')} 
                 className='mt-5'><MessageSquarePlusIcon/> Start New Chat</Button>

            </SidebarHeader>
            <SidebarContent className='p-5'>
                <SidebarGroup>
                    <WorkSpaceHistory/>
                </SidebarGroup>
                
            </SidebarContent>
            <SidebarFooter>
                <SideBarFooter/>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSideBar
