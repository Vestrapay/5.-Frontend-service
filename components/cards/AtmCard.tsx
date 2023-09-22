
import React from 'react';
import Image from "next/image";
import { CardLogo, Cloud, MasterCard } from "@public/assets";
import { RiVisaLine } from "react-icons/ri";

const AtmCard = ({ debitCardNumber = "000000000000", cardHolder = "Omonigho Isaiah", expiryDate = "00/00", cardProvider = "", isActivated=true }: any) => {

    const groups: string[] = []

    for (let i = 0; i < debitCardNumber.length; i += 4) {
        groups.push(debitCardNumber.slice(i, i + 4))
    }

    for (let i = 0; i < groups.length; i++) {
        if (i === 1 || i === 2) {
            groups[i] = "****"
        }
    }

    return (
        <div className={`flex relative w-[750px] h-[196px] ${isActivated ? "bg-slate-400" : "bg-selected"} rounded-xl flex-col p-5 drop-shadow-md`}>
            <Image src={CardLogo} alt={"card-logo"} className="flex mb-0" />
            <p className="opacity-50 text-card text-[8px]">PREMIUM ACCOUNT</p>
            <div className="flex gap-4 items-center justify-start tracking-widest">
                {
                    groups.map((group, index) => (
                        <p key={index} className="text-white text-[21px] font-quicksand tracking-widest">{group}</p>
                    ))
                }
            </div>
            <div className="flex justify-between items-center text-white my-6">
                <div className="flex flex-col">
                    <p className="text-[7px] m-0">Card holder</p>
                    <p className="text-white text-xs mt-1">{cardHolder}</p>
                </div>
                <div>
                    <p className="text-[7px] m-0">Expire date</p>
                    <p className="text-white text-xs mt-1">{expiryDate}</p>
                </div>
                {
                    cardProvider === "visa"
                        ? <RiVisaLine size={30} />
                        : <Image src={MasterCard} alt={"mastercard"} className="z-20" />
                }
            </div>
            <Image src={Cloud} alt={"cloud"} className="absolute right-0 bottom-0 z-0" />
        </div>
    );
};

export default AtmCard;