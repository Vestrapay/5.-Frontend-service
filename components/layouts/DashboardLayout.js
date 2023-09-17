import React from 'react'
import { BsChevronDown, BsPerson, BsGear } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import NextBreadcrumbs from "./elements/NextBreadcrumbs";
import router from 'next/router';
import SideBar from './elements/SideBar'
import { Toaster } from 'react-hot-toast'
import { DefaultTable, PoperDropDown, SearchDropDown, SearchInput, TableStatus } from '@/components/reusables'
import { Storage } from 'Utils/inAppstorage';
import UpdatePassword from '@/components/settings/updatePassword'

function DashboardLayout({ passFunc = () => null, children }) {

    const [isNavOpen, setIsNavOpen] = React.useState(false) // initiate isNavOpen state with true
    const [showDrop, setShowDrop] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowDrop = () => {
        setShowDrop(!showDrop)
        console.log(showDrop)
    }

    const titleize = (str) => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
        }).replace(/([A-Z])/g, ' $1').trim();
    }

    // Either lookup a nice label for the subpath, or just titleize it
    const getDefaultTextGenerator = React.useCallback((subpath) => {
        return {
            "eod": "End Of Day",
            "admins": "Admin Users",
            "dashboard": "Admin",
            "accounts": "My Account"
        }[subpath] || titleize(subpath)
    }, [])

    const showPasswordModal = () => { setShowPassword(prevShoW => (!prevShoW)) }


    return (
        <>
            <div className="relative animate__animated animate__fadeIn w-full min-w-[100vw] min-h-[100vh] h-[100%]  bg-blue-darker flex flex-row items-start justify-start overflow-x-hidden lg:overflow-x-auto xl:overflow-x-hidden">

                {/* Side bar */}
                <SideBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                {/* Main */}
                <main className={`w-full col-span-6 pl-0 ${isNavOpen ? "sm:pl-20 lg:pl-[250px] blur-nones lg:blur-none blur-sm " : "pl-14"} block 2xl:flex  2xl:flex-col  2xl:items-center`}>
                    {/* Header */}
                    <div className=' bg-[#1F2940] w-full h-fit py-5 px-4 sm:px-12 self-start top-0'>
                        <div className='w-full flex justify-between'>
                            <div className='flex flex-col justify-center'>
                                <p className='font-500 text-lg text-primary-white'>Dashboard</p>
                                {/* <div>
                                    <NextBreadcrumbs
                                        getDefaultTextGenerator={getDefaultTextGenerator}
                                    // getTextGenerator={getTextGenerator}
                                    />
                                </div> */}
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className="relative">
                                    <PoperDropDown
                                        placeHolder="Send via"
                                        label=""
                                        variant=''
                                        innerVariant="border-none h-12 rounded-lg outline-none focus:border font-normal"
                                        containerVariant='w-max-content min-w-max sm:mx-auto mx-0'
                                        optionVariant="mr-0 pr-0 py-0"
                                        optionContainerVariant={` absolute w-max  py-2 bg-blue-dark h-auto sm:top-[50px] top-[50px] xxs:-right-[20px] z-15 shadow-lg text-sm text-gray-350 `}
                                        onHandleChange={() => null/*handleShowDrop*/}
                                        value={""/*sortOrder*/}
                                        checker={showDrop}
                                        // list={true}
                                        func={(val) => setShowDrop(!showDrop)/*setDropDown(val  ? null : dropDown == "send" ? null : "send")*/}
                                        options={[
                                            (<div key={2} className='h-10 flex items-center text-center p-2 px-4 py-4 hover:bg-blue-darkish cursor-pointer min-w-max' onClick={showPasswordModal}>
                                                {/* onClick={() => showRenamingModal(item?.terminalId)} */}
                                                <p className='text-center text-sm font-400 flex items-center p-3 gap-2 text-primary-white'><BsPerson size={20} color={"blue"} /><span>Profile</span></p>
                                            </div>),
                                            (<div key={2} className='h-10 flex items-center text-center p-2 px-4 py-4 hover:bg-blue-darkish cursor-pointer min-w-max' onClick={showPasswordModal}>
                                                <p className='text-center text-sm font-400 flex items-center p-3 gap-2 text-primary-white'><BsGear size={20} color={"blue"} /><span>Change Password</span></p>
                                            </div>),
                                            (<div key={3} className='h-10 flex items-center text-center p-2 px-4 py-4 hover:bg-blue-darkish cursor-pointer min-w-max' onClick={() => { Storage.clearItem(); router.push("/login") }}>
                                                {/* onClick={() => showRepairModal(item?.terminalId, item?.branchId)} */}
                                                <p className='text-center text-sm font-400 flex items-center p-3 gap-2 text-gray-300'><FiLogOut size={20} color={"red"} /><span>Log Out</span></p>
                                            </div>)
                                        ]}
                                        optionHeight={"h-auto top-10 "}
                                    >
                                        {/*  onClick={() => router.push("/accounts/profile")} */}
                                        <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleShowDrop()}>
                                            <BsChevronDown color={"white"} />
                                            <img src="/assets/svg/avatar.svg" />
                                        </div>
                                    </PoperDropDown>
                                </div>
                            </div>
                        </div >
                    </div >
                    {/* Body */}
                    < div className='mt-10 px-4 sm:px-12 pb-10 w-full max-w-[1800px]' >
                        {children}
                        < div className='mt-10 w-full flex justify-center text-gray-300' >
                            {`Medusa Virtual ${new Date().getFullYear()}`
                            }
                        </div >
                    </div >
                </main >
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div >
            <UpdatePassword show={showPassword} showModal={showPasswordModal} />
        </>
    )
}

export default DashboardLayout