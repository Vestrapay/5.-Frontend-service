import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { useNewUserContext } from "../../context/newUserContext";
import { useAuthContext } from "../../context/AuthContext";

const AdminPaymentNavBar = ({ name, func }: any) => {

    const { setIsCreateUser, setIsEditUser } = useNewUserContext();

    const { userType } = useAuthContext()

    const [userTypeValue, setUserTypeValue] = useState("USER")

    useEffect(() => {
        setUserTypeValue(userType)
    }, [userType])

    return (
        <div className="flex justify-between mt-10">
            <p className="text-ultraMarine text-2xl flex justify-start">{`${name} List`}</p>
            <div
                onClick={func}
                className="flex justify-end items-center text-card"
            >
                <p className="text-sm w-fit h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white gap-3 cursor-pointer hover:bg-opacity-95 active:bg-opacity-80 whitespace-nowrap capitalize">
                    <AiOutlinePlus className="text-sm " />
                    New {`${name}`}
                </p>
            </div>
        </div>
    );
};

export default AdminPaymentNavBar;
