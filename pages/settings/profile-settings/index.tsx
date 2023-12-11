import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { LayoutProps, SettingsNavProps } from "@types";
import ActiveLinks from "@/components/links/activeLinks";
import ProfileSettings from './profile-settings';
import { useAuthContext } from 'context/AuthContext';

const navItems: SettingsNavProps[] = [
    {
        name: "Profile Settings",
        href: "/settings/profile-settings",
        roles: ["USER", "ADMIN"]
    },
    {
        name: "Update KYC",
        href: "/settings/profile-settings/update-kyc",
        roles: ["USER"]
    },
    {
        name: "Password",
        href: "/settings/profile-settings/password",
        roles: ["USER", "ADMIN"]
    },
    // {
    //     name: "Change PIN",
    //     href: "/settings/profile-settings/change-pin"
    // },
    // {
    //     name: "Reset PIN",
    //     href: "/settings/profile-settings/reset-pin"
    // }
]

const SettingsProfileLayout = ({ children, navLinks, pageName = "Profile" }: {
    children: React.ReactNode,
    navLinks?: SettingsNavProps[],
    pageName?: string
}) => {

    const { userType } = useAuthContext()

    const [userTypeValue, setUserTypeValue] = useState("USER")

    useEffect(() => {
        setUserTypeValue(userType)
        console.log(navItems.filter((each: any, i: any) => each?.roles.includes(userTypeValue)))
    }, [userType])

    
    return (
        <DashboardLayout>
            <main
                className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-auto transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
            >
                <header className="flex items-center justify-start">
                    <h1 className="text-2xl font-medium">
                        Settings - {pageName}
                    </h1>
                </header>
                <div
                    className="rounded-md bg-white h-full py-3 px-3 md:px-16 w-full"
                >
                    <nav
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #F0F0F0"
                        }}
                        className="h-full w-full flex rounded-md px-10 overflow-x-scroll lg:overflow-x-hidden scrollbar-hide"
                    >
                        <ul className="list-none p-0 flex gap-10 w-full min-w-max">
                            {
                                navLinks ? navLinks.filter((each: any, i: any) => each?.roles.includes(userTypeValue))
                                    .map((item, index) => (
                                    <li
                                        key={index}
                                        className='w-full min-w-max'
                                    >
                                        <ActiveLinks
                                            href={item.href}
                                            activeClassName="text-selected"
                                        >
                                            <span className='min-w-max w-full'>
                                                {item.name}
                                            </span>
                                        </ActiveLinks>
                                    </li>
                                )
                                ) : navItems && navItems.filter((each: any, i: any) => each?.roles.includes(userTypeValue))
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        className='w-full min-w-max'
                                    >
                                        <ActiveLinks
                                            href={item.href}
                                            activeClassName="text-selected"
                                        >
                                            <span className='min-w-max w-full'>
                                                {item.name}
                                            </span>
                                        </ActiveLinks>
                                    </li>
                                )
                                )}
                        </ul>
                    </nav>
                    <div className="mt-10">
                        {children || <ProfileSettings />}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default SettingsProfileLayout;