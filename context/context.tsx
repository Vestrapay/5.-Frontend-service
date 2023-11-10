"use client"

import React, {createContext, useContext, useState} from 'react';
import {MenuItems, SidebarContextProps, SubMenuItems} from "@types";

export const SidebarContext = createContext<SidebarContextProps>({
    sidebarItems: [],
    setSidebarItems: (): MenuItems[] | SubMenuItems => []
});

export const Context = ({children}: { children: React.ReactNode }) => {

    const [sidebarItems, setSidebarItems] = useState<MenuItems[] | SubMenuItems[]>([]);

    return (
        <SidebarContext.Provider value={{sidebarItems, setSidebarItems}}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSideBarContext = () => useContext(SidebarContext);