"use client"
import React from 'react';
import Image from "next/image";
import { LineHorizontal, ProfileImage3 } from "@reusables/images";
import { useNewUserContext } from "../../context/newUserContext";
import { MdCancel } from "react-icons/md";
import { UserDetailProps } from "@types";
import { BarcodeBorder, CallUser, MailFast, MapBig, Warehouse, UserCircle } from "react-huge-icons/bulk";
import { TableStatus } from '../reusables';
import { useNewTransContext } from 'context/transactionContext';

const UserDetails = ({ data }: { data: UserDetailProps }) => {

    const { isViewTrans, setIsViewTrans } = useNewTransContext()

    const formatKey = (key: string): string => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    };

    return (
        <div className="mx-5">
            <div className="flex flex-col items-center w-full relative border-block border-b border-gray-300 ">
                <MdCancel
                    onClick={() => setIsViewTrans(false)}
                    width={15} height={15}
                    className="text-red text-2xl opacity-40 absolute top-0 right-2 cursor-pointer hover:opacity-100 hover:scale-105 transition-all active:opacity-80 active:scale-100"
                />
                {/*TODO: Fetch the user's name from the API*/}
                <p className="text-xl text-ultraMarine font-semibold m-0">{data?.firstName || data?.businessName || ""} {data?.lastName || ""}</p>
                <p className="text-base text-unselected m-0">{data?.userType || ""}</p>

            </div>

            <div className="flex flex-col">
                <h3 className="font-500">Transaction Details</h3>
                <div className="">
                    {/* <hr className="h-px my-4 bg-gray-200 border-0 " /> */}
                    {data && data?.id && Object?.entries(data).map(([key, value]) => (
                        <>
                            <div className="flex items-center gap-2">
                                <p className="text-sm ml-2">
                                    <span className="font-bold text-gray-700">{formatKey(key) || ""}</span>:
                                </p>
                                <p className="text-sm text-unselected ml-2">
                                    {`${value !== null ? value.toString() : 'N/A' || ""}`}
                                </p>
                            </div>
                            <hr className="h-px my-1 bg-gray-200 border-0 " />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;