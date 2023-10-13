"use client"

import React, {createContext, useContext, useState} from 'react';

export const CreateSettlementContext = createContext({
    isCreateSettlement: false,
    setIsCreateSettlement: (isCreateSettlement: boolean) => {
    },
    isEditSettlement: false,
    setIsEditSettlement: (isEditSettlement: boolean) => {
    },
    isViewSettlement: false,
    setIsViewSettlement: (isViewSettlement: boolean) => {
    },
})

export const NewSettlementContext = ({children}: { children: React.ReactNode }) => {

    const [isCreateSettlement, setIsCreateSettlement] = useState(false);

    const [isEditSettlement, setIsEditSettlement] = useState(false);

    const [isViewSettlement, setIsViewSettlement] = useState(false);

    return (
        <CreateSettlementContext.Provider value={{isCreateSettlement, setIsCreateSettlement, isEditSettlement, setIsEditSettlement, isViewSettlement, setIsViewSettlement}}>
            {children}
        </CreateSettlementContext.Provider>
    );
}

export const useNewSettlementContext = () => useContext(CreateSettlementContext);