
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import React, { forwardRef, useState, useEffect } from 'react'
import { DefaultInputType } from '../types';
import { SmPasswordCheckIcon, SmCheckIcon } from '../icons'

const DefaultInput = forwardRef<any, any>(({
    type,
    name,
    label,
    topLabel,
    handleChange = () => null,
    handleBlur,
    value,
    error,
    validate,
    confirm,
    maxLength = 1000,
    minLength = 0,
    validationFunc = () => null,
    placeHolder,
    variant,
    inputVariant,
    labelVariant,
    containerVariant,
    icon,
    required,
    confirmPassword = false,
    compare,
    readOnly,
    checkNum,
    isDisabled = false
}: DefaultInputType) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [min, setMin] = useState(false)
    const [cap, setCap] = useState(false)
    const [low, setLow] = useState(false)
    const [num, setNum] = useState(false)

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    useEffect(() => {
        if (value?.length >= 8) {
            setMin(true)
        } else if (value?.length < 8) {
            setMin(false);
            validationFunc();
        }
        if (/\d/.test(value)) {
            setNum(true)
        } else if (!/\d/.test(value)) {
            setNum(false)
        }
        if (/[a-z]/.test(value)) {
            setLow(true)
        } else if (!/[a-z]/.test(value)) {
            setLow(false)
        }
        if (/[A-Z]/.test(value)) {
            setCap(true)
        } else if (!/[A-Z]/.test(value)) {
            setCap(false)
        }
        if (min && cap && low && num) {
            validationFunc()
        }
    }, [value])


    const onChange = (e: any) => {
        const pattern = /^\d*\.?\d*$/
        const whiteSpace = /[\s]/

        if (type == "password" && (whiteSpace.test(e.target.value) || "")) {
            return null
        }

        if (checkNum) {
            if (pattern.test(e.target.value) || "") {
                handleChange(e);
            }
        } else {
            handleChange(e);
        }
    }

    return (
        <div className={containerVariant}>
            {label &&
                <label htmlFor={`input${name}`} className={`text-gray-200 ${labelVariant}`}>
                    {topLabel} {required ? <span className='text-red-100'>*</span> : ""}
                </label>
            }

            <div className={`relative group w-full leading-6 text-sm font-500 border px-6 py-0 rounded-lg 
            ${type === 'password' ? "pr-[57.5px]" : validate ? "pr-[77.5px]" : ""} ${topLabel ? "mt-2" : ""}  ${!isDisabled ? "bg-blue-darker" : "bg-blue-darkish"} 
            ${error ? 'border-red-500 focus:border-red-500' : confirm ? ' border-green-500' : 'border-gray-800 focus:border-black-200'} ${variant}`}
            >
                {icon}
                <input
                    id={`${label}-input${name}`}
                    name={name}
                    maxLength={maxLength}
                    minLength={minLength}
                    type={type === 'password' && passwordShown ? 'text' : type}
                    onChange={onChange}
                    onBlur={handleBlur}
                    value={value}
                    placeholder={placeHolder}
                    disabled={isDisabled}
                    required={required || false}
                    readOnly={readOnly || false}
                    className={`outline-none focus:border-none placeholder:text-primary-white text-gray-300 placeholder:text-sm placeholder:min-w-max w-full
                    leading-6 text-sm font-500 px-0 py-5 group-focus-within:pt-7 group-focus-within:pb-3 ${value ? "pt-7 pb-3" : ""} 
                    bg-[#ffffff00] ${icon ? "pl-0" : ""} focus:border-gray-500 ${inputVariant}`}
                />
                <label
                    htmlFor={`${label}-input${name}`}
                    className={`leading-6 transform transition-all absolute top-0 left-0 h-full flex items-center pl-6 text-sm text-gray-500 
                    group-focus-within:text-xs peer-valid:text-xs 
                    group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:pt-4
                    group-focus-within:-translate-y-[1/2] peer-valid:-translate-y-full peer-valid:-translate-x-[1/2] 
                    group-focus-within:pl-6 peer-valid:pl-6 ${value ? "text-xs h-1/2 -translate-y-[1/2] pb-4" : ""}`}
                >
                    {label || name}
                </label>
            </div>
            {type === 'password' ?
                <>
                    <div className='relative cursor-pointer flex items-center justify-center'>
                        <span className={`absolute bottom-5 text-gray-500 ${validate ? "right-12" : "right-6"}`} onClick={togglePasswordVisiblity}>
                            {passwordShown ? <AiOutlineEyeInvisible size={25} color="#284DE3" /> : <AiOutlineEye size={25} color="blue" />}
                        </span>
                    </div>

                    {!validate ? null :
                        <div className={`relative cursor-pointer flex items-center justify-center`}>
                            <div className="absolute mb-1.5 bottom-4 right-4 flex flex-col items-center group">
                                <SmPasswordCheckIcon />
                                <div className="absolute bottom-0 flex flex-col items-center  mb-6 hidden group-hover:flex min-w-[100%]">
                                    <div className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap bg-[#181d32] shadow-lg rounded-md border-black-200  min-w-[260px] px-4 py-4">
                                        <div>
                                            <div className='flex gap-2 items-center font-300 text-xs text-gray-200 py-2'>
                                                <span>
                                                    {min ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                                                </span>
                                                <span>Minimum number of characters: 8</span>
                                            </div>
                                            <div className='flex gap-2 items-center font-300 text-xs text-gray-200 py-2'>
                                                <span>
                                                    {cap ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                                                </span>
                                                <span>Contains a capital letter</span>
                                            </div>
                                            <div className='flex gap-2 items-center font-300 text-xs text-gray-200 py-2'>
                                                <span>
                                                    {low ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                                                </span>
                                                <span>Contains a lowercase letter</span>
                                            </div>
                                            <div className='flex gap-2 items-center font-300 text-xs text-gray-200 py-2'>
                                                <span>
                                                    {num ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                                                </span>
                                                <span>Contains a number</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-3 h-3 -mt-2 rotate-45  shadow-md rounded-md "></div>
                                </div>
                            </div>
                        </div>
                    }
                </>
                : ''}
            {
                error && error != "" ?
                    (<p className="text-red-500 text-xs h-auto py-1">{error}</p>) :
                    confirmPassword && compare !== value && compare !== "" ?
                        (<p className="text-red-500 text-xs h-auto py-1">{"Your passwords do not match"}</p>) :
                        confirmPassword && compare == value && compare !== "" ?
                            (<p className="text-green-500 text-xs h-auto py-1">{"Your passwords match"}</p>)
                            : ""
            }
        </div>
    );
});

DefaultInput.displayName = 'DefaultInput';

export default DefaultInput;
