/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, Fragment } from "react";
import { Combobox, Transition } from '@headlessui/react'
import { BsCheck } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { ItemDropDownProps } from './interface'


const ItemDropDown = ({
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
    required,
    preIcon,
    postIcon
}: ItemDropDownProps) => {

    type item = {
        [key: string]: any;
    }
    //Business category
    const [defaultValue, setDefaultValue] = useState("");
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        setDefaultValue(value || placeHolder);
    },[]);

    const handleSelect = (item: any) => {
        //Send selected to form
        
        setDefaultValue(item?.label);
        setShowOption(false);
        onHandleShowOption && onHandleShowOption(false)
        //Send to form
        onHandleChange(null, JSON.stringify(item))
    };


    return (
        <div className={`${containerVariant} w-full relative z-5`}>
            <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
                {label} {required ? <span className='text-red-100'>*</span> : ""}
            </label>
            <Combobox value={defaultValue} onChange={(item) => console.log(item)/*handleSelect*/} defaultValue={""}>
                <div className="relative mt-1">
                    <div className={`${variant} ${error ? 'border-red-500 mb-1' : ''} relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none  focus-visible:ring-offset-0 sm:text-sm`}>
                        <>
                            <Combobox.Button
                                className={`w-full border flex justify-between items-center cursor-pointer border-gray-light py-3 pl-2.5 leading-1 pr-3 text-black-100 text-sm  focus:bg-blue-100 focus:border-[0.5px] rounded-lg   placeholder:text-black-100 text-sm font-[Inter-Regular] ${innerVariant}`}
                                onClick={(e: any) => setShowOption(!showOption)}>
                                <>
                                    <span className=" min-w-max inset-y-0 left-0 flex items-center pl-2"> {preIcon ?? preIcon} </span>
                                    <Combobox.Input
                                        className={`w-full cursor-pointer border-none leading-1 text-black-100 text-sm placeholder:text-black-100 text-sm font-[Inter-Regular] bg-[#00000000] ${innerVariant}`}
                                        displayValue={(selected: any) => selected || ""}
                                        onChange={() => null}
                                        onBlur={(e: any) => setShowOption(false)}
                                        // disabled={true}
                                    />
                                    {(active: any) => console.log(active)}
                                    <span className="min-w-max inset-y-0 right-0 flex items-center ">
                                        {postIcon ?
                                            postIcon :
                                            !showOption ?
                                                <RiArrowDownSLine
                                                    color={"#4d4d4d"}
                                                    className="w-5 h-5 text-gray-200 font-[Inter-SemiBold]  absolute right-1.5 top-[35%] -mt-1 cursor-pointer"
                                                    size={10}
                                                /> :
                                                <RiArrowUpSLine
                                                    color={"#4d4d4d"}
                                                    className="w-5 h-5 text-gray-200 font-[Inter-Bold] absolute right-1.5 top-[35%] -mt-1 cursor-pointer"
                                                />}
                                    </span>
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
                        <Combobox.Options className="absolute text-left mt-1 scrollbar-hide max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-gray-light ring-opacity-1 focus:outline-none sm:text-sm">
                            {options.map((item: item, index: React.Key | null | undefined) => (
                                <Combobox.Option
                                    key={`${item.value}-${index}`}
                                    className={({ active }) =>
                                        `relative cursor-default border-b border-gray-lighter select-none py-2 text-lg font-[Inter-Medium]  ${active ? 'bg-gray-lighter text-black-100' : 'text-black-100'
                                        }`
                                    }
                                    value={item}
                                    onClick={(e: any) => handleSelect(item)}
                                >
                                    {({ selected, active }) => (
                                        <>

                                            <div className={`w-full h-auto flex flex-col justify-start px-2 block truncate text-lg ${selected ? ' font-[Inter-Medium]' : ' font-[inter-Regular]'}`}>
                                                <p className="text-xxs font-[Inter-Medium]">{item.placeholderTitle}</p>
                                                <p className="text-xs font-[inter-Regular] ml-2 my-1">{item.label}</p>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'
                                                        }`}
                                                >
                                                    <BsCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
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

export default ItemDropDown;