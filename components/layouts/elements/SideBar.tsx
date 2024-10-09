"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import router from 'next/router'
import { useRouter } from 'next/router'
import { Storage } from 'Utils/inAppstorage'
import { Logo, ProfileImage3 } from "@reusables/images";
import { MenuItems, SubMenuItems } from "@types";
import ActiveLinks from "@/components/links/activeLinks";
import { useSideBarContext } from "@context";
import { BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import Backdrop from "../../modal/backdrop/Backdrop";
import styles from '../../modal/modal.module.css'
import { ExchangeRectangle, Files, LogoutOpen, UserCircle } from "react-huge-icons/bulk";
import { userRoles } from "@/components/layouts/elements/SideBarItems";
import { useQueryClient } from "react-query";
import MigrateToProd from '@/components/settings/MigrateToProd'
import { HiMiniXMark } from 'react-icons/hi2'
import Link from 'next/link'

function SideBar() {

    const dropdownNavLinks = ["transactions", "payments", "settings", "payment-settings"]

    const [selectedSubMenuItem, setSelectedSubMenuItem] = useState<MenuItems | null>();

    const [isMigrate, setIsMigrate] = useState(false)
    const [isSubCategorySelected, setIsSubCategorySelected] = useState(false)

    const [activeLink, setActiveLink] = useState("")

    const [dialog, setDialog] = useState(false);

    const router = useRouter();

    const [displayName, setDisplayName] = useState({
        name: "",
        userType: "",
    })

    const { details } = Storage.getItem("userDetails") || {}


    const { sidebarItems, setSidebarItems } = useSideBarContext()

    const queryClient = useQueryClient()

    const handleSubmit = async () => {
        Storage.clearItem();
        await router.push("/login");
        queryClient.clear();
    }

    useEffect(() => {
        if (details) {
            setDisplayName({
                ...displayName,
                name: details?.businessName || "",
                userType: details?.userType || ""
            })
        }
    }, []);

    useEffect(() => {
        setActiveLink(router.asPath)

        if (dropdownNavLinks.includes(router.asPath.split("/")[1])) {
            sidebarItems.filter((item: any) => {
                if (item.route.toLowerCase() === router.asPath) {
                    setSelectedSubMenuItem(item)
                    setIsSubCategorySelected(true)
                }
            })
        }
    }, [router.asPath]);


    return (
        <>
            {/* Large Side bar */}
            <aside
                className="hidden md:flex w-[30%] min-h-[100vh] h-[100%] pt-5 pb-10 xl:h-full bg-white lg:drop-shadow-lg drop-shadow-lg z-50 lg:inset-x-auto inset-x-0 lg:inset-y-0 | self-start top-0 w-full max-w-[230px]  flex transition-all duration-300 ease-in-out fixed s"
            >

                <div className=' w-full flex flex-col gap-10  justify-between overflow-y-auto text-slate-500 font-medium'>
                    <div className=' w-full flex flex-col gap-1 text-slate-500 font-medium'>
                        <div className="w-full justify-center flex my-3">
                            <Image src={Logo} alt="vestrapay" width={95} height={95} />
                        </div>
                        <div className="flex flex-col gap-2 px-8">
                            {
                                dropdownNavLinks.includes(activeLink.split("/")[1])
                                    && selectedSubMenuItem && isSubCategorySelected
                                    ? (
                                        <div className="relative text-base">
                                            <motion.div
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setSelectedSubMenuItem(prevState => null)
                                                    setIsSubCategorySelected(prevState => false)
                                                }}
                                                className="flex items-center gap-2 text-xs cursor-pointer"
                                            >
                                                <BsArrowLeft className="font-bold" />
                                                <p>Main Menu</p>
                                            </motion.div>
                                            <p className="text-selected text-base my-2">{selectedSubMenuItem.name}</p>
                                            {
                                                selectedSubMenuItem?.subMenuItems?.map((item: SubMenuItems, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="relative text-base">

                                                        {
                                                            <motion.div
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.9 }}
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
                                                                    <p className="flex w-full h-[1px] bg-selected items-center justify-center mt-5 ml-0.5" />}
                                                            </motion.div>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                    :
                                    sidebarItems?.map((item: MenuItems | any, index: number) => (
                                        <div key={index} className="relative text-base">
                                            {
                                                activeLink === item.route
                                                &&
                                                <p
                                                    className="absolute -left-8 w-16 h-full -top-4 bottom-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-60 "
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
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='flex gap-3 items-center transition-all duration-300 ease-in-out'
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
                                                                <p className='font-300 text-base my-3'>{item?.name}</p>
                                                            </motion.div>
                                                        </div>
                                                    </ActiveLinks>
                                                </>
                                            }
                                        </div>
                                    ))

                            }
                        </div>
                        <div className="h-[1px] w-full bg-slate-300 left-0 top-[450px]" />
                        {/* <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMigrate(!isMigrate)}
                            className="flex gap-3 items-center top-[450px] cursor-pointer px-8 ">
                            <ExchangeRectangle style={{ width: 24, height: 24 }} />
                            <p className="text-sm text-slate-500">Migrate to <br /><span
                                className="font-bold">Production</span></p>
                        </motion.div> */}
                        <Link href="https://documenter.getpostman.com/view/8528336/2s9YythgCF#42536433-0ce7-4bcb-b80a-9b219800beb7" passHref={true}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                // onClick={() => setIsMigrate(!isMigrate)}
                                className="flex gap-3 items-center top-[450px] cursor-pointer px-8  mt-8">
                                <Files style={{ width: 24, height: 24 }} />
                                <p className="text-sm text-slate-500">API Docs</p>
                            </motion.div>
                        </Link>
                    </div>
                    <div className=" flex flex-col justify-center items-start  bottom-8 ml-5">

                        {/**/}

                        <div className="flex gap-2 items-start">
                            <div className="flex justify-center items-center rounded-xl p-1 bg-slate-100  cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                                <UserCircle className={"w-7 h-7 text-unselected rounded-full "} />
                            </div>
                            {/* <Image src={ProfileImage3} alt={"profile"}
                            className="rounded-2xl bg-rose-300 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" /> */}
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-xs text-slate-900 font-bold my-0">{displayName?.name || ""}</p>
                                <p className="text-xs text-slate-500 uppercase my-0 mb-5">{`${displayName?.userType + " " || ""}`}</p>
                                <div className="flex gap-2 items-center cursor-pointer" onClick={handleSubmit} >
                                    Logout <LogoutOpen style={{ width: 24, height: 24 }} className="text-selected cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:text-ultraMarine " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Small Side bar */}
            <div className={`w-full md:hidden absolute justify-between flex my-3 px-5`}>
                <Image src={Logo} alt="vestrapay" width={35} height={35} />

                <div className="w-8 h-8 md:hidden block bg-white rounded-full cursor-pointer" onClick={() => setDialog(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path></svg>
                </div>
            </div>
            <div
                className={`${styles.Modal} md:hidden block `}
                style={{
                    transform: dialog ? 'translateX(0)' : 'translateX(-100vw)',
                    opacity: dialog ? '1' : '0',

                }}
            >
                <Backdrop show={dialog} closeModal={() => setDialog(false)} />
                <div
                    className={` ${dialog ? "block" : "hidden"} z-[200] min-h-[100vh] h-[100%] pt-5 pb-10 xl:h-full bg-white lg:drop-shadow-lg drop-shadow-lg z-50 lg:inset-x-auto inset-x-0 lg:inset-y-0 | self-start top-0 w-full max-w-2/3  flex transition-all duration-300 ease-in-out fixed s`}
                >

                    <div className="w-8 h-8 absolute bg-gray-500  z-[2000] rounded-full flex justify-center items-center top-5 right-10 lg:right-20 cursor-pointer" onClick={() => setDialog(false)}>
                        <HiMiniXMark size={40} color={"white"} />
                    </div>


                    <div className=' w-full flex flex-col gap-10  justify-between overflow-y-auto text-slate-500 font-medium'>
                        <div className=' w-full flex flex-col gap-1 text-slate-500 font-medium'>

                            <div className="flex flex-col gap-8 px-8">
                                {
                                    dropdownNavLinks.includes(activeLink.split("/")[1])
                                        && selectedSubMenuItem && isSubCategorySelected
                                        ? (
                                            <div className="relative text-base">
                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => {
                                                        setSelectedSubMenuItem(prevState => null)
                                                        setIsSubCategorySelected(prevState => false)
                                                    }}
                                                    className="flex items-center gap-2 text-xs cursor-pointer"
                                                >
                                                    <BsArrowLeft className="font-bold" />
                                                    <p>Main Menu</p>
                                                </motion.div>
                                                <p className="text-selected text-base my-2">{selectedSubMenuItem.name}</p>
                                                {
                                                    selectedSubMenuItem?.subMenuItems?.map((item: SubMenuItems, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="relative text-base">

                                                            {
                                                                <motion.div
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    className="flex transition-all duration-300 ease-in-out mt-8">
                                                                    <ActiveLinks
                                                                        key={index}
                                                                        href={item.route}
                                                                        activeClassName="text-selected">
                                                                        <div
                                                                            className={`w-fit flex flex-1 flex-row justify-start pl-5 items-center rounded-lg cursor-pointer text-base`}>
                                                                            <p className='my-2 w-full whitespace-nowrap'>{item?.name}</p>
                                                                        </div>
                                                                    </ActiveLinks>
                                                                    {activeLink === item.route
                                                                        &&
                                                                        <p className="flex w-full h-[1px] bg-selected items-center justify-center mt-5 ml-0.5" />}
                                                                </motion.div>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                        :
                                        sidebarItems?.map((item: MenuItems | any, index: number) => (
                                            <div key={index} className="relative text-base">
                                                {
                                                    activeLink === item.route
                                                    &&
                                                    <p
                                                        className="absolute -left-8 w-16 h-full -top-4 bottom-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-60 "
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
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    className='flex gap-3 items-center transition-all duration-300 ease-in-out'
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
                                                                    <p className='font-300 text-base my-3'>{item?.name}</p>
                                                                </motion.div>
                                                            </div>
                                                        </ActiveLinks>
                                                    </>
                                                }
                                            </div>
                                        ))

                                }
                            </div>
                            <div className="h-[1px] w-full bg-slate-300 left-0 top-[450px] mt-8" />
                            {/* <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMigrate(!isMigrate)}
                                className="flex gap-3 items-center top-[450px] cursor-pointer px-8  mt-8">
                                <ExchangeRectangle style={{ width: 24, height: 24 }} />
                                <p className="text-sm text-slate-500">Migrate to <br /><span
                                    className="font-bold">Production</span></p>
                            </motion.div> */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMigrate(!isMigrate)}
                                className="flex gap-3 items-center top-[450px] cursor-pointer px-8  mt-8">
                                <ExchangeRectangle style={{ width: 24, height: 24 }} />
                                <p className="text-sm text-slate-500">API Docs</p>
                            </motion.div>
                        </div>
                        <div className="flex  gap-2 items-center bottom-8 ml-5 space-y-4 justify-between">
                            <div className="flex gap-2 items-center">
                                <div className="flex justify-center items-center rounded-xl p-1 bg-slate-100  cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                                    <UserCircle className={"w-7 h-7 text-unselected rounded-full "} />
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-xs text-slate-900 font-bold my-0">{displayName?.name || ""}</p>
                                    <p className="text-xs text-slate-500 uppercase my-0">{`${displayName?.userType + " " || ""}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center cursor-pointer" onClick={handleSubmit} >
                            Logout <LogoutOpen style={{ width: 24, height: 24 }} className="text-selected cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:text-ultraMarine " />
                        </div>
                    </div>
                </div>
            </div>
            <MigrateToProd show={isMigrate} setShow={() => setIsMigrate(!isMigrate)} />
        </>
    )
}

export default SideBar;