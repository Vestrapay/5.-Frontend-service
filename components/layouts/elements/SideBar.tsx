"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
// import router from 'next/router'
import {useRouter} from 'next/router'
import {Storage} from 'Utils/inAppstorage'
import {Logo} from "@public/assets";
import {MenuItems, SubMenuItems} from "@types";
import ActiveLinks from "@/components/links/activeLinks";
import {useSideBarContext} from "@context";
import {BsArrowLeft} from "react-icons/bs";

function SideBar() {

    const dropdownNavLinks = ["transactions", "payments", "settings"]
    const [selectedSubMenuItem, setSelectedSubMenuItem] = useState<MenuItems | SubMenuItems | null>();


    const [activeLink, setActiveLink] = useState("")

    const router = useRouter();

    const [displayName, setDisplayName] = useState("")

    const {name} = Storage.getItem("merchantDetails") || {}

    const {sidebarItems, setSidebarItems} = useSideBarContext()

    useEffect(() => {
        setDisplayName(name || "")
    }, [name])

    useEffect(() => {
        setActiveLink(router.asPath)
        if (dropdownNavLinks.includes(router.asPath.split("/")[2])) {
            console.log("supposed to reload sidebar")
            sidebarItems.filter((item: MenuItems | SubMenuItems) => {
                if (item.name.toLowerCase() === router.asPath.split("/")[2]) {
                    setSelectedSubMenuItem(prevState => item)
                }
            })
        }
    }, [router.asPath]);


    // const handleDropDown = (itemIndex: number) => {
    //     //check for selected Id
    //     const selectedMenuItems = barItems?.find(
    //         (item: any) => item.id === itemIndex + 1,
    //     )
    //
    //     //check for the menuitem with submenu dropdown and opens or closes it
    //     if (selectedMenuItems?.subMenuItems.length) {
    //         openDropDown.find((id: number) => id === itemIndex + 1)
    //             ? setOpenDropDown((initialArray: any[]) =>
    //                 initialArray.filter((subItem) => subItem !== itemIndex + 1),
    //             ) : setOpenDropDown([selectedMenuItems.id])
    //     }``
    //     setSelectedDropdown(itemIndex)
    // }

    return (
        <>
            {/* Large Side bar */}
            <aside
                className="min-h-[100vh] h-[100%] pt-8 pb-10 xl:h-full bg-white lg:drop-shadow-lg drop-shadow-lg z-50 lg:inset-x-auto inset-x-0 lg:inset-y-0 | self-start top-0 w-[218px] relative flex"
            >
                <div className='px-5 w-full flex flex-col gap-1 overflow-y-auto text-slate-500 font-medium'>
                    <div className="w-full justify-center flex">
                        <Image src={Logo} alt="vestrapay" width={92} height={92}/>
                    </div>
                    {
                        dropdownNavLinks.includes(activeLink.split("/")[2])
                        && selectedSubMenuItem
                            ? (
                                <div className="relative text-base">
                                    <div
                                        onClick={() => setSelectedSubMenuItem(null)}
                                        className="flex items-center gap-2 text-xs cursor-pointer"
                                    >
                                        <BsArrowLeft className="font-bold"/>
                                        <p>Main Menu</p>
                                    </div>
                                    <p className="text-selected text-base my-2">{selectedSubMenuItem.name}</p>
                                    {
                                        selectedSubMenuItem?.subMenuItems?.map((item: SubMenuItems, index: number) => (
                                            <div className="relative text-base">
                                                {
                                                    activeLink === item.route
                                                        ?
                                                        <p className="absolute -right-3 top-2.5 w-7 h-[1px] bg-selected my-2"/>
                                                        : null
                                                }
                                                {
                                                    <>
                                                        <ActiveLinks
                                                            key={index}
                                                            href={item.route}
                                                            activeClassName="text-selected">
                                                            <div
                                                                className={`w-full flex flex-row justify-start pl-5 items-center rounded-lg cursor-pointer text-base`}>
                                                                <p className='my-2'>{item?.name}</p>
                                                            </div>
                                                        </ActiveLinks>
                                                    </>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            sidebarItems?.map((item: MenuItems | SubMenuItems, index: number) => (
                                <div className="relative text-base">
                                    {
                                        activeLink === item.route
                                            ?
                                            <p className="absolute -left-5 w-10 h-full -top-4 bottom-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-60 "/>
                                            : item?.subMenuItems?.find((subItem: SubMenuItems) => activeLink === subItem.route) ?
                                                <p className="absolute right-0 w-10 h-1 -top-4 bottom-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-60 "/> : null
                                    }
                                    {
                                        <>
                                            <ActiveLinks
                                                // onClick={
                                                //     item?.subMenuItems
                                                //         ? setSidebarItems(item?.subMenuItems)
                                                //         : () => router.push(item.route)
                                                // }
                                                key={index}
                                                href={item.route}
                                                activeClassName="text-selected font-bold">
                                                <div
                                                    className={`w-full flex flex-row justify-between gap-6 items-center rounded-lg cursor-pointer`}>
                                                    <div className='flex gap-2 items-center'>
                                                        <div className='min-w-max'>
                                                            {item?.icon && item?.icon(
                                                                {
                                                                    width: 24,
                                                                    height: 24,

                                                                })
                                                            }
                                                        </div>
                                                        <p className='font-300 text-sm min-w-max'>{item?.name}</p>
                                                    </div>
                                                </div>
                                            </ActiveLinks>
                                        </>
                                    }
                                </div>
                            ))

                    }
                </div>
            </aside>
        </>
    )
}

export default SideBar;