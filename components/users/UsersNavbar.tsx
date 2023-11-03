import React from 'react';
import {DateTimePicker} from "@mui/x-date-pickers";
import {AiOutlinePlus} from "react-icons/ai";
import {useNewUserContext} from "../../context/newUserContext";
import {Storage} from "@utils/inAppstorage";

const UsersNavbar = () => {

    const {setIsCreateUser, setIsEditUser} = useNewUserContext();

    const { isSuperAdmin } = Storage.getItem("userDetails") || {}

    return (
        <div className="flex justify-between  mt-10 ">
            <p className="text-ultraMarine text-2xl flex justify-start">User's List</p>
            <div
                onClick={() => {
                    setIsCreateUser(true)
                    setIsEditUser(false)
                }}
                className="flex justify-end items-center text-card"
            >
                <p className="text-sm w-[130px] h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white gap-3 cursor-pointer hover:bg-opacity-95 active:bg-opacity-80 whitespace-nowrap">
                    <AiOutlinePlus className="text-sm whitespace-nowrap"/>
                    New {`${!isSuperAdmin ? "User" : "Admin"}`}
                </p>
            </div>
        </div>
    );
};

export default UsersNavbar;