
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import React, { forwardRef, useState, useEffect } from 'react'
import { DefaultInputType } from '../types';
import { SmPasswordCheckIcon, SmCheckIcon } from '../icons'

const DefaultSelect = forwardRef<any, any>(({
    type,
    name,
    label,
    topLabel,
    handleChange = () => null,
    value,
    error,
    validate,
    confirm,
    placeHolder,
    variant,
    inputVariant,
    labelVariant,
    containerVariant,
    icon,
    required,
    checkNum,
    data = [],
    isDisabled = false
}: DefaultInputType) => {


    const onChange = (e: any) => {
        const pattern = /^\d*\.?\d*$/
        const whiteSpace = /[\s]/

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
                    {topLabel} {required ? <span className='text-red-100'>*</span> : ""}
                </label>
            }
            <div className={`relative group w-full leading-6 text-sm font-500 border px-6 py-0 rounded-lg 
            ${validate ? "pr-[77.5px]" : ""} ${topLabel ? "mt-2" : ""}  ${!isDisabled ? "bg-gray-50" : "bg-gray-100"} 
            ${error ? 'border-red-500 focus:border-red-500' : confirm ? ' border-green-500' : ''} ${variant}`}
            >
                {icon}
                <select
                    id={`${label}-input${name}`}
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder={placeHolder || topLabel}
                    disabled={isDisabled}
                    required={required || false}
                    className={`outline-none placeholder:text-gray-300 text-blackish placeholder:text-sm placeholder:min-w-max w-full border-none
                    leading-6 text-sm font-300 px-0 py-3 bg-[#ffffff00] ${icon ? "pl-0" : ""} ${inputVariant}`}
                >
                    <>
                        <option className='text-gray-300 text-sm min-w-max w-full'>{`Select ${label || topLabel || name || ""}`}</option>
                        {!data && data?.length < 1 ? <option className='text-gray-200 text-xs min-w-max w-full'>N/A</option>
                            : data?.map((each: any, i: any) => {
                                return <option value={each?.value || ""} key={i}>{each?.name || ""}</option>
                            })}
                    </>
                </select>
            </div>

            {
                error && error != "" ?
                    (<p className="text-red-500 text-xs h-auto py-1">{error}</p>) : ""
            }
        </div >
    );
});

DefaultSelect.displayName = 'DefaultSelect';

export default DefaultSelect;
