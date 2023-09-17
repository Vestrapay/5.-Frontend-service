/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, Fragment, Children } from "react";
import { Combobox, Transition } from '@headlessui/react'
import { BsSearch } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { ItemDropDownProps } from './interface'


const CustomInputDropDown = ({
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
    buttonVariant,
    addBtn,
    btnvariant,
    innerVariant,
    optionContainerVariant,
    optionVariant,
    required,
    children,
    buttonContent,
    optionValues,
    isDisabled
}: ItemDropDownProps) => {

    const [defaultValue, setDefaultValue] = useState("");
    const [showOption, setShowOption] = useState(false);
    const [dropSearchValue, setDropSearchValue] = useState("")

    //Variable for filteering options
    const filteredOptions =
        dropSearchValue === ''
            ? options
            : options.filter((selected: any) => selected.label
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(dropSearchValue.toLowerCase().replace(/\s+/g, ''))
            )


    useEffect(() => {
        setDefaultValue(value);
    },[]);

    const handleSelect = (item: any) => {
        //Send selected to form
        setDefaultValue(item);
        setShowOption(false);
        onHandleShowOption && onHandleShowOption(false)
        //Send to form
        onHandleChange(null, JSON.stringify(item))
    };

    return (
        <div className={`relative z-5 ${containerVariant}`}>
            <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
                {label} {required ? <span className='text-red-100'>*</span> : ""}
            </label>
            <Combobox value={value} onChange={(e: any) => onHandleChange}>
                <div className="relative">
                    <div className={`${variant}`}>
                        <>
                            <Combobox.Button
                                className={`${buttonVariant}`}>
                                <>
                                    {buttonContent}
                                </>
                            </Combobox.Button>
                            {children}
                        </>
                    </div>
                    {isDisabled ? null :
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Combobox.Options className={`absolute left-0 text-center bg-primary-white max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-gray-light ring-opacity-1 focus:outline-none sm:text-sm ${optionContainerVariant}`}>
                                <div className="relative my-4 px-4 bg-primary-white">
                                    <BsSearch className="absolute ml-3 z-100 top-[26.5px] w-4 h-4 -mt-3 cursor-pointer" color="#999" />
                                    <Combobox.Input
                                        className="w-full pl-8 border-none py-3 focus:ring-1 focus:ring-gray-light focus:border-opacity-1 focus:border-gray-light leading-1 pr-12s text-black-100 text-sm  bg-blue-100 rounded-lg  placeholder:text-gray-500 font-[Inter-Regular]"
                                        displayValue={(selected: any) => selected}
                                        onChange={(event) => setDropSearchValue(event.target.value)}
                                        onBlur={(e: any) => setShowOption(false)}
                                        placeholder={"Search"}
                                    />
                                </div>
                                {filteredOptions.map((item: any, index: React.Key | any | null | undefined) => (
                                    <Combobox.Option
                                        key={`${index}`}
                                        className={`relative text-center mt-1 xxs:scrollbar-hide thin-scrollbar max-h-60 
                                        w-full z-[100] overflow-auto rounded-md bg-primary-white py-1 text-base shadow-md ring-1 ring-gray-200 
                                        ring-opacity-1 focus:outline-none sm:text-sm ${optionVariant}`}
                                        value={item}
                                        onClick={(e: any) => onHandleShowOption}
                                    >
                                        <>
                                            {optionValues(item, index)}
                                        </>
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
                    }
                </div>
            </Combobox>
        </div>



    );
};

export default CustomInputDropDown;