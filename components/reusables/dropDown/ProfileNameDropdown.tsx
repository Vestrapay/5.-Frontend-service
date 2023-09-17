import React from "react";
import LogOutIcon from "@/public/assets/svgs/log-out.svg";
import ViewProfileIcon from "@/public/assets/svgs/eye-icon.svg";
import Image from "next/image";
import router from "next/router";

export default function ProfileNameDropdown() {

  return (
    <div 
      className="w-[231px] bg-white rounded-lg shadow absolute top-2 z-10  left-[-195px]">
      <ul>
        <li 
        className="h-12 flex items-center px-6 hover:bg-gray-550"
        onClick={()=>router.push("/settings/general-settings?activeTab=personal-information") }
        >
          <Image src={ViewProfileIcon} alt='Icon' />
          <p className="pl-[10px] text-black-200 font-[Inter-Regular]">View profile</p>
        </li>
        <div className="bg-[#DEE0E3] h-[1px] w-full"></div>
        <li  className="h-12 flex items-center px-6 hover:bg-gray-550">
          <Image src={LogOutIcon}  alt='Icon' />
          <p className="pl-[10px] text-red-100 font-[Inter-Regular]">Logout</p>
          
        </li>
      </ul>
    </div>
  );
}
