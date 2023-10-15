import React from 'react';
import SettingsProfileLayout from "@pages/settings";
import {SettingsNavProps} from "@types";

export const businessNavLinks: SettingsNavProps[] = [
    {
        name: "About",
        href: "/settings/business/about"
    },
    {
        name: "Notifications",
        href: "/settings/business/notifications"
    },
    {
        name: "Security",
        href: "/settings/business/security"
    },
    {
        name: "Payment Method",
        href: "/settings/business/payment-method"
    }
]


const Business = () => {
    return (
        <SettingsProfileLayout navLinks={businessNavLinks} pageName={"Business"}>
        </SettingsProfileLayout>
    );
};

export default Business;