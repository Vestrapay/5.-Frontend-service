import {
    DashHomeIcon,
    DashReportIcon,
    DashShopIcon,
    DashTerminalIcon,
    DashTransIcon,
    DashUserIcon,
    VestraDashDisputeLogsIcon,
    VestraDashHomeIcon, VestraDashNotificationIcon,
    VestraDashPaymentsIcon, VestraDashSettingsIcon,
    VestraDashTransactionIcon,
    VestraDashUsersIcon
} from '@/components/reusables/icons'
import {Storage} from 'Utils/inAppstorage'
import {IconProps, MenuItems, RoleProps, SubMenuItems} from "@types";


const { role } = Storage.getItem("userDetails") || {};

const topMenuItems: MenuItems[] = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard',
        subMenuItems: [],
        icon: (prop: IconProps) => <VestraDashHomeIcon width={prop.width} height={prop.height} style={prop.style}/>,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 2,
        name: 'Users',
        subMenuItems: [],
        route: '/dashboard/users',
        icon: (prop: IconProps) => <VestraDashUsersIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["ADMIN"]
    },
    {
        id: 3,
        name: 'Transactions',
        route: '/dashboard/transactions',
        subMenuItems: [
            {
                id: 1,
                name: "Transactions",
                route: '/dashboard/transactions',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 2,
                name: "Refunds",
                route: '/dashboard/transactions/refunds',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 3,
                name: "Chargebacks",
                route: '/dashboard/transactions/chargebacks',
                roles: ["USER", "ADMIN"]
            }
        ],
        icon: (prop: IconProps) => <VestraDashTransactionIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 4,
        name: 'Payments',
        route: '/dashboard/payments',
        subMenuItems: [
            {
                id: 1,
                name: "Transfer",
                route: '/dashboard/payments',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 2,
                name: "Card",
                route: '/dashboard/payments/card',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 3,
                name: "Payment Links",
                route: '/dashboard/payments/payment-links',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 4,
                name: "USSD",
                route: '/dashboard/payments/ussd',
                roles: ["USER", "ADMIN"]
            }
        ],
        icon: (prop: IconProps) => <VestraDashPaymentsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 5,
        name: 'Dispute Logs',
        route: '/dashboard/dispute-logs',
        subMenuItems: [],
        icon: (prop: IconProps) => <VestraDashDisputeLogsIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 6,
        name: "Notifications",
        route: '/dashboard/notifications',
        subMenuItems: [],
        icon: (prop: IconProps) => <VestraDashNotificationIcon width={prop.width} height={prop.height} style={prop.style} />,
        roles: ["USER", "ADMIN"]
    },
    {
        id: 7,
        name: "Settings",
        route: '/dashboard/settings',
        subMenuItems: [
            {
                id: 1,
                name: 'Profile',
                route: '/dashboard/settings',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 2,
                name: 'Business',
                route: '/dashboard/settings/business',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 3,
                name: "Settlement",
                route: '/dashboard/settings/settlement',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 4,
                name: "Permission",
                route: '/dashboard/settings/permission',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 5,
                name: "API Keys",
                route: '/dashboard/settings/api-keys',
                roles: ["USER", "ADMIN"]
            },
            {
                id: 6,
                name: "Webhook",
                route: '/dashboard/settings/webhook',
                roles: ["USER", "ADMIN"]
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
    return topMenuItems.map((each: MenuItems | SubMenuItems) => {
        const filteredSubMenuItems = each?.subMenuItems.filter((subItem: MenuItems) => {
            // Check if the sub-item has no roles defined or if any role matches the user's roles.
            return !subItem.roles || subItem.roles.some(role => userRoles.includes(role));
        });

        // Check if the main menu item should be included based on the filtered sub-menu items.
        if (filteredSubMenuItems.length > 0 || !each.roles || each.roles.some(role => userRoles.includes(role))) {
            return { ...each, subMenuItems: filteredSubMenuItems };
        }

        return null; // Exclude main menu item with no matching sub-menu items.
    }).filter(Boolean) as MenuItems[]; // Filter out null values (main menu items without matching sub-menu items).
};
