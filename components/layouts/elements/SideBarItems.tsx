import {
    DashHomeIcon,
    DashReportIcon,
    DashShopIcon,
    DashTerminalIcon,
    DashTransIcon,
    DashUserIcon,
    VestraDashAdminIcon,
    VestraDashDisputeLogsIcon,
    VestraDashDocsIcon,
    VestraDashHomeIcon, VestraDashNotificationIcon,
    VestraDashPaymentsIcon, VestraDashSettingsIcon,
    VestraDashTransactionIcon,
    VestraDashUsersIcon
} from '@/components/reusables/icons'
import { Storage } from 'Utils/inAppstorage'
import { IconProps, MenuItems, RoleProps, SubMenuItems } from "@types";


const topMenuItems: MenuItems[] = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard',
        subMenuItems: [],
        icon: (prop: IconProps) => <VestraDashHomeIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 2,
        name: 'Transactions',
        route: '/transactions',
        subMenuItems: [
            {
                id: 1,
                name: "Transactions",
                route: '/transactions',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 2,
                name: "Refunds",
                route: '/transactions/refunds',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 3,
                name: "Chargebacks",
                route: '/transactions/chargebacks',
                roles: ["USER", "ADMIN"]
            }
        ],
        icon: (prop: IconProps) => <VestraDashTransactionIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 3,
        name: 'Admin Payments',
        route: '/admin-payments',
        subMenuItems: [
            {
                id: 1,
                name: "Payment Methods",
                route: '/admin-payments',
                roles: ["ADMIN"]
            },
            {
                id: 2,
                name: "Payment Providers",
                route: '/admin-payments/payment-providers',
                roles: ["ADMIN"]
            },
            {
                id: 3,
                name: "Routing Rules",
                route: '/admin-payments/routing-rules',
                roles: ["ADMIN"]
            }
        ],
        icon: (prop: IconProps) => <VestraDashPaymentsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["ADMIN"]
    },
    {
        id: 4,
        name: 'Payments',
        route: '/payments',
        subMenuItems: [
            {
                id: 1,
                name: "Transfer",
                route: '/payments',
                roles: ["USER"]
            },
            {
                id: 2,
                name: "Card",
                route: '/payments/card',
                roles: ["USER"]
            },
            {
                id: 3,
                name: "Payment Links",
                route: '/payments/payment-links',
                roles: ["USER"]
            },
            {
                id: 4,
                name: "USSD",
                route: '/payments/ussd',
                roles: ["USER"]
            },
            {
                id: 5,
                name: "Settlement",
                route: '/payments/settlement',
                roles: ["USER"]
            },
        ],
        icon: (prop: IconProps) => <VestraDashPaymentsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER"]
    },
    {
        id: 5,
        name: 'Users',
        subMenuItems: [],
        route: '/users',
        icon: (prop: IconProps) => <VestraDashUsersIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER"]
    },
    {
        id: 6,
        name: 'Merchants',
        subMenuItems: [],
        route: '/merchants',
        icon: (prop: IconProps) => <VestraDashUsersIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["ADMIN"]
    },
    {
        id: 7,
        name: 'Admins',
        subMenuItems: [],
        route: '/admins',
        icon: (prop: IconProps) => <VestraDashAdminIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["ADMIN"]
    },
    {
        id: 8,
        name: 'Compliance',
        subMenuItems: [],
        route: '/compliance',
        icon: (prop: IconProps) => <VestraDashDocsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["ADMIN"]
    },
    {
        id: 9,
        name: 'Dispute Logs',
        route: '/dispute-logs',
        subMenuItems: [],
        icon: (prop: IconProps) => <VestraDashDisputeLogsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    // {
    //     id: 6,
    //     name: "Notifications",
    //     route: '/notifications',
    //     subMenuItems: [],
    //     icon: (prop: IconProps) => <VestraDashNotificationIcon width={prop.width} height={prop.height} style={prop.style} />,
    //     roles: ["USER", "ADMIN"]
    // },
    {
        id: 10,
        name: "Settings",
        route: '/settings/profile-settings',
        subMenuItems: [
            {
                id: 1,
                name: 'Profile',
                route: '/settings/profile-settings',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 2,
                name: 'Business',
                route: '/settings/business/about',
                roles: ["USER"]
            },
            {
                id: 4,
                name: "Roles & Permissions",
                route: '/settings/permission',
                roles: ["USER"]
            },
            {
                id: 5,
                name: "API Keys",
                route: '/settings/api-keys',
                roles: ["USER"]
            },
            {
                id: 6,
                name: "Webhook",
                route: '/settings/webhook',
                roles: ["USER"]
            }
        ],
        icon: (prop: IconProps) => <VestraDashSettingsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    }
]


export const userRoles: RoleProps = {
    role: "USER"
}

export const finalMenu = (userRoles: string[]): MenuItems[] => {
    return topMenuItems.map((each: any) => {
        const filteredSubMenuItems = each?.subMenuItems.filter((subItem: MenuItems) => {
            // Check if the sub-item has no roles defined or if any role matches the user's roles.
            return !subItem.roles || subItem.roles.some(role => userRoles.includes(role));
        });

        // Check if the main menu item should be included based on the filtered sub-menu items.
        if (filteredSubMenuItems.length > 0 || !each.roles || each.roles.some((role: any) => userRoles.includes(role))) {
            return { ...each, subMenuItems: filteredSubMenuItems };
        }

        return null; // Exclude main menu item with no matching sub-menu items.
    }).filter(Boolean) as MenuItems[]; // Filter out null values (main menu items without matching sub-menu items).
};
