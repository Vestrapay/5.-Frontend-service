import React from "react";
import {LinkProps} from "next/link";

export type MenuItems = {
    id: number,
    name: string,
    route: string,
    subMenuItems: SubMenuItems[],
    icon: any,
    roles: string[]
}

export type SubMenuItems = {
    id: number,
    name: string,
    route: string,
    roles: string[]
}

export type IconProps = {
    width: number,
    height: number,
    style?: React.CSSProperties
}

export type LayoutProps = {
    children: React.ReactNode
}

export type ActiveLinkProps = LinkProps & {
    children: React.ReactNode,
    activeClassName: string,
    href: string
}

export type RoleProps = {
    role: "USER" | "ADMIN"
}

export type SidebarContextProps = {
    sidebarItems: MenuItems[] | SubMenuItems[],
    setSidebarItems: React.Dispatch<React.SetStateAction<MenuItems[] | SubMenuItems[]>>
}

export type CardProviderProps = "mastercard" | "visa" | "verve"
