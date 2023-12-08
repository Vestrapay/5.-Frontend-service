"use client"
import React from 'react';
import Image from "next/image";
import { LineHorizontal, ProfileImage3 } from "@reusables/images";
import { useNewUserContext } from "../../context/newUserContext";
import { MdCancel } from "react-icons/md";
import { UserDetailProps } from "@types";
import { BarcodeBorder, CallUser, MailFast, MapBig, Warehouse, UserCircle } from "react-huge-icons/bulk";
import { DefaultButton, TableStatus } from '../reusables';
import { ComplianceController } from 'containers/complianceApi';

const UserDetails = ({ data }: { data: UserDetailProps }) => {

    const { setIsViewKyc } = useNewUserContext();
    const { handleDownload, stateValues } = ComplianceController(data);
    return (
        <div className="mx-5">
            <div className="flex flex-col items-center w-full relative border-block border-b border-gray-300 ">
                {/* <Image src={ProfileImage3} alt={"profile"}
                    width={100} height={100}
                    className="rounded-full bg-red-300 mt-20 mb-7"
                /> */}
                <div className="flex justify-center items-center p-10 bg-slate-100 rounded-full mt-20 mb-7">
                    <UserCircle className={"w-10 h-10 text-unselected rounded-full "} />
                </div>
                <MdCancel
                    onClick={() => setIsViewKyc(false)}
                    width={15} height={15}
                    className="text-red text-2xl opacity-40 absolute top-0 right-2 cursor-pointer hover:opacity-100 hover:scale-105 transition-all active:opacity-80 active:scale-100"
                />
                {/*TODO: Fetch the user's name from the API*/}
                <p className="text-xl text-ultraMarine font-semibold m-0">{data?.firstName || data?.businessName || ""} {data?.lastName || ""}</p>
                <p className="text-base text-unselected m-0">{data?.userType || ""}</p>

            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex flex-col">
                <p>User Info</p>
                <div className="">
                    <div className="flex items-center">
                        <MailFast className={"w-5 h-5 text-unselected m-0"} />
                        <p className="text-sm text-unselected ml-2">{data?.email}</p>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex items-center">
                        <Warehouse className={"w-5 h-5 text-unselected m-0"} />
                        <p className="text-sm text-unselected ml-2">{"Merchant Id - " + data?.merchantId || ""}</p>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex items-center">
                        <BarcodeBorder className={"w-5 h-5 text-unselected m-0"} />
                        <p className="text-sm text-unselected ml-2">{`Uploaded Documents : ${data?.requiredDocuments?.replace("[", "").replace("]", "") || "none"}`}</p>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex items-center gap-5">
                        <p className="text-sm text-unselected ml-2">{"KYC Status: "}</p>
                        <p className={`${data?.kycCompleted ? "bg-green-50 text-white-600" : "bg-red-50 text-red-400"} w-fit px-5 py-3 h-1/2 text-center capitalize rounded-lg flex items-center justify-center`}>
                            {`${data?.kycCompleted ? "Complete" : "Incomplete"}` || ""}
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <p className="text-sm text-unselected ml-2">{"KYC Actions: "}</p>
                        <DefaultButton
                            labelText="Download Documents"
                            type="secondary"
                            handleClick={handleDownload}
                            isLoading={stateValues?.isSubmitting}
                        />
                    </div>
                    {/* <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" /> */}

                </div>
            </div>
        </div>
    );
};

export default UserDetails;