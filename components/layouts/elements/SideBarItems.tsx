import { DashHomeIcon, DashUserIcon, DashTransIcon, DashShopIcon, DashReportIcon, DashTerminalIcon } from '@/components/reusables/icons'
import { Storage } from 'Utils/inAppstorage'

const { role } = Storage.getItem("userDetails") || {};

const topMenuItems: any[] = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard',
        subMenuItems: [],
        icon: (prop: any) => <DashHomeIcon prop={prop} />,
        roles: ""
    },
    {
        id: 2,
        name: 'Accounts',
        subMenuItems: [],
        route: '/accounts',
        icon: (prop: any) => <DashReportIcon prop={prop} />,
        roles: "VIEW_ACCOUNTS"
    },
    {
        id: 3,
        name: 'Reports',
        // route: '',
        icon: (prop: any) => <DashTransIcon prop={prop} />,
        // roles: "VIEW_TRANSACTION",
        subMenuItems: [
            { name: 'Transactions', route: '/reports/transactions', role: "" },
            { name: 'Settlement', route: '/reports/settlement', role: ""},
            // { name: 'Settlement Transactions', route: '/reports/settlementTrans', role: ""}
        ],
    },
    {
        id: 4,
        name: 'User Management',
        subMenuItems: [],
        route: '/users',
        icon: (prop: string) => <DashUserIcon prop={prop} />,
        roles: "VIEW_USER"
    },
    {
        id: 5,
        name: 'Institution Management',
        route: '/institution',
        subMenuItems: [],
        icon: (prop: string) => <DashShopIcon prop={prop} />,
        roles: "VIEW_BRANCH"
    },
    {
        id: 6,
        name: 'Bank Management',
        route: '/banks',
        subMenuItems: [],
        icon: (prop: string) => <DashTerminalIcon prop={prop} />,
        roles: "VIEW_TERMINAL"
    }
]


export const userRoles = role;

export const finalMenu = (role: any): any[] => {

    let items = topMenuItems.map((each: any) => { return { ...each, subMenuItems: each.subMenuItems.filter((e: any) => role?.permissions?.find((one: { permissionName: any }) => one.permissionName == e.role) || e.role == "") } })
    return items;//items.filter(e => role?.permissions?.find((one: { permissionName: any }) => one.permissionName == e.roles) || e.roles == "")
}