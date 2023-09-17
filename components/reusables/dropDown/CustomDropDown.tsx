/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, Fragment, Children } from "react";
import { Combobox, Transition } from '@headlessui/react'
import { BsCheck } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { ItemDropDownProps } from './interface'


const CustomDropDown = ({
    label,
    placeHolder = "",
    onHandleShowOption,
    onHandleChange,
    placeholderTitle,
    value,
    error,
    options,
    variant,
    valueVariant,
    containerVariant,
    addBtn,
    btnvariant,
    innerVariant,
    optionContainerVariant,
    optionVariant,
    required,
    children
}: ItemDropDownProps) => {


    const handleSelect = (item: any) => {
        //Send selected to form
        console.log("combo : clicked",)
        onHandleShowOption && onHandleShowOption(false)
        //Send to form
        onHandleChange(null, item)
    }

    return (
        <div onClick={() => console.log("clicked", options)} className={`${containerVariant} w-full relative z-5`}>
            <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
                {label} {required ? <span className='text-red-100'>*</span> : ""}
            </label>
            <Combobox value={value} onChange={(e: any) => onHandleChange} defaultValue={""}>
                <div className="relative">
                    <div className={`${variant}`}>
                        <>

                            <Combobox.Button
                                className={`${innerVariant}`}>
                                <>
                                    {children}
                                </>
                            </Combobox.Button>
                        </>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options className={`absolute text-left mt-1 scrollbar-hide max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-gray-light ring-opacity-1 focus:outline-none sm:text-sm ${optionContainerVariant}`}>
                            {options.map((item: any, index: React.Key | any | null | undefined) => (
                                <Combobox.Option
                                    key={`${index}`}
                                    className={`relative cursor-default ${index < options.length - 1 ? "border-b" : ""} border-gray-lighter select-none py-2 text-lg text-black-100 ${optionVariant}`}
                                    value={item}
                                    onClick={(e: any) => handleSelect(item)}
                                >
                                    {item}
                                </Combobox.Option>
                            ))
                            }
                            {
                                addBtn && (
                                    <div className={` ${btnvariant} px-3 h-10 flex items-center cursor-pointer`}>
                                        {addBtn}
                                    </div>
                                )
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>



    );
};

export default CustomDropDown;