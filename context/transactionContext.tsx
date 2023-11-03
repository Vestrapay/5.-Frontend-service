"use client"

import React, { createContext, useContext, useState } from 'react';

export const CreateTransContext = createContext({
    amount: "",
    setAmount: (amount: string) => {
    },

    email: "",
    setEmail: (amount: string) => {
    },

    merchant: "",
    setMerchant: (amount: string) => {
    },

    business: "",
    setBusiness: (amount: string) => {
    }
})

export const NewTransContext = ({ children }: { children: React.ReactNode }) => {

    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [merchant, setMerchant] = useState("");
    const [business, setBusiness] = useState("");

    return (
        <CreateTransContext.Provider value={{ amount, setAmount, email, setEmail, merchant, setMerchant, business, setBusiness }}>
            {children}
        </CreateTransContext.Provider>
    );
}

export const useNewTransContext = () => useContext(CreateTransContext);