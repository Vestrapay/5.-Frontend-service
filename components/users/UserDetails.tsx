"use client"
import React from 'react';
import Image from "next/image";
import {LineHorizontal, ProfileImage3} from "@public/assets";
import {useNewUserContext} from "../../context/newUserContext";
import {MdCancel} from "react-icons/md";
import {Property} from "csstype";
import GridRow = Property.GridRow;
import {UserDetailProps} from "@types";
import {CallUser, MailFast, MapBig} from "react-huge-icons/bulk";

const UserDetails = ({data}:{data: UserDetailProps}) => {

    const {setIsEditUser} = useNewUserContext();

    return (
        <>
            <div className="flex flex-col items-center w-full relative">
                <Image src={ProfileImage3} alt={"profile"}
                       width={70} height={70}
                       className="rounded-full bg-red-300 mb-[16px]"
                />
                <MdCancel
                    onClick={() => setIsEditUser(false)}
                    width={15} height={15}
                    className="text-red text-2xl opacity-40 absolute top-0 right-2 cursor-pointer hover:opacity-100 hover:scale-105 transition-all active:opacity-80 active:scale-100"
                />
                {/*TODO: Fetch the user's name from the API*/}
                <p className="text-xl text-ultraMarine font-semibold m-0">{data?.firstName} {data?.lastName}</p>
                <p className="text-base text-unselected m-0">Front Desk Officer</p>
                <Image src={LineHorizontal} alt={"line"} height={1} className="my-10"/>
            </div>

            <div className="flex flex-col">
                <p>Contact Info</p>
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <MailFast className={"w-5 h-5 text-unselected m-0"}/>
                        <p className="text-sm text-unselected ml-2">{data?.email}</p>
                    </div>
                    <Image src={LineHorizontal} alt={"line"} height={1} className="my-2"/>
                    <div className="flex items-center">
                        <CallUser className={"w-5 h-5 text-unselected m-0"}/>
                        <p className="text-sm text-unselected ml-2">{data?.phone}</p>
                    </div>
                    <Image src={LineHorizontal} alt={"line"} height={1} className="my-2"/>
                    <div className="flex items-center">
                        <MapBig className={"w-5 h-5 text-unselected m-0"}/>
                        <p className="text-sm text-unselected ml-2">{data?.address}</p>
                    </div>
                    <Image src={LineHorizontal} alt={"line"} height={1} className="my-2"/>
                </div>
            </div>
        </>
    );
};

export default UserDetails;