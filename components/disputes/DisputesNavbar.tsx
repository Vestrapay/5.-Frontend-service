import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { useNewDisputeContext } from "../../context/disputeLogContext";
import { useAuthContext } from "../../context/AuthContext";

const DisputesNavbar = ({ name }: any) => {

    const { isCreateDispute, setIsCreateDispute, isEditDispute,
        setIsEditDispute, isViewDispute, setIsViewDispute } = useNewDisputeContext();


    const { userType } = useAuthContext()

    return (
        <div className="flex justify-between mt-10">
            <p className="text-ultraMarine text-2xl flex justify-start">{`${name}` || "Dispute"} List</p>
            <div
                onClick={() => {
                    setIsCreateDispute(true)
                    setIsEditDispute(false)
                    setIsViewDispute(false)
                }}
                className="flex justify-end items-center text-card"
            >
                {name ? "" : <p className="text-sm w-[130px] h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white gap-3 cursor-pointer hover:bg-opacity-95 active:bg-opacity-80 whitespace-nowrap capitalize">
                    <AiOutlinePlus className="text-sm " />
                    New Dispute
                </p>}
            </div>
        </div>
    );
};

export default DisputesNavbar;