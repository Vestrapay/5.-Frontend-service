"use client"

import React, { createContext, useContext, useState } from 'react';

export const CreateTransContext = createContext({
    amount: "",
    setAmount: (amount: string) => {
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
    },
    setPayLinkDetails: (value: any) => {
    }
})

export const NewTransContext = ({ children }: { children: React.ReactNode }) => {

    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [merchant, setMerchant] = useState("");
    const [business, setBusiness] = useState("");
    const [payType, setPayType] = useState("");
    const [payment, setPayment] = useState("");
    const [payPath, setPayPath] = useState("");
    const [payLinkDetails, setPayLinkDetails] = useState({
        merchantId: "",
        secret: "",
    });

    return (
        <CreateTransContext.Provider value={{
            payType, setPayType, payPath, setPayPath, amount, setAmount, payLinkDetails, setPayLinkDetails, payment,
            email, setEmail, merchant, setMerchant, business, setBusiness, setPayment
        }}>
            {children}
        </CreateTransContext.Provider>
    );
}

export const useNewTransContext = () => useContext(CreateTransContext);