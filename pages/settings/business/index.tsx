import React from 'react';
import SettingsProfileLayout from "@pages/settings";
import {SettingsNavProps} from "@types";

export const businessNavLinks: SettingsNavProps[] = [
    {
        name: "About",
        href: "/settings/business/about",
        roles: ["USER"]
    },
    {
        name: "Settlement",
        href: "/settings/business/settlement",
        roles: ["USER"]
    },
    {
        name: "Notifications",
        href: "/settings/business/notifications",
        roles: ["USER"]
    },
    {
        name: "Security",
        href: "/settings/business/security",
        roles: ["USER"]
    },
    {
        name: "Payment Method",
        href: "/settings/business/payment-method",
        roles: ["USER"]
    }
]

    // settlementTime settlementDuration settlement

const Business = () => {
    return (
        <SettingsProfileLayout navLinks={businessNavLinks} pageName={"Business"}>
        </SettingsProfileLayout>
    );
};

export default Business;