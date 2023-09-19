import React, {useEffect, useContext} from 'react'
import SideBar from './elements/SideBar'
import {LayoutProps} from "@types";
import {SidebarContext} from "@context";
import {finalMenu} from "@/components/layouts/elements/SideBarItems";

function DashboardLayout({children}: LayoutProps) {

    const {sidebarItems, setSidebarItems} = useContext(SidebarContext);

    useEffect(() => {
        const role = ["ADMIN"]
        const topMenuItems = finalMenu(role)
        setSidebarItems(topMenuItems)
    }, []);

    return (
        <div
            className="flex animate__animated animate__fadeIn w-full min-w-[100vw] min-h-[100vh] h-[100%]  bg-blue-darker items-start justify-start overflow-x-hidden lg:overflow-x-auto xl:overflow-x-hidden">

            {/* Sidebar */}
            <SideBar/>
            {/* Main */}
            <main className="w-full max-h-screen bg-dashboard ml-[220px]">
                {children}
            </main>
        </div>

    )
}

export default DashboardLayout