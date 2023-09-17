
import { BsSearch } from 'react-icons/bs';
import React, { forwardRef, useState, useEffect } from 'react'
import { DefaultInputType } from '../types';

const SearchInput = forwardRef<any, any>(({
    type,
    name,
    label,
    topLabel,
    handleChange,
    handleBlur,
    value,
    error,
    validate,
    placeHolder,
    variant,
    inputVariant,
    labelVariant,
    containerVariant,
    icon,
    required,
    readOnly,
    isDisabled = false
}: DefaultInputType, ref) => {

    return (
        <div>

            <div className='flex items-center relative'>
                <button className='absolute opacity-40 left-3'>
                    {icon || <BsSearch />}
                </button>
                <input
                    name={name}
                    type={type || "text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    placeholder={placeHolder}
                    disabled={isDisabled}
                    ref={ref}
                    required={required || false}
                    readOnly={readOnly || false}
                    autoComplete="off"
                    className={`placeholder:text-gray-400 text-gray-300 placeholder:text-sm 
                            placeholder:min-w-max w-full leading-6 text-base font-400 bg-blue-darkish
                            border px-10 py-2 rounded-lg border-blue-dark focus:border-blue-darkish
                            focus:border-[0.5px] ${error ? 'border-red-500 focus:border-red-500' :
                            'border-gray-light focus:border-black-200'} autofill:!bg-gray-600 ${variant}`}
                    aria-label="Search"
                    aria-describedby="master-dev"

                />
            </div>
            {
                error && error != "" && (
                    <p className="text-red-500 font-[Inter-Regular] text-xs h-auto">{error}</p>
                )
            }
        </div>

    );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;