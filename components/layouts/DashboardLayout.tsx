import React, { useEffect, useContext, useState } from 'react'
import SideBar from './elements/SideBar'
import { LayoutProps } from "@types";
import { SidebarContext } from "@context";
import { finalMenu } from "@/components/layouts/elements/SideBarItems";
import { Storage } from '@utils/inAppstorage';
import router from 'next/router';
import { apiCall } from '@utils/URLs';
import {useAuthContext} from "../../context/AuthContext";

function DashboardLayout({ children }: LayoutProps) {

    const { sidebarItems, setSidebarItems } = useContext(SidebarContext);

    const {userType} = useAuthContext()

    useEffect(() => {
        const topMenuItems = finalMenu([userType])
        setSidebarItems(topMenuItems)
    }, []);

    return (
        <div
            className="flex animate__animated animate__fadeIn w-full min-w-[100vw] min-h-[100vh] h-[100%]  bg-blue-darker items-start justify-start overflow-x-hidden lg:overflow-x-auto xl:overflow-x-hidden">

            {/* Sidebar */}
            <SideBar />
            {/* Main */}
            <main className="w-full min-h-[100vh] bg-dashboard md:pt-0 pt-10 md:ml-[220px] overflow-x-hidden 2xl:flex  2xl:flex-col  2xl:items-center">
                < div className=' w-full max-w-[1800px] ' >
                    {children}
                </div >
            </main>
        </div>

    )
}

export default DashboardLayout;