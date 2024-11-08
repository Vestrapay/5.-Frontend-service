import { HiBuildingLibrary, HiCreditCard, HiMiniHashtag, HiMiniLink, HiMiniXMark } from "react-icons/hi2";
import CurrencyFormat from "react-currency-format";
import { paymentGatewayController } from "containers/paymentGatewayApi";
import { LayoutProps } from "@types";
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useState } from "react";
import Backdrop from "../modal/backdrop/Backdrop";
import styles from '../modal/modal.module.css'
import { BsSquareHalf } from "react-icons/bs";
import { useNewTransContext } from "context/transactionContext";
import Loader from "../layouts/Loader";
import ErrorCard from "./ErrorCard"

const PayLinkLayout = ({ children }: LayoutProps) => {
    const router = useRouter()
    const { stateValues, handleInitiatePaymentLink } = paymentGatewayController();

    const { payType: paymentType, setPayment, payment } = useNewTransContext()

    const [payType, setPayType] = useState("card");

    const [dialog, setDialog] = useState(false);

    const changePaymentType = (url: string) => {
        router.push(url)
    }

    const changeThePaymentType = (url: string) => {
        setPayment(url)
    }

    useEffect(() => {
        if (payment?.includes("card")) {
            setPayType("card");
        } else if (payment?.includes("ussd")) {
            setPayType("ussd");
        } else if (payment?.includes("transfer")) {
            setPayType("transfer");
        } else if (payment?.includes("payment-link")) {
            setPayType("payment-link");
        } else {
            setPayType("card");
        }

    }, [payment])


    return (
        <>
            {stateValues?.isFetchingLinkData ? <Loader /> : null}
            <div className="relative bg-white w-[100%] h-[100%] overflow-hidden flex flex-row items-start justify-around  gap - [172px] text - left text - [12.98px] text - darkslateblue font - roboto">

                <img className=" w-10 h-[50px] hidden md:block md:absolute top-20 left-10 md:left-20" alt="" src="/assets/svg/vector.svg" />

                <div className="self-stretch md:flex-3 relative w-full md:w-4/5 h-[100%] px-5 md:px-20 md:pr-[30%] pt-5 pb-10  md:py-20  overflow-y-auto ">

                    <div className=" flex flex-row items-center justify-between pb-10 md:pb-20 md:mt-10 text-left xl:text-center text-[12px] text-black">
                        <div className="flex flex-row  items-center md:items-start justify-center border border-darkslateblue rounded ">

                            <img className=" md:hidden block w-10 h-[50px] mr-5 top-10 left-5 md:left-10" alt="" src="/assets/svg/vector.svg" />
                            <span className="relative leading-[21.63px] cursor-pointer" onClick={() => { paymentType ? router.push(paymentType) : window.history.back(); }}>Go back</span>
                        </div>

                        <div className="w-8 h-8 md:hidden block bg-white rounded-full cursor-pointer" onClick={() => setDialog(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path></svg>
                        </div>
                    </div>


                    <div className="w-full border border-t-0 border-l-0 border-r-0 border-b border-slate-300">
                        <div className=" pb-7 pr-px  flex w-full flex-col gap-5 md:flex-row  justify-start md:justify-between md:items-start">
                            <div className="self-stretch">
                                <div className="text-indigo-900 text-xl font-bold font-['Roboto'] leading-none pt-3.5">{stateValues?.customerName || ""}</div>
                            </div>
                            <div className="md:w-1/2 self-stretch pb-px flex-col items-start justify-start md:items-end inline-flex">
                                <div className="w-full md:pl-36 justify-start md:justify-end items-start gap-1.5 inline-flex">
                                    <div className="text-indigo-900 text-2xl font-bold font-['Roboto'] leading-loose min-w-max">
                                        <CurrencyFormat value={stateValues?.amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={stateValues?.currency+" " || "NGN "} />
                                    </div>
                                </div>
                                <div className="w-full md:justify-end items-start inline-flex">
                                    <div className="text-right text-zinc-500 text-lg font-normal font-['Roboto'] leading-relaxed">{stateValues?.customerEmail || ""}</div>
                                </div>
                            </div>
                        </div>
                        <hr className="h-px mb-8 bg-slate-200 border-0" />
                    </div>

                    <div className="w-full h-full text-[13.71px] text-lightslategray flex flex-col items-center justify-center gap-7">

                        {stateValues?.isFetchingLinkError ? <ErrorCard handleSubmit={handleInitiatePaymentLink} loader={stateValues?.isFetchingLinkData} /> : children || ""}


                        <div className="text-center w-max h-11 px-8 py-3 rounded-lg border border-2 border-neutral-300 justify-center items-center gap-3 inline-flex
                     rounded-3xs box-border flex flex-row items-center justify-center border-[1px] border-solid border-lightgray">

                            <div className="w-3 h-4 px-px pb-px justify-center items-center flex box-border">
                                <img
                                    className="relative w-3 h-[14.5px]"
                                    alt=""
                                    src="/assets/svg/vector1.svg"
                                />
                            </div>
                            <div className="h-5 pr-2.5 justify-center items-center flex">
                                <div className="text-indigo-900 text-xs font-bold font-['Roboto'] leading-tight tracking-wide">SECURED BY VESTRAPAY</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex w-[30%] h-[100%] min-h-[100vh] bg-indigo-900 bg-opacity-10  flex-col justify-center gap-5 items-start fixed right-0">

                    <div className="w-8 h-8 absolute bg-white rounded-full flex justify-center items-center top-20 right-10 lg:right-20 cursor-pointer" onClick={() => { paymentType ? router.push(paymentType) : window.history.back(); }}>
                        <HiMiniXMark size={20} color={"black"} />
                    </div>

                    <div className="text-zinc-800  px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 text-xl font-semibold font-['Roboto'] uppercase leading-none">Pay with</div>

                    <div className={` ${payType == "card" ? "bg-white" : "bg-none"} w-5/6 h-max px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`}
                        onClick={() => changeThePaymentType("card")}>
                        <div className=" justify-center items-start flex">
                            <div className={` ${payType == "card" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                                <HiCreditCard size={15} color={payType == "card" ? "white" : "gray"} />
                            </div>
                        </div>
                        <div className="px-px pb-px justify-center items-start flex">
                            <div className={`${payType !== "card" ? "text-gray-400" : "text-indigo-900"} text-left xl:text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                                Card</div>
                        </div>
                    </div>

                    {/* <div className={` ${payType == "ussd" ? "bg-white" : "bg-none"} w-5/6 h-max px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`}
                    onClick={() => changeThePaymentType("ussd")}>
                    <div className=" justify-center items-start flex">
                        <div className={` ${payType == "ussd" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                            <HiMiniHashtag size={20} color={payType == "ussd" ? "white" : "gray"} />
                        </div>
                    </div>
                    <div className="px-px pb-px justify-center items-start flex">
                        <div className={`${payType !== "ussd" ? "text-gray-400" : "text-indigo-900"} text-left xl:text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                            USSD</div>
                    </div>
                </div> */}

                    <div className={` ${payType == "transfer" ? "bg-white" : "bg-none"} w-5/6 h-max px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`}
                        onClick={() => changeThePaymentType("transfer")}>
                        <div className=" justify-center items-start flex">
                            <div className={` ${payType == "transfer" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                                <HiBuildingLibrary size={20} color={payType == "transfer" ? "white" : "gray"} />
                            </div>
                        </div>
                        <div className="px-px pb-px justify-center items-start flex">
                            <div className={`${payType !== "transfer" ? "text-gray-400" : "text-indigo-900"} text-left xl:text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                                Bank Transfer</div>
                        </div>
                    </div>

                </div>

                <div
                    className={`${styles.Modal} md:hidden block `}
                    style={{
                        transform: dialog ? 'translateX(0)' : 'translateX(100vw)',
                        opacity: dialog ? '1' : '0',

                    }}
                >
                    <Backdrop show={dialog} closeModal={() => setDialog(false)} />
                    <div className=" z-[200] shadow-none flex w-[90%] sm:w-[55%] h-[100%] min-h-[100vh] bg-gray-100 flex-col justify-center gap-5 items-start fixed right-0 "> {/* hidden */}

                        <div className="w-8 h-8 absolute bg-white rounded-full flex justify-center items-center top-10 left-5 cursor-pointer" onClick={() => setDialog(false)}>
                            <HiMiniXMark size={20} color={"black"} />
                        </div>

                        <div className="text-zinc-800  px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 text-xl font-semibold font-['Roboto'] uppercase leading-none">Pay with</div>

                        <div className={` ${payType == "card" ? "bg-white" : "bg-none"} w-5/6 h-max px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`}
                            onClick={() => changeThePaymentType("card")}>
                            <div className=" justify-center items-start flex">
                                <div className={` ${payType == "card" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                                    <HiCreditCard size={15} color={payType == "card" ? "white" : "gray"} />
                                </div>
                            </div>
                            <div className="px-px pb-px justify-center items-start flex">
                                <div className={`${payType !== "card" ? "text-gray-400" : "text-indigo-900"} text-left xl:text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                                    Card</div>
                            </div>
                        </div>

                        {/* <div className={` ${payType == "ussd" ? "bg-white" : "bg-none"} w-5/6 h-max px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`}
                        onClick={() => changeThePaymentType("ussd")}>
                        <div className=" justify-center items-start flex">
                            <div className={` ${payType == "ussd" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                                <HiMiniHashtag size={20} color={payType == "ussd" ? "white" : "gray"} />
                            </div>
                        </div>
                        <div className="px-px pb-px justify-center items-start flex">
                            <div className={`${payType !== "ussd" ? "text-gray-400" : "text-indigo-900"} text-left xl:text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                                USSD</div>
                        </div>
                    </div> */}

                        <div className={` ${payType == "transfer" ? "bg-white" : "bg-none"} w-5/6 h-max px-5 lg:pl-10 xl:pl-20 lg:pr-5 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`}
                            onClick={() => changeThePaymentType("transfer")}>
                            <div className=" justify-center items-start flex">
                                <div className={` ${payType == "transfer" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                                    <HiBuildingLibrary size={20} color={payType == "transfer" ? "white" : "gray"} />
                                </div>
                            </div>
                            <div className="px-px pb-px justify-center items-start flex">
                                <div className={`${payType !== "transfer" ? "text-gray-400" : "text-indigo-900"} text-left xl:text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                                    Bank Transfer</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
};

export default PayLinkLayout;