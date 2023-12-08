/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, Fragment, Children } from "react";
import useOutsideAlerter from "Utils/hooks/useOutsideAlerter";
import { Combobox, Popover, Transition } from '@headlessui/react'
import { BsCheck } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { ItemDropDownProps } from './interface';


const PopDropDown = ({
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
    outerContainerVariant,
    optionVariant,
    list = false,
    hasOptions = true,
    required,
    func = () => null,
    checker = false,
    children
}: ItemDropDownProps) => {

    let poperId = String(Math.floor(Math.random() * 100) * Date.now())

    const [show, setShow] = useState<boolean>(false)
    const wrapperRef = useRef<any>(null);

    const showModal = () => { setShow(prevShoW => (false)) }

    useOutsideAlerter(wrapperRef, () => { func(true); showModal; return "Please" });

    useEffect(() => {

        const handleClick = (e: any) => {

            if (wrapperRef?.current?.contains(e.target)) {
                return
            }
            func(true);
            showModal();
        }

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [wrapperRef])

    return (
        <>
            <div className={` ${outerContainerVariant}`}>
                <div className={`${containerVariant} z-5 my-0 mx-auto`}>
                    <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
                        {label} {required ? <span className='text-red-100'>*</span> : ""}
                    </label>
                    <Popover onChange={(e: any) => onHandleChange} defaultValue={""}>
                        <div className="relative">
                            <div className={`${variant}`}>
                                <>
                                    <Popover.Button
                                        className={`bg-[#fff] ${innerVariant}`}
                                        onClick={() => { !list ? setShow(!show) : func(); }}
                                    >
                                        <>
                                            {children}
                                        </>
                                    </Popover.Button>
                                </>
                            </div>
                        </div>
                    </Popover>
                </div>
                {
                    !hasOptions ? null :
                        // <Transition
                        //     as={Fragment}
                        //     leave="transition ease-in duration-100"
                        //     leaveFrom="opacity-100"
                        //     leaveTo="opacity-0"
                        //     show={!list ? show : checker}
                        // >
                        (!list ? show : checker) ?
                            <div id={poperId} className={` flex flex-col
                    absolute z-100 text-left mt-1  max-h-60 w-full z-10 
                    overflow-x-hide overflow-y-auto rounded-md  bg-blue-dark
                    py-1 text-sm shadow-md
                    focus:outline-none sm:text-sm ${optionContainerVariant}`}>
                                {options.map((item: any, index: React.Key | any | null | undefined) => (
                                    <div
                                        key={`${index}`}
                                        className={`relative cursor-default 
                                ${index < options.length - 1 ? "border-b" : ""} 
                                border-gray-600 select-none
                                 ${optionVariant}`}
                                    // value={item}
                                    // onClick={(e: any) => onHandleShowOption}
                                    >
                                        {item}
                                    </div>
                                ))
                                }
                            </div>
                            : null
                    // </Transition>
                }
            </div>
        </>
    );
};

export default PopDropDown;