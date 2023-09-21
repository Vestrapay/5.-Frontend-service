import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AtmCard from "@/components/cards/AtmCard";
import DashNavbar from "@/components/dashboard/DashNavbar";
import Image from "next/image";
import {Delimiter, DivisionLine} from "@public/assets";
import Switch from "react-switch";
import {MoneyRecive, MoneySend} from "iconsax-react";
import {motion} from 'framer-motion';
import {
    EmptyTransactionIcon,
    VestraDashDisputeLogsIcon,
    VestraDashNotificationIcon,
    VestraDashUsersIcon
} from "@/components/reusables/icons";
import {Store} from "react-huge-icons/bulk";
import {BsBug, BsThreeDots} from 'react-icons/bs';
import {DataGrid} from "@mui/x-data-grid";
import {recentTransactionsData, recentTransactionsFields} from "@utils/tableSchema";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";


const Dashboard = () => {

    const [isCardDisabled, setIsCardDisabled] = useState(false);
    const [isDropDownActive, setIsDropDownActive] = useState(false);

    const [selectedItem, setSelectedItem] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [isTransTypeDropDownActive, setIsTransTypeDropDownActive] = useState(false);

    return (
        <DashboardLayout>
            <main className="px-10 pb-4 h-full">
                <DashNavbar/>
                <div className="w-full grid gap-4 grid-rows-2 grid-cols-6 h-full">
                    <div className="grid grid-rows-2 grid-cols-1 col-span-3 gap-4 h-full">
                        <div className="flex bg-white p-3 rounded-2xl items-center w-full overflow-auto">
                            <AtmCard isActivated={isCardDisabled}/>
                            <Image
                                src={DivisionLine}
                                alt={"division-line"}
                                className="mx-3"
                            />
                            <div className="flex text-right flex-col justify-center">
                                <span className="m-0 py-0.5">
                                    <p className="text-base font-bold m-0">₦2,850.75</p>
                                    <p className="text-xxs whitespace-nowrap m-0 text-unselected">Current balance</p>
                                </span>
                                <span className="m-0 py-0.5">
                                    <p className="text-base font-bold m-0 text-green">₦1,500.50</p>
                                    <p className="text-xxs m-0 text-unselected">Income</p>
                                </span>
                                <span className="m-0 py-0.5">
                                    <p className="text-base font-bold m-0 text-red">₦1,500.50</p>
                                    <p className="text-xxs m-0 text-unselected">Outcome</p>
                                </span>
                                <span className="m-0 py-0.5">
                                    <Switch
                                        checked={isCardDisabled}
                                        onChange={() => setIsCardDisabled(prevState => !prevState)}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        handleDiameter={15}
                                        height={17}
                                        width={34}

                                    />
                                    <p className="text-xxs m-0 text-unselected">Deactivate</p>
                                </span>
                            </div>
                            <Image
                                src={DivisionLine}
                                alt={"division-line"}
                                className="mx-3"
                            />
                            <div className="flex flex-col items-center justify-center gap-4 w-1/2 h-full">
                                <motion.div
                                    whileTap={{scale: 0.85}}
                                    className="bg-white rounded-2xl shadow-xl justify-center items-center flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg p-2 w-full">
                                    <MoneySend size={32} color="#382C7C" variant="Bulk"/>
                                    <p className="flex text-center text-selected whitespace-nowrap text-xxs m-0">Send
                                        Money</p>
                                </motion.div>
                                <motion.div
                                    whileTap={{scale: 0.85}}
                                    className="bg-selected rounded-2xl p-2 shadow-xl shadow-selected/20 justify-center items-center flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:brightness-105 w-full">
                                    <MoneyRecive size={32} color="#FFF" variant="Bulk"/>
                                    <p className="text-center text-white text-xxs whitespace-nowrap m-0">Receive
                                        Money</p>
                                </motion.div>
                            </div>
                        </div>
                        <div className="flex bg-white p-3 rounded-2xl">
                            Transaction Analytics
                        </div>
                    </div>
                    <div className="grid grid-rows-4 col-span-1 gap-4 h-full justify-between">
                        <div className="bg-white rounded-2xl p-5 flex items-center">
                            <div className="flex h-7 items-center justify-center bg-blue-200 rounded-full mr-5 p-1">
                                <VestraDashUsersIcon width={20} height={20} style={{color: "#5B93FF", margin: 0}}/>
                            </div>
                            <div className="text-left flex m-0 flex-col justify-start">
                                <p className="font-bold m-0">05</p>
                                <p className="m-0 text-xs text-unselected">System <br/>Users</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 flex items-center">
                            <div className="flex h-7 items-center justify-center bg-amber-100 rounded-full mr-5 p-1">
                                <VestraDashDisputeLogsIcon width={20} height={20}
                                                           style={{color: "#dab60d", margin: 0}}/>
                            </div>
                            <div className="text-left flex m-0 flex-col justify-start">
                                <p className="font-bold m-0">15</p>
                                <p className="m-0 text-xs text-unselected">Logged <br/>Issues</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 flex items-center">
                            <div className="flex h-7 items-center justify-center bg-orange-100 rounded-full mr-5 p-1">
                                <Store width={20} height={20} style={{color: "#fa8602", margin: 0}}/>
                            </div>
                            <div className="text-left flex m-0 flex-col justify-start">
                                <p className="font-bold m-0">1005</p>
                                <p className="m-0 text-xs text-unselected">Recent <br/>Transactions</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 flex items-center">
                            <div className="flex h-7 items-center justify-center bg-violet-200 rounded-full mr-5 p-1">
                                <VestraDashNotificationIcon width={20} height={20}
                                                            style={{color: "#382C7C", margin: 0}}/>
                            </div>
                            <div className="text-left flex m-0 flex-col justify-start">
                                <p className="font-bold m-0">10</p>
                                <p className="m-0 text-xs text-unselected">Recent <br/>Notifications</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 col-span-2 h-full">
                        <div className="bg-white rounded-2xl p-5 flex flex-col gap-8">
                            <div className="flex justify-between">
                                <p className="text-base font-bold m-0">Notifications</p>
                                <BsThreeDots width={20} height={20}/>
                            </div>
                            <div className="overflow-auto max-h-[350px]">
                                <div className="flex w-full justify-between items-start gap-4">
                                    <div className="bg-red-600 p-1 flex text-white rounded-lg mt-1">
                                        <BsBug width={20} height={20}/>
                                    </div>
                                    <div className="m-0 text-sm">
                                        <p className="m-0">First of Nigeria is currently experiencing transaction
                                            downtime.</p>
                                        <p className="text-unselected mt-1 text-xs">Just now</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between items-start gap-4">
                                    <div className="bg-red-600 p-1 flex text-white rounded-lg mt-1">
                                        <BsBug width={20} height={20}/>
                                    </div>
                                    <div className="m-0 text-sm">
                                        <p className="m-0">First of Nigeria is currently experiencing transaction
                                            downtime.</p>
                                        <p className="text-unselected mt-1 text-xs">Just now</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between items-start gap-4">
                                    <div className="bg-red-600 p-1 flex text-white rounded-lg mt-1">
                                        <BsBug width={20} height={20}/>
                                    </div>
                                    <div className="m-0 text-sm">
                                        <p className="m-0">First of Nigeria is currently experiencing transaction
                                            downtime.</p>
                                        <p className="text-unselected mt-1 text-xs">Just now</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between items-start gap-4">
                                    <div className="bg-red-600 p-1 flex text-white rounded-lg mt-1">
                                        <BsBug width={20} height={20}/>
                                    </div>
                                    <div className="m-0 text-sm">
                                        <p className="m-0">First of Nigeria is currently experiencing transaction
                                            downtime.</p>
                                        <p className="text-unselected mt-1 text-xs">Just now</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between items-start gap-4">
                                    <div className="bg-red-600 p-1 flex text-white rounded-lg mt-1">
                                        <BsBug width={20} height={20}/>
                                    </div>
                                    <div className="m-0 text-sm">
                                        <p className="m-0">First of Nigeria is currently experiencing transaction
                                            downtime.</p>
                                        <p className="text-unselected mt-1 text-xs">Just now</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between items-start gap-4">
                                    <div className="bg-red-600 p-1 flex text-white rounded-lg mt-1">
                                        <BsBug width={20} height={20}/>
                                    </div>
                                    <div className="m-0 text-sm">
                                        <p className="m-0">First of Nigeria is currently experiencing transaction
                                            downtime.</p>
                                        <p className="text-unselected mt-1 text-xs">Just now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 col-span-full overflow-auto max-w-full row-span-1 h-full">
                        <div className="bg-white rounded-2xl p-5 flex">
                            <div className="flex flex-col w-full">
                                <div className="flex w-full mb-2 items-center justify-between">
                                    <div className="flex items-center">
                                        <p className="text-base font-bold m-0 whitespace-nowrap">Recent Transactions</p>
                                        <Image src={Delimiter} alt={"line"} className="mx-5"/>
                                        <div className="flex items-center mr-5">
                                            <p className="h-1 w-1 rounded-full bg-green-800"/>
                                            <p className="text-xs text-unselected m-0 ml-2">Approved</p>
                                        </div>
                                        <div className="flex items-center mr-5">
                                            <p className="h-1 w-1 rounded-full bg-red-800"/>
                                            <p className="text-xs text-unselected m-0 ml-2">Failed</p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="h-1 w-1 rounded-full bg-amber-500"/>
                                            <p className="text-xs text-unselected m-0 ml-2">Pending</p>
                                        </div>
                                        <Image src={Delimiter} alt={"line"} className="mx-5"/>
                                        <button
                                            onMouseLeave={() => setIsDropDownActive(false)}
                                            className="text-xs font-nunito text-unselected border-none outline-none active:border-none active:outline-none bg-transparent relative flex items-center w-full"
                                        >
                                            <p className="px-2 w-full">
                                                {selectedItem ? selectedItem : "Merchant"}
                                            </p>
                                            {isDropDownActive
                                                ? <IoIosArrowUp
                                                    onClick={() => setIsDropDownActive(false)}
                                                    width={20} height={20}
                                                    className="text-selected cursor-pointer"/>
                                                : <IoIosArrowDown
                                                    onClick={() => setIsDropDownActive(true)}
                                                    width={20} height={20}
                                                    className="text-unselected cursor-pointer"/>
                                            }
                                            <div
                                                className={`absolute rounded-md bg-selected/70 backdrop-blur-sm z-20 inset-x-0 top-10 w-full`}>
                                                <ul className={`list-none px-2 text-xs font-nunito text-white flex-col gap-1 ${isDropDownActive ? "flex justify-center items-center" : "hidden"}`}>
                                                    {/*TODO: Fetch this from an API or from an array*/}
                                                    <li
                                                        onClick={() => {
                                                            setSelectedItem("Merchant")
                                                            setIsDropDownActive(false)
                                                        }}
                                                        className="w-full py-1 rounded-md cursor-pointer hover:bg-selected/60"
                                                    >
                                                        Merchant
                                                    </li>
                                                    <li
                                                        onClick={() => {
                                                            setSelectedItem("Customers")
                                                            setIsDropDownActive(false)
                                                        }}
                                                        className="w-full py-1 rounded-md cursor-pointer hover:bg-selected/60"
                                                    >
                                                        Customers
                                                    </li>
                                                </ul>
                                            </div>
                                        </button>
                                        <Image src={Delimiter} alt={"line"} className="mx-5"/>
                                        <button
                                            onMouseLeave={() => setIsTransTypeDropDownActive(false)}
                                            className="text-xs font-nunito text-unselected border-none outline-none active:border-none active:outline-none bg-transparent relative flex items-center w-full"
                                        >
                                            <p className="px-2 w-full whitespace-nowrap">
                                                Transaction Type: {transactionType ? transactionType : "Cards"}
                                            </p>
                                            {isTransTypeDropDownActive
                                                ? <IoIosArrowUp
                                                    onClick={() => setIsTransTypeDropDownActive(false)}
                                                    width={20} height={20}
                                                    className="text-selected cursor-pointer"/>
                                                : <IoIosArrowDown
                                                    onClick={() => setIsTransTypeDropDownActive(true)}
                                                    width={20} height={20}
                                                    className="text-unselected cursor-pointer"/>
                                            }
                                            <div
                                                className={`absolute rounded-md bg-selected/70 backdrop-blur-sm z-20 inset-x-0 top-10 w-full`}>
                                                <ul className={` text-xs px-2 py-0 font-nunito text-white flex-col gap-2 ${isTransTypeDropDownActive ? "flex justify-center items-center" : "hidden"}`}>
                                                    <li
                                                        onClick={() => {
                                                            setTransactionType("Cards")
                                                            console.log("clicked")
                                                            setIsTransTypeDropDownActive(false)
                                                        }}
                                                        className="w-full py-1 rounded-md cursor-pointer hover:bg-selected/60"
                                                    >
                                                        Cards
                                                    </li>
                                                </ul>
                                            </div>
                                        </button>
                                    </div>
                                    <BsThreeDots width={20} height={20} className="text-unselected"/>
                                </div>
                                <div className="max-w-[100%] h-full justify-center items-center flex">
                                    <DataGrid
                                        rows={recentTransactionsData} // TODO: This should be the data from the API
                                        columns={recentTransactionsFields}
                                        slots={{
                                            loadingOverlay: () =>
                                                <div
                                                    className="flex justify-center items-center w-full h-full"
                                                >
                                                    <EmptyTransactionIcon width={100} height={100}/>
                                                </div>,
                                        }}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 5,
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .MuiDataGrid-main": {
                                                fontFamily: "Nunito",
                                                color: "#030229",
                                            },
                                            "& .MuiDataGrid-columnHeaderTitle": {
                                                fontWeight: "bold",
                                            },
                                            "& .MuiDataGrid-root": {
                                                display: "flex",
                                                width: "100%",
                                            },
                                        }}
                                        onCellClick={(params) => {
                                            console.log(params)
                                        }}
                                        loading={recentTransactionsData.length === 0} // TODO: This should be the loading state from the API

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default Dashboard;