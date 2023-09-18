"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
// import router from 'next/router'
import {useRouter} from 'next/router'
import {Storage} from 'Utils/inAppstorage'
import {Logo, ProfileImage3} from "@public/assets";
import {MenuItems, SubMenuItems} from "@types";
import ActiveLinks from "@/components/links/activeLinks";
import {useSideBarContext} from "@context";
import {BsArrowLeft} from "react-icons/bs";
import {motion} from "framer-motion";
import {ExchangeRectangle, LogoutOpen} from "react-huge-icons/bulk";
import {userRoles} from "@/components/layouts/elements/SideBarItems";

function SideBar() {

    const dropdownNavLinks = ["transactions", "payments", "settings"]
    const [selectedSubMenuItem, setSelectedSubMenuItem] = useState<MenuItems | SubMenuItems | null>();

    const [isSubCategorySelected, setIsSubCategorySelected] = useState(false)

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
                    setIsSubCategorySelected(true)
                }
            })
        }
    }, [router.asPath]);


    return (
        <>
            {/* Large Side bar */}
            <aside
                className="min-h-[100vh] h-[100%] pt-8 pb-10 xl:h-full bg-white lg:drop-shadow-lg drop-shadow-lg z-50 lg:inset-x-auto inset-x-0 lg:inset-y-0 | self-start top-0 w-[250px] relative flex transition-all duration-300 ease-in-out"
            >
                <div className='px-5 w-full flex flex-col gap-1 overflow-y-auto text-slate-500 font-medium'>
                    <div className="w-full justify-center flex">
                        <Image src={Logo} alt="vestrapay" width={92} height={92}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            dropdownNavLinks.includes(activeLink.split("/")[2])
                            && selectedSubMenuItem && isSubCategorySelected
                                ? (
                                    <div className="relative text-base">
                                        <motion.div
                                            whileTap={{scale: 0.9}}
                                            onClick={() => {
                                                setSelectedSubMenuItem(prevState => null)
                                                setIsSubCategorySelected(prevState => false)
                                            }}
                                            className="flex items-center gap-2 text-xs cursor-pointer"
                                        >
                                            <BsArrowLeft className="font-bold"/>
                                            <p>Main Menu</p>
                                        </motion.div>
                                        <p className="text-selected text-base my-2">{selectedSubMenuItem.name}</p>
                                        {
                                            selectedSubMenuItem?.subMenuItems?.map((item: SubMenuItems, index: number) => (
                                                <div className="relative text-base">

                                                    {
                                                        <motion.div
                                                            whileHover={{scale: 1.05}}
                                                            whileTap={{scale: 0.9}}
                                                            className="flex transition-all duration-300 ease-in-out">
                                                            <ActiveLinks
                                                                key={index}
                                                                href={item.route}
                                                                activeClassName="text-selected">
                                                                <div
                                                                    className={`w-full flex flex-1 flex-row justify-start pl-5 items-center rounded-lg cursor-pointer text-base`}>
                                                                    <p className='my-2 w-full whitespace-nowrap'>{item?.name}</p>
                                                                </div>
                                                            </ActiveLinks>
                                                            {activeLink === item.route
                                                                &&
                                                                <p className="flex w-full h-[1px] bg-selected items-center justify-center mt-5 ml-0.5"/>}
                                                        </motion.div>
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
                                                &&
                                                <p
                                                    className="absolute -left-5 w-10 h-full -top-4 bottom-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-60 "
                                                />
                                        }
                                        {
                                            <>
                                                <ActiveLinks
                                                    key={index}
                                                    href={item.route}
                                                    activeClassName="text-selected font-bold">
                                                    <div
                                                        className={`w-full flex flex-row justify-between gap-6 items-center rounded-lg cursor-pointer`}>
                                                        <motion.div
                                                            whileHover={{scale: 1.1}}
                                                            whileTap={{scale: 0.9}}
                                                            className='flex gap-2 items-center transition-all duration-300 ease-in-out'
                                                        >
                                                            <div

                                                                className='min-w-max'
                                                            >
                                                                {item?.icon && item?.icon(
                                                                    {
                                                                        width: 24,
                                                                        height: 24,

                                                                    })
                                                                }
                                                            </div>
                                                            <p className='font-300 text-sm my-2'>{item?.name}</p>
                                                        </motion.div>
                                                    </div>
                                                </ActiveLinks>
                                            </>
                                        }
                                    </div>
                                ))

                        }
                    </div>
                    <div className="absolute flex h-[1px] w-full bg-slate-300 left-0 top-[450px]"/>
                    <motion.div
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        className="absolute flex gap-2 items-center top-[450px] cursor-pointer">
                        <ExchangeRectangle style={{width: 24, height: 24}}/>
                        <p className="text-sm text-slate-500">Migrate to <br/><span
                            className="font-bold">Production</span></p>
                    </motion.div>
                    <div className="absolute flex gap-2 items-center bottom-8">
                        <Image src={ProfileImage3} alt={"profile"}
                               className="rounded-2xl bg-rose-300 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                        />
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-xs text-slate-900 font-bold my-0">Omonigho Isaiah</p>
                            <p className="text-xs text-slate-500 uppercase my-0">T23456 - USER</p>
                        </div>
                        <LogoutOpen style={{width: 24, height: 24}} className="text-selected cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:text-ultraMarine"/>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideBar;