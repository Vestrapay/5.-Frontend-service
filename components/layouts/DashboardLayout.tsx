import React, { useEffect, useContext, useState } from 'react'
import SideBar from './elements/SideBar'
import { LayoutProps } from "@types";
import { SidebarContext } from "@context";
import { finalMenu } from "@/components/layouts/elements/SideBarItems";
import { Storage } from '@utils/inAppstorage';
import router from 'next/router';
import { apiCall } from '@utils/URLs';
import { useAuthContext } from "../../context/AuthContext";

function DashboardLayout({ children }: LayoutProps) {

    const { sidebarItems, setSidebarItems } = useContext(SidebarContext);

    const { userType } = useAuthContext()

    useEffect(() => {
        const topMenuItems = finalMenu([userType])
        setSidebarItems(topMenuItems)
    }, [userType]);

    return (
        <div
            className="flex animate__animated animate__fadeIn w-full min-w-[100vw] min-h-[100vh] h-[100%]  bg-blue-darker items-start justify-start overflow-x-hidden lg:overflow-x-auto xl:overflow-x-hidden">

            {/* Sidebar */}
            <SideBar />
            {/* Main */}
            <main className="w-full min-h-[100vh] bg-dashboard md:pt-0 pt-10 md:ml-[220px] overflow-x-hidden 2xl:flex  2xl:flex-col  2xl:items-center">
                < div className=' w-full max-w-[1800px] min-h-[90vh]' >
                    {children}
                </div >

                <div className="text-gray-900 text-xs font-normal font-['Roboto'] leading-tight tracking-wide text-center mt-5">
                    <p>VestraPay &copy; {new Date().getFullYear()}</p>
                    <p className="text-#D3D3D3-700 p-0 font-normal">VestraPay Nigeria Limited is a Payment Solutions Service Provider(PSSP) duly licenced by the Central Bank of Nigeria(CBN).</p>
                </div>
            </main>
        </div>

    )
}

export default DashboardLayout;
