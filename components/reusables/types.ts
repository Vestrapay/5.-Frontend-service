import React, { InputHTMLAttributes } from "react"
import { MouseEventHandler } from "react"


export type DefaultInputType = {
    type: string
    name: string,
    label?: React.ReactNode | string,
    topLabel?: "",
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined,
    value: string,
    error?: string,
    placeHolder?: string,
    variant?: string,
    inputVariant?: string,
    labelVariant?: string,
    containerVariant?: string,
    icon?: any,
    info?: string,
    required?: boolean,
    validate?: boolean,
    validationFunc: () => any,
    readOnly?: boolean,
    isDisabled?: boolean,
    currCheck?: boolean,
    currency?: string,
    confirmPassword: boolean,
    compare?: string,
    maxLength: number,
    minLength: number,
    noLabel: boolean,
    confirm?: boolean,
    data?: any,
    checkNum?: boolean
}
export type DefaultTextAreaType = {
    name: string,
    label: string,
    labelVariant?: string,
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
    value: string,
    error?: string,
    placeHolder?: string,
    variant?: string,
    containerVariant?: string,
    icon?: any
    rows: number
}
export type SearchInputProps = {
    onHandleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type DefaultDatePickerType = {
    name: string,
    label?: React.ReactNode,
    onHandleDateChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    error?: string,
    variant?: string,
    containerVariant?: string,
    icon?: any
    selectedDate?: string
    placeHolder?: string
}

export type DefaultButtonType = {
    labelText: any,
    handleClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    isDisabled?: boolean;
    variant?: string;
    containerVariant?: string;
    isLoading?: boolean;
    icon?: any;
    icon2?: any;
    handleBlur?: MouseEventHandler<HTMLButtonElement> | any | undefined;
}
