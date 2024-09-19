import React, { useState } from "react";
import Modal from "../modal/Modal";
import { DefaultButton, DefaultInput } from "../reusables";
import { LgQuestionModalIcon } from "../reusables/icons";
import { LoginErrorCard } from "@utils/actions/error";
import router from "next/router";
import { useNewTransContext } from "context/transactionContext";
import { Storage } from "@utils/inAppstorage";

export default function StartTransaction({
    show,
    setShow,
    data,
    type
}: any) {

    const { amount, setAmount, setEmail, setMerchant, setBusiness, setPayType } = useNewTransContext()

    const { details } = Storage.getItem("userDetails") || {}


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setAmount(e.target.value);
        setEmail(details?.email || "");
        setMerchant(details?.merchantId || "");
        setBusiness(details?.businessName || "")
        setPayType(type || router?.asPath || "/payment-gateway")
    }

    return (
        <Modal show={show} clicked={setShow}>
            <div className="flex flex-row gap-8 justify-around items-start max-w-[75vw] mb-10">
                <div className=" min-w-[25vw] overflow-none w-11/12 relative">
                    <div className=" flex flex-col my-5 w-full justify-center items-center">
                        <div className="my-3 flex justify-center items-center">
                            <LgQuestionModalIcon />
                        </div>
                        <div className="my-3 flex flex-col gap-5">
                            <p className=" w-full text-2xl font-700 text-center">
                                Trying to make a payment?
                            </p>
                            <p className="text-gray-900 w-full text-base font-300 leading-7 mt-3 text-center">
                                Enter the amount you would like to pay.
                            </p>
                        </div>

                        <DefaultInput
                            type="tel"
                            name="amount"
                            label="Amount"
                            topLabel="Amount"
                            placeHolder="Enter Amount"
                            checkNum={true}
                            containerVariant="w-full py-2"
                            value={amount}
                            handleChange={handleChange}
                        />


                        <div className="my-3 flex flex-col sm:flex-row gap-5 justify-center items-center ">
                            <DefaultButton
                                labelText="Continue"
                                handleClick={() => router.push(data || "/payment-gateway")}
                            />
                            <button
                                onClick={() => setShow(false)}
                                className=" h-[50px] rounded-[200px] text-red-500 border-none font-500 p-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
