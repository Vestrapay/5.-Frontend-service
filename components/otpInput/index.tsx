import React, { useEffect, useMemo, useState } from 'react'
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa'
import { BsInfoCircleFill } from "react-icons/bs"
import router from 'next/router';
import { DefaultButton, DefaultInput } from '../reusables';
import { apiCall } from 'Utils/URLs';
import { Storage } from 'Utils/inAppstorage';
import { RE_DIGIT } from 'Utils/isHelper';
import { LoginErrorCard } from 'Utils/actions/error';

export type Props = {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
    type?: string
};

export function OtpInput({ value, valueLength, onChange, type = "text" }: Props) {

    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLElement) => {

        let nextParent = target?.closest(".terk")?.nextElementSibling?.childNodes[0] as HTMLInputElement | null;

        if (nextParent) {
            nextParent?.focus();
        }

        // const nextElementSibling =
        //     target.nextElementSibling as HTMLInputElement | null;

        // if (nextElementSibling) {
        //     nextElementSibling?.focus();
        // }
    };

    const focusToPrevInput = (target: HTMLElement) => {
        
        let previousParent = target?.closest(".terk")?.previousElementSibling?.childNodes[0] as HTMLInputElement | null;

        if (previousParent) {
            previousParent?.focus();
        }
        
        // const previousElementSibling =
        //     target.previousElementSibling as HTMLInputElement | null;

        // if (previousElementSibling) {
        //     previousElementSibling.focus();
        // }
    };

    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                value.substring(0, idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }
            // const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

            let nextParent = target?.closest(".terk")?.nextElementSibling?.childNodes[0] as HTMLInputElement | null;

            

            if (nextParent) {
                nextParent?.focus();
            }
            focusToNextInput(target);
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };


    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;
        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || targetValue !== '') {
            return;
        }
        focusToPrevInput(target);
        let previousParent = target?.closest(".terk")?.previousElementSibling?.childNodes[0] as HTMLInputElement | null;

        if (previousParent) {
            previousParent?.focus();
        }
        
        // const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

        // if (previousElementSibling) {
        //     previousElementSibling.focus();
        // }
    };
    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    };
    return (
        <div className="flex flex-row items-start justify-between w-full max-w-md gap-1">
            {valueItems.map((digit, idx) => (
                <div className=" w-12 h-12 sm:w-24 sm:h-20 terk" key={idx} >
                    <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-aqua"
                        type={type}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        onChange={(e) => inputOnChange(e, idx)}
                        onKeyDown={inputOnKeyDown}
                        onFocus={inputOnFocus}
                        maxLength={valueLength}
                        value={digit}
                    />
                </div>
            ))}
        </div>
    );
}
