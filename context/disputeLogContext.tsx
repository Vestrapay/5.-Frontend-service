"use client"

import React, { createContext, useContext, useState } from 'react';

export const CreateDisputeContext = createContext({
    isCreateDispute: false,
    setIsCreateDispute: (isCreateDispute: boolean) => {
    },
    isEditDispute: false,
    setIsEditDispute: (isEditDispute: boolean) => {
    },
    isViewDispute: false,
    setIsViewDispute: (isViewDispute: boolean) => {
    },
})

export const NewDisputeContext = ({ children }: { children: React.ReactNode }) => {

    const [isCreateDispute, setIsCreateDispute] = useState(false);

    const [isEditDispute, setIsEditDispute] = useState(false);

    const [isViewDispute, setIsViewDispute] = useState(false);

    return (
        <CreateDisputeContext.Provider value={{
            isCreateDispute, setIsCreateDispute, isEditDispute,
            setIsEditDispute, isViewDispute, setIsViewDispute
        }}>
            {children}
        </CreateDisputeContext.Provider>
    );
}

export const useNewDisputeContext = () => useContext(CreateDisputeContext);