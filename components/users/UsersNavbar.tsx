import React from 'react';
import {DateTimePicker} from "@mui/x-date-pickers";
import {AiOutlinePlus} from "react-icons/ai";
import {useNewUserContext} from "../../context/newUserContext";

const UsersNavbar = () => {

    const {setIsCreateUser, setIsEditUser} = useNewUserContext();

    return (
        <div className="flex justify-between">
            <p className="text-ultraMarine text-2xl flex justify-start">User's List</p>
            <div
                onClick={() => {
                    setIsCreateUser(true)
                    setIsEditUser(false)
                }}
                className="flex justify-end items-center text-card"
            >
                <p className="text-sm w-[130px] h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white gap-3 cursor-pointer hover:bg-opacity-95 active:bg-opacity-80">
                    <AiOutlinePlus className="text-sm"/>
                    New User
                </p>
            </div>
        </div>
    );
};

export default UsersNavbar;