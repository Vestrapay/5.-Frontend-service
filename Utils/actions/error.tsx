import React from 'react'
import { BsX } from 'react-icons/bs';
import { lecPropTypes } from '../types';
import { notify } from "./toaster";
import { SmErrorModalIcon } from "@/components/reusables/icons";



export const LoginErrorCard = ({ textVariant = "", containerVariant = "", error = "", handleClick = () => undefined, handleClear = () => undefined }: lecPropTypes) => {
    return (
        <div className={`relative w-full bg-red-light rounded-md border-l-4 border-red-error px-4 py-3 my-5 flex items-center ${containerVariant}`}>
            <p className={`text-gray-900  w-fit text-sm font-400 leading-5 pr-5 ${textVariant}`}> {error} </p>
            <div onClick={handleClear} className='absolute right-0 pr-3 cursor-pointer' >
                <BsX color="#EB0B00" size={30} />
            </div>
        </div>
    )
}

export default function errorAlert({ title, text, errors, icon }: any) {

    return notify({ header: `${title ? title : "An Error occured!"}`, details: text ? text : "Something went wrong, please try again later.", icon: <SmErrorModalIcon />, errors: errors })
}
