import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { useNewUserContext } from "../../context/newUserContext";
import { useAuthContext } from "../../context/AuthContext";

const UsersNavbar = ({ type }: any) => {

    const { setIsCreateUser, setIsEditUser } = useNewUserContext();

    const { userType } = useAuthContext()

    const [userTypeValue, setUserTypeValue] = useState("USER")

    useEffect(() => {
        setUserTypeValue(userType)
    }, [userType])

    return (
        <div className="flex justify-between mt-10">
            <p className="text-ultraMarine text-2xl flex justify-start">{`${type || "User"}'s List`}</p>
            {userTypeValue === "USER" || type == "Admin" ?
                <div
                    onClick={() => {
                        setIsCreateUser(true)
                        setIsEditUser(false)
                    }}
                    className="flex justify-end items-center text-card"
                >
                    <p className="text-sm w-[130px] h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white gap-3 cursor-pointer hover:bg-opacity-95 active:bg-opacity-80 whitespace-nowrap capitalize">
                        <AiOutlinePlus className="text-sm " />
                        New {`${userTypeValue === "USER" ? "User" : "Admin"}`}
                    </p>
                </div>
                : ""}
        </div>
    );
};

export default UsersNavbar;