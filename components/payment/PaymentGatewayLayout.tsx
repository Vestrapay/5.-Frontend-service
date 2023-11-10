import { HiBuildingLibrary, HiCreditCard, HiMiniHashtag, HiMiniLink, HiMiniXMark } from "react-icons/hi2";
import CurrencyFormat from "react-currency-format";
import { paymentGatewayController } from "containers/paymentGatewayApi";
import { LayoutProps } from "@types";
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useState } from "react";


const PaymentGateway = ({ children }: LayoutProps) => {
    const router = useRouter()
    const { stateValues } = paymentGatewayController();

    const [payType, setPayType] = useState("card");

    const changePaymentType = (url: string) => {
        router.push(url)
    }

    useEffect(() => {
        if (router.asPath.includes("card")) {
            setPayType("card");
        } else if (router.asPath.includes("ussd")) {
            setPayType("ussd");
        } else if (router.asPath.includes("transfer")) {
            setPayType("transfer");
        } else if (router.asPath.includes("payment-link")) {
            setPayType("payment-link");
        }

    }, [router])


    return (
        <div className="relative bg-white w-[100%] h-[100%] overflow-hidden flex flex-row items-start justify-start gap-[172px] text-left text-[12.98px] text-darkslateblue font-roboto">
            <img className="relative w-10 h-[50px] absolute top-10 left-10" alt="" src="/assets/svg/vector.svg" />

            <div className="self-stretch flex-3 relative w-4/5 h-[100%] px-20 pr-[30%] py-20 overflow-y-auto ">

                <div className=" flex flex-row items-start justify-start pb-20 text-center text-[12px] text-black">
                    <div className="flex flex-row items-start justify-center pt-0 pb-[0.7209985256195068px]">
                        <div className="relative leading-[21.63px] cursor-pointer" onClick={() => window.history.back()}>Go back</div>
                    </div>
                </div>

                <div className="w-full border border-t-0 border-l-0 border-r-0 border-b border-slate-300">
                    <div className=" pb-7 pr-px justify-between items-start gap-44 flex w-full ">
                        <div className="self-stretch justify-center items-start inline-flex">
                            <div className="text-indigo-900 text-xl font-bold font-['Roboto'] leading-none pt-3.5">{stateValues?.customerName || ""}</div>
                        </div>
                        <div className="w-1/2 self-stretch pb-px flex-col justify-start items-end inline-flex">
                            <div className="w-full pl-36 justify-end items-start gap-1.5 inline-flex">
                                <div className="pr-0.5 pb-px justify-center items-center flex gap-1">
                                    <div className="text-indigo-900 text-2xl font-bold font-['Roboto'] leading-loose min-w-max">
                                        <CurrencyFormat value={stateValues?.amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"NGN "} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full justify-end items-start inline-flex">
                                <div className="text-right text-zinc-500 text-lg font-normal font-['Roboto'] leading-relaxed">{stateValues?.customerEmail || ""}</div>
                            </div>
                        </div>
                    </div>
                    <hr className="h-px mb-8 bg-slate-200 border-0" />
                </div>

                <div className="w-full h-full text-[13.71px] text-lightslategray flex flex-col items-center justify-center gap-7">

                    {children || ""}
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
                            <div className="text-indigo-900 text-xs font-bold font-['Roboto'] leading-tight tracking-wide">SECURED BY VESTRAYPAY</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[30%] h-[100%] min-h-[100vh] bg-indigo-900 bg-opacity-10 flex flex-col justify-center gap-0 items-start fixed right-0">

                <div className="w-8 h-8 absolute bg-white rounded-full flex justify-center items-center top-20 right-20 cursor-pointer" onClick={() => window.history.back()}>
                    <HiMiniXMark size={20} color={"black"} />
                </div>

                <div className="text-zinc-800  px-20 pt-7 pb-6 text-xl font-semibold font-['Roboto'] uppercase leading-none">Pay with</div>

                <div className={` ${payType == "card" ? "bg-white" : "bg-none"} w-5/6 h-max px-20 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`} onClick={() => changePaymentType("/payment-gateway/card")}>
                    <div className=" justify-center items-start flex">
                        <div className={` ${payType == "card" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                            <HiCreditCard size={15} color={payType == "card" ? "white" : "gray"} />
                        </div>
                    </div>
                    <div className="px-px pb-px justify-center items-start flex">
                        <div className={`${payType !== "card" ? "text-gray-400" : "text-indigo-900"} text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                            Card</div>
                    </div>
                </div>

                <div className={` ${payType == "ussd" ? "bg-white" : "bg-none"} w-5/6 h-max px-20 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`} onClick={() => changePaymentType("/payment-gateway/ussd")}>
                    <div className=" justify-center items-start flex">
                        <div className={` ${payType == "ussd" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                            <HiMiniHashtag size={20} color={payType == "ussd" ? "white" : "gray"} />
                        </div>
                    </div>
                    <div className="px-px pb-px justify-center items-start flex">
                        <div className={`${payType !== "ussd" ? "text-gray-400" : "text-indigo-900"} text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                            USSD</div>
                    </div>
                </div>

                <div className={` ${payType == "transfer" ? "bg-white" : "bg-none"} w-5/6 h-max px-20 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`} onClick={() => changePaymentType("/payment-gateway/transfer")}>
                    <div className=" justify-center items-start flex">
                        <div className={` ${payType == "transfer" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                            <HiBuildingLibrary size={20} color={payType == "transfer" ? "white" : "gray"} />
                        </div>
                    </div>
                    <div className="px-px pb-px justify-center items-start flex">
                        <div className={`${payType !== "transfer" ? "text-gray-400" : "text-indigo-900"} text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                            Bank Transfer</div>
                    </div>
                </div>

                <div className={` ${payType == "payment-link" ? "bg-white" : "bg-none"} w-5/6 h-max px-20 pt-7 pb-6 rounded-tr-lg rounded-br-lg justify-start items-center gap-6 inline-flex cursor-pointer`} onClick={() => changePaymentType("/payment-gateway/payment-link")}>
                    <div className=" justify-center items-start flex">
                        <div className={` ${payType == "payment-link" ? "bg-indigo-900" : " bg-gray-300"} w-10 h-10 relative rounded-full flex justify-center items-center`}>
                            <HiMiniLink size={20} color={payType == "payment-link" ? "white" : "gray"} />
                        </div>
                    </div>
                    <div className="px-px pb-px justify-center items-start flex">
                        <div className={`${payType !== "payment-link" ? "text-gray-400" : "text-indigo-900"} text-center text-xl font-semibold font-['Inter'] leading-relaxed`}>
                            Payment Link</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;