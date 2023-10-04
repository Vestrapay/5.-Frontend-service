import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { LayoutProps, SettingsNavProps } from "@types";
import ActiveLinks from "@/components/links/activeLinks";
import ProfileSettings from './profile-settings';

const navItems: SettingsNavProps[] = [
    {
        name: "Profile Settings",
        href: "/settings/profile-settings"
    },
    {
        name: "Update KYC",
        href: "/settings/profile-settings/update-kyc"
    },
    {
        name: "Password",
        href: "/settings/profile-settings/password"
    },
    {
        name: "Change PIN",
        href: "/settings/profile-settings/change-pin"
    },
    {
        name: "Reset PIN",
        href: "/settings/profile-settings/reset-pin"
    }
]

const SettingsProfileLayout = ({ children, navLinks, pageName = "Profile" }: {
    children: React.ReactNode,
    navLinks?: SettingsNavProps[],
    pageName?: string
}) => {
    return (
        <DashboardLayout>
            <main
                className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
            >
                <header className="flex items-center justify-start">
                    <h1 className="text-2xl font-medium">
                        Settings - {pageName}
                    </h1>
                </header>
                <div
                    className="rounded-md bg-white h-full py-3 px-16 w-full"
                >
                    <nav
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #F0F0F0"
                        }}
                        className="h-full w-full flex rounded-md px-10"
                    >
                        <ul className="list-none p-0 flex justify-between w-full">
                            {
                                navLinks ? navLinks.map((item, index) => (
                                    <li
                                        key={index}
                                    >
                                        <ActiveLinks
                                            href={item.href}
                                            activeClassName="text-selected"
                                        >
                                            <span>
                                                {item.name}
                                            </span>
                                        </ActiveLinks>
                                    </li>
                                )
                                ) : navItems.map((item, index) => (
                                    <li
                                        key={index}
                                    >
                                        <ActiveLinks
                                            href={item.href}
                                            activeClassName="text-selected"
                                        >
                                            <span>
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