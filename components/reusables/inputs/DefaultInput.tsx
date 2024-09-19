
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import React, { forwardRef, useState, useEffect } from 'react'
import { DefaultInputType } from '../types';
import { SmPasswordCheckIcon, SmCheckIcon } from '../icons'
import CurrencyFormat from 'react-currency-format';

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
    checkEmail,
    info = "",
    noCheckPassword = false,
    textarea = false,
    isDisabled = false,
    payment = false
}: DefaultInputType) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const [min, setMin] = useState(false)
    const [cap, setCap] = useState(false)
    const [low, setLow] = useState(false)
    const [num, setNum] = useState(false)
    const [validity, setValidity] = useState(false)

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    useEffect(() => {
        if (value?.length >= 7) {
            setMin(true)
        } else if (value?.length < 7) {
            setMin(false);
            setValidity(false);
            validationFunc();
        }
        if (/\d/.test(value)) {
            setNum(true)
        } else if (!/\d/.test(value)) {
            setNum(false)
            setValidity(false);
        }
        if (/[a-z]/.test(value)) {
            setLow(true)
        } else if (!/[a-z]/.test(value)) {
            setLow(false)
            setValidity(false);
        }
        if (/[A-Z]/.test(value)) {
            setCap(true)
        } else if (!/[A-Z]/.test(value)) {
            setCap(false)
            setValidity(false);
        }
        if (min && cap && low && num) {
            validationFunc();
            setValidity(true);
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
                <label htmlFor={`input${name}`} className={`text-blackish font-300 ${labelVariant}`}>
                    {topLabel} {required ? <span className='text-red-500'>*</span> : ""}
                </label>
            }

            <div className={`${payment ? "" : "relative group w-full leading-6 text-sm font-500 border px-6 py-0 rounded-lg "}
            ${type === 'password' ? "pr-[57.5px]" : validate ? "pr-[77.5px]" : ""} ${topLabel ? "mt-2" : ""}  ${payment ? "w-full" : !isDisabled ? "bg-gray-50" : "bg-gray-200 text-gray-300"} 
            ${error ? 'border-red-500 focus:border-red-500' : confirm ? ' border-green-500' : ''} ${variant}`}>
                {icon}
                {textarea ?
                    <div>
                        {maxLength &&
                            <div className="right-5 top-[15px] absolute opacity-70 text-right text-slate-950 text-sm font-normal font-['Nunito']">{value?.length + "/" + maxLength}</div>}
                        <textarea
                            id={`${label}-input${name}-${Math.random()}`}
                            rows={5}
                            name={name}
                            value={value}
                            maxLength={maxLength}
                            minLength={minLength}
                            onChange={onChange}
                            placeholder={placeHolder || topLabel}
                            disabled={isDisabled}
                            required={required || false}
                            readOnly={readOnly || false}
                            className={`h-36 py-2 outline-none placeholder:text-gray-300 text-blackish placeholder:text-sm w-full placeholder:min-w-max border-none
         h-10 leading-6 text-sm font-300 px-0 py-3 bg-[#ffffff00] ${icon ? "pl-0" : ""} ${inputVariant}`}
                        />
                    </div> : type == 'currency' ?
                        <CurrencyFormat
                            className={` ${payment ? "rounded-none peer pl-12 pr-2 py-2.5 border-t-0 uppercase border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300" :
                                "outline-none placeholder:text-gray-300 text-blackish placeholder:text-sm placeholder:min-w-max w-full border-none leading-6 text-sm font-300 px-0 py-3 bg-[#ffffff00]"} ${icon ? "pl-0" : ""} ${inputVariant}`}

                            name={name}
                            value={value || "0"}
                            onChange={onChange}
                            maxLength={maxLength}
                            minLength={minLength}
                            placeholder={placeHolder || topLabel}
                            displayType={'input'}
                            disabled={isDisabled}
                            required={required || false}
                            readOnly={readOnly || false}
                            thousandSeparator={true}
                            prefix={'₦ '}
                            decimalScale={2}
                            fixedDecimalScale={true} />
                        :
                        <>
                            <input
                                id={`${label}-input${name}-${Math.random()}`}
                                name={name}
                                maxLength={maxLength}
                                minLength={minLength}
                                type={type === 'password' && passwordShown ? 'text' : type}
                                onChange={onChange}
                                onBlur={handleBlur}
                                value={value}
                                placeholder={placeHolder || topLabel || ""}
                                disabled={isDisabled}
                                required={required || false}
                                readOnly={readOnly || false}
                                pattern={type == "email" || name == "email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" : type == "password" || name == "password" ? "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" : ".*"}
                                className={` ${payment ? "rounded-none peer pl-12 pr-2 py-2.5 border-t-0 uppercase border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300" :
                                    "outline-none placeholder:text-gray-300 text-blackish placeholder:text-sm placeholder:min-w-max w-full border-none leading-6 text-sm font-300 px-0 py-3 bg-[#ffffff00]"} 
                                ${icon ? "pl-0" : ""} ${inputVariant} invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer `}
                            />
                            {(!validity && !noCheckPassword) &&
                                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block absolute -bottom-6">
                                    {`Please enter a valid ${name.replace(/[A-Z-_\&](?=[a-z0-9]+)|[A-Z-_\&]+(?![a-z0-9])/g, ' $&').trim().toLowerCase()}`}
                                </span>}
                        </>
                }
                {/* {label || name} */}
            </div>
            {type === 'password' ?
                <>
                    <div className='relative cursor-pointer flex items-center justify-center'>
                        <span className={`absolute bottom-1 text-gray-500 ${validate ? "right-12" : "right-6"}`} onClick={togglePasswordVisiblity}>
                            {passwordShown ? <AiFillEyeInvisible size={25} color="gray" /> : <AiFillEye size={25} color="gray" />}
                        </span>
                    </div>

                    {!validate ? null :
                        <div className={`relative cursor-pointer flex items-center justify-center`}>
                            <div className="absolute mb-1.5 bottom-1 right-4 flex flex-col items-center group">
                                <SmPasswordCheckIcon />
                                <div className="absolute bottom-0 flex flex-col items-center mb-6 hidden group-hover:flex min-w-[100%]">
                                    <div className="relative z-10 p-2 -left-1 text-xs leading-none  whitespace-no-wrap bg-[#181d32] shadow-lg rounded-md border-black-200  min-w-[260px] px-4 py-4">
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
                    (<span className="text-red-500 text-xs h-auto py-1">{error}</span>) :
                    confirmPassword && compare !== value && compare !== "" ?
                        (<span className="text-red-500 text-xs h-auto py-1">{"Your passwords do not match"}</span>) :
                        confirmPassword && compare == value && compare !== "" ?
                            (<span className="text-green-500 text-xs h-auto py-1">{"Your passwords match"}</span>)
                            : ""
            }
            {
                info && info != "" ?
                    (<p className="text-gray-500 text-xs h-auto -pt-2">{info}</p>)
                    : ""
            }
        </div>
    );
});

DefaultInput.displayName = 'DefaultInput';

export default DefaultInput;
