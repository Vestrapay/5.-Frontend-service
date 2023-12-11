import React from "react";
import { LinkProps } from "next/link";

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

export type AdminContextProps = {
    userType: RoleProps["role"],
    setUserType: React.Dispatch<React.SetStateAction<RoleProps["role"]>>
    userDetail: UserDetailProps,
    setUserDetail: React.Dispatch<React.SetStateAction<UserDetailProps>>
    passDataCTX: any,
    setPassDataCTX: any
}

export type SidebarContextProps = {
    sidebarItems: MenuItems[] | SubMenuItems[],
    setSidebarItems: React.Dispatch<React.SetStateAction<MenuItems[] | SubMenuItems[]>>
}

export type CardProviderProps = "mastercard" | "visa" | "verve"

export type Gender = "MALE" | "FEMALE"

export type UserDetailProps = {
    id?: number,
    uuid?: string,
    country?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    businessName?: string,
    merchantId?: string,
    referralCode?: string,
    userType?: string,
    createdAt?: Date | string,
    updatedAt?: Date | string,
    enabled?: boolean,
    kycCompleted?: boolean,
    username?: string,
    authorities?: any[],
    action?: string,
    address?: string,
    requiredDocuments?: string,
}


export type CreateUserProps = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: Gender | string,
    address: string,
    userRole: string,
}

export type SettingsNavProps = {
    name: string,
    href: string,
    roles?: string[],
}

//Payment gateway

export type PayWithCardProps = {
    id?: number,
    uuid?: string,
    country?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    businessName?: string,
    merchantId?: string,
    referralCode?: string,
    userType?: string,
    createdAt?: Date | string,
    updatedAt?: Date | string,
    enabled?: boolean,
    kycCompleted?: boolean,
    username?: string,
    authorities?: any[],
    action?: string,
    address?: string,
}
