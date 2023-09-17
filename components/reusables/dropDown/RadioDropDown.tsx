/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, Fragment, Children } from "react";
import { RadioGroup, Transition } from '@headlessui/react'
import { BsCheck } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { ItemDropDownProps } from './interface'


const RadioDropDown = ({
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


    return (
        <div className={`${containerVariant} w-full relative z-5`}>
            <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
                {label} {required ? <span className='text-red-100'>*</span> : ""}
            </label>
            <RadioGroup value={value} onChange={(e:any) => onHandleChange} defaultValue={""}>
                <div className="relative mt-1">
                    <div className={`${variant}`}>
                        <>
                            <div className={`${innerVariant}`}>
                                <>
                                    {children}
                                </>
                            </div>
                        </>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        show={true}
                    >
                        <div className={`absolute text-left mt-1 scrollbar-hide max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-gray-light ring-opacity-1 focus:outline-none sm:text-sm ${optionContainerVariant}`}>
                            {options.map((item: any, index: React.Key | any | null | undefined ) => (
                                <RadioGroup.Option
                                    key={`${item.value}-${index}`}
                                    className={`relative cursor-default ${index < options.length?"border-b":""} border-gray-lighter select-none py-2 text-lg font-[Inter-Medium] text-black-100 ${optionVariant}`}
                                    value={item}
                                    onClick={(e: any) => onHandleShowOption}
                                >
                                    {item}
                                </RadioGroup.Option>
                            ))
                            }
                            {
                                addBtn && (
                                    <div className={` ${btnvariant} px-3 h-10 flex items-center cursor-pointer`}>
                                        {addBtn}
                                    </div>
                                )
                            }
                        </div>
                    </Transition>
                </div>
            </RadioGroup>
        </div>



    );
};

export default RadioDropDown;