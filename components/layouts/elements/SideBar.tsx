
import React, { useEffect, useState } from 'react'
import OnBoardingLayout from '@/components/layouts/OnBoardingLayout'
import Image from 'next/image'
import { BsChevronDown, BsChevronUp, BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import {
    finalMenu, userRoles
} from './SideBarItems'
import Link from 'next/link'
import { DashHomeIcon, DashUserIcon, DashTransIcon, DashShopIcon, DashReportIcon } from '@/components/reusables/icons'
import { FaReact } from 'react-icons/fa'
// import router from 'next/router'
import { useRouter } from 'next/router'
import { Storage } from 'Utils/inAppstorage'
import { Tooltip } from '@/components/reusables/buttons/ToolTip'

function SideBar({ isNavOpen, setIsNavOpen }: any) {

    const [selectedDropDown, setselectedDropDown] = useState(0)
    const [toggle, setToggle] = useState<boolean>(false)
    const [openDropDown, setOpenDropDown] = useState<any>([])
    const [barItems, setBarItems] = useState<any>([])
    const [activeIndex, setActiveIndex] = useState<any>(null)

    const router = useRouter();

    const [displayName, setDisplayName] = useState("")

    const { name } = Storage.getItem("merchantDetails") || {}

    useEffect(() => {
        setDisplayName(name || "")
    }, [name])

    useEffect(() => {
        if (userRoles) {
            const topMenuItems = finalMenu(userRoles)
            setTimeout(() => {
                setBarItems(topMenuItems);
            }, 500);
        }
    }, [userRoles])

    const handleDropDown = (itemIndex: number) => {
        //check for selected Id
        const selectedMenuItems = barItems.find(
            (item: any) => item.id === itemIndex + 1,
        )

        //check for the menuitem with submenu dropdown and opens or closes it
        if (selectedMenuItems?.subMenuItems.length) {
            openDropDown.find((id: number) => id === itemIndex + 1)
                ? setOpenDropDown((intialArray: any[]) =>
                    intialArray.filter((subItem) => subItem !== itemIndex + 1),
                )
                : setOpenDropDown([selectedMenuItems.id])
        }
        setselectedDropDown(itemIndex)
    }

    return (
        <>
            {/* Large Side bar */}
            <aside className={`animate__animated animate__fadeIn
            px-5 min-h-[100vh] h-[100%] pt-8 pb-10 w-fit xl:h-full  bg-[#1F2940] lg:drop-shadow-lg drop-shadow-lg 
            z-50 lg:inset-x-auto inset-x-0 lg:inset-y-0 | self-start top-0 col-span-1 ${isNavOpen ? "sm:block " : "hideMenuNav"} fixed`}>{/*lg:fixed absolute lg:inset-x-auto inset-x-0 lg:inset-y-0*/}

                <div className='w-full flex flex-col gap-5 overflow-y-auto'>

                    <div className='pb-8 w-full top-[50px] justify-center left-0 sm:justify-start  sm:left-[70px]'>
                        <div className='w-full flex justify-between gap-x-14'>
                            <Image src={'/assets/svg/medusaLogo.svg'} alt="" width={125} height={100} />
                            <div onClick={() => { setIsNavOpen(!isNavOpen); setOpenDropDown([]) }} className={`p-2 rounded-full bg-[#6D71F925] cursor-pointer`}>
                                <BsChevronDoubleLeft color='#6D71F9' />
                            </div>
                        </div>
                        <p className='text-primary-white w-full text-sm text-center font-600 mt-5'>{displayName}</p>
                    </div>
                    {barItems.map((item: any, index: any) => (
                        <div key={index} className={`${router.asPath.includes(item.route) ||
                            item.subMenuItems.find((subItem: any) =>
                                router.asPath.includes(subItem.route),
                            ) ? "bg-primary-blue text-primary-white rounded-lg"
                            : item.subMenuItems.length && openDropDown.includes(item.id) ?
                                "bg-blue-darker rounded-lg" : ''}`}>
                            <div className={` ${
                                // @ts-ignore
                                router.asPath.includes(item.route) ||
                                    item.subMenuItems.find((subItem: any) =>
                                        router.asPath.includes(subItem.route),
                                    )
                                    ? 'bg-primary-blue text-primary-white'
                                    : 'text-gray-400'
                                } w-full flex flex-row justify-between gap-6 items-center p-3 rounded-lg cursor-pointer`}
                                onClick={item.route ? () => router.push(item.route) : (e: any) => handleDropDown(index)}
                            >
                                <div className='flex gap-2 items-center'>
                                    <div className='min-w-max'>
                                        {item?.icon(router.asPath.includes(item.route) ||
                                            item.subMenuItems.find((subItem: any) =>
                                                router.asPath.includes(subItem.route),
                                            )
                                            ? "#fff" : "")}
                                    </div>
                                    <p className='font-300 text-sm min-w-max'>{item?.name}</p>
                                </div>
                                <div>
                                    {!item.subMenuItems.length ? null :
                                        openDropDown.includes(item.id) ?
                                            <BsChevronUp
                                                className={`font-300 text-sm text-gray-400`}
                                            /> :
                                            <BsChevronDown
                                                className={`font-300 text-sm text-gray-400`}
                                            />
                                    }
                                </div>
                            </div>
                            {
                                item.subMenuItems.length && openDropDown.includes(item.id)
                                    ? item.subMenuItems.map((subItem: any, id: any) => (
                                        <div
                                            onClick={() => setActiveIndex(id)}
                                            key={id}
                                            className={`overflow-hidden`}
                                        >
                                            <Link href={subItem.route}>
                                                <div
                                                    className={`${activeIndex === id && 'bg-gray-50'} 
                                                ${(router.asPath.includes(item.route) ||
                                                            item.subMenuItems.find((subItem: any) =>
                                                                router.asPath.includes(subItem.route),)) ? "text-primary-white hover:bg-blue-400" : "text-gray-200 hover:bg-gray-200"} m-1 px-6 flex items-center gap-1 rounded px-3 py-1`}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full opacity-75 ${router.asPath.includes(item.route) ||
                                                        item.subMenuItems.find((subItem: any) =>
                                                            router.asPath.includes(subItem.route),) ? " bg-[#1F2940]" : "bg-gray-500"}`}></div>
                                                    <p className={`font-200 text-sm min-w-max py-2 opacity-75 ${router.asPath.includes(item.route) ||
                                                        item.subMenuItems.find((subItem: any) =>
                                                            router.asPath.includes(subItem.route),) ? " text-primary-white " : " text-gray-500 "} ${activeIndex === id && 'text-primary-white hover:text-gray-200'}`}>{subItem?.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                    : ''
                            }
                        </div>
                    ))}
                </div>
            </aside>

            {/* Small Side bar */}
            <aside className={` animate__animated animate__fadeIn
px-1 sm:px-5 min-h-[100vh] h-[100%] pt-8 pb-10 w-fit xl:h-full  bg-[#1F2940] drop-shadow-lg 
            z-50 lg:inset-x-auto inset-x-0 lg:inset-y-0 | self-start top-0 col-span-1 ${isNavOpen ? "hideMenuNav" : "sm:block"} fixed`}>{/*lg:fixed absolute lg:inset-x-auto inset-x-0 lg:inset-y-0*/}

                <div className='w-full flex flex-col gap-5 '>

                    <div className='pb-8 w-full top-[50px] justify-center left-0 sm:justify-start  sm:left-[70px]'>
                        <div className={` w-full flex ${isNavOpen ? "flex-row" : "flex-col items-center gap-5"} justify-between`}>
                            <Image src={'/assets/svg/medusaLogoSm.svg'} alt="" width={35} height={100} />
                            <div onClick={() => { setIsNavOpen(!isNavOpen); setOpenDropDown([]) }} className={`p-2 rounded-full max-w-10 max-h-10 bg-[#6D71F925] cursor-pointer`}>
                                <BsChevronDoubleRight color='#6D71F9' style={{ width: 20, height: 20 }} />
                            </div>
                        </div>
                    </div>

                    {barItems.map((item: any, index: any) => (
                        <div key={index}>
                            <Tooltip message={item?.name || ""}>
                                <div key={index} className={`${router.asPath.includes(item.route) ||
                                    item.subMenuItems.find((subItem: any) =>
                                        router.asPath.includes(subItem.route),
                                    ) ? "bg-primary-blue text-primary-white rounded-lg"
                                    : item.subMenuItems.length && openDropDown.includes(item.id) ?
                                        "bg-gray-100 rounded-lg" : ''} relative group`}>

                                    <div className={` ${
                                        // @ts-ignore
                                        router.asPath.includes(item.route) ||
                                            item.subMenuItems.find((subItem: any) =>
                                                router.asPath.includes(subItem.route),
                                            )
                                            ? 'bg-primary-blue text-primary-white'
                                            : 'text-gray-400'
                                        } w-full flex flex-row justify-between gap-6 items-center p-3 rounded-lg cursor-pointer`}
                                        onClick={item.route ? () => router.push(item.route) : (e: any) => { handleDropDown(index); setIsNavOpen(true); }}
                                    >
                                        <div className='flex gap-2 items-center'>
                                            <div className='min-w-max'>
                                                {item?.icon(router.asPath.includes(item.route) ||
                                                    item.subMenuItems.find((subItem: any) =>
                                                        router.asPath.includes(subItem.route),
                                                    )
                                                    ? "#fff" : "")}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    )
}

export default SideBar;