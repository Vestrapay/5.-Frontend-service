"use client"

import React, { createContext, useContext, useState } from 'react';

export const CreateTransContext = createContext({
    amount: "",
    setAmount: (amount: string) => {
    },
    currency: "",
    setCurrency: (amount: string) => {
    },

    email: "",
    setEmail: (email: string) => {
    },

    merchant: "",
    setMerchant: (merchant: string) => {
    },

    business: "",
    setBusiness: (business: string) => {
    },

    payType: "",
    setPayType: (payType: string) => {
    },

    payPath: "",
    setPayPath: (payPath: string) => {
    },

    payment: "",
    setPayment: (payment: string) => {
    },

    payLinkDetails: {
        merchantId: "",
        secret: "",
        userId: ""
    },
    setPayLinkDetails: (value: any) => {
    },
    isViewTrans: false,
    setIsViewTrans: (isViewUser: boolean) => {
    },
    initiatedTrans: {
        transfer: {
            initiated: false,
            details: {
                bank_account: {
                    account_name: "",
                    account_number: "",
                    bank_code: "",
                    bank_name: "",
                },
                amount: "",
                business: "",
                merchant: "",
                email: "",
                reference: "",
            },
            payed: false,
            status: "N/A"
        },
        ussd: {
            initiated: false,
            details: {}
        },
        card: {
            initiated: false,
            details: {}
        },
        link: {
            initiated: false,
            details: {}
        }
    },
    setInitiatedTrans: (value: any) => {
    },
})

export const NewTransContext = ({ children }: { children: React.ReactNode }) => {

    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [currency, setCurrency] = useState("");
    const [merchant, setMerchant] = useState("");
    const [business, setBusiness] = useState("");
    const [payType, setPayType] = useState("");
    const [payment, setPayment] = useState("");
    const [payPath, setPayPath] = useState("");
    const [payLinkDetails, setPayLinkDetails] = useState({
        merchantId: "",
        secret: "",
        userId: ""
    });
    const [initiatedTrans, setInitiatedTrans] = useState<any>({
        transfer: {
            initiated: false,
            details: {
                bank_account: "",
                reference: "",
            },
            payed: false
        },
        ussd: {
            initiated: false,
            details: {}
        },
        card: {
            initiated: false,
            details: {}
        },
        link: {
            initiated: false,
            details: {}
        }
    });
    const [isViewTrans, setIsViewTrans] = useState(false);

    return (
        <CreateTransContext.Provider value={{
            payType, setPayType, payPath, setPayPath, amount, setAmount, payLinkDetails, setPayLinkDetails, payment,
            email, setEmail, merchant, setMerchant, business, setBusiness, setPayment, isViewTrans, setIsViewTrans,
            initiatedTrans, setInitiatedTrans,currency,setCurrency
        }}>
            {children}
        </CreateTransContext.Provider>
    );
}

export const useNewTransContext = () => useContext(CreateTransContext);