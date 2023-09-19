import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AtmCard from "@/components/cards/AtmCard";
import DashNavbar from "@/components/dashboard/DashNavbar";
import Image from "next/image";
import {DivisionLine} from "@public/assets";
import Switch from "react-switch";
import {MoneyRecive, MoneySend} from "iconsax-react";
import {motion} from 'framer-motion';
import DashTransReport from "@/components/charts/DashTransReport";

const Dashboard = () => {

    const [isCardDisabled, setIsCardDisabled] = useState(false);

    return (
        <DashboardLayout>
            <main className="p-5 h-full">
                <DashNavbar/>
                <div className="grid grid-cols-4 grid-rows-6 gap-4">
                    <div className="col-span-2 grid-rows-2 w-full">
                        <div className="flex row-span-2 bg-white p-3 min-w-[100%] overflow-auto rounded-2xl items-center">
                            <AtmCard/>
                            <Image
                                src={DivisionLine}
                                alt={"division-line"}
                                className="mx-4"
                            />
                            <div className="flex text-right flex-col justify-center">
                                <span className="m-0 py-0.5">
                                    <p className="text-base font-bold m-0">₦2,850.75</p>
                                    <p className="text-xs m-0 text-unselected">Current balance</p>
                                </span>
                                <span className="m-0 py-0.5">
                                    <p className="text-base font-bold m-0 text-green">₦1,500.50</p>
                                    <p className="text-xs m-0 text-unselected">Income</p>
                                </span>
                                <span className="m-0 py-0.5">
                                    <p className="text-base font-bold m-0 text-red">₦1,500.50</p>
                                    <p className="text-xs m-0 text-unselected">Outcome</p>
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
                                    <p className="text-xs m-0 text-unselected">Deactivate</p>
                                </span>
                            </div>
                            <Image
                                src={DivisionLine}
                                alt={"division-line"}
                                className="mx-4"
                            />
                            <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.9}}
                                    className="bg-white rounded-2xl shadow-xl justify-center items-center flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg h-1/4 p-2 w-full">
                                    <MoneySend size={32} color="#382C7C" variant="Bulk"/>
                                    <p className="flex text-center text-selected whitespace-nowrap text-xxs m-0">Send
                                        Money</p>
                                </motion.div>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.9}}
                                    className="bg-selected rounded-2xl p-2 shadow-xl shadow-selected/20 justify-center items-center flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:brightness-105 h-1/4 w-full">
                                    <MoneyRecive size={32} color="#FFF" variant="Bulk"/>
                                    <p className="text-center text-white text-xxs whitespace-nowrap m-0">Receive
                                        Money</p>
                                </motion.div>
                            </div>
                        </div>
                        <div className="flex row-span-2 mt-4 bg-white p-3 rounded-2xl items-center">
                            sas
                            {/*<DashTransReport/>*/}
                        </div>
                    </div>
                    <div className="col-span-1 grid grid-rows-4 gap-5">
                        <div className="bg-white rounded-2xl p-3">
                            hjh
                        </div>
                        <div className="bg-white rounded-2xl p-3">
                            hjh
                        </div>
                        <div className="bg-white rounded-2xl p-3">
                            hjh
                        </div>
                        <div className="bg-white rounded-2xl p-3">
                            hjh
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default Dashboard;