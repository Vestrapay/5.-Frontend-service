"use client"

import React, { createContext, useContext, useState } from 'react';

export const CreateUserContext = createContext({
    isCreateUser: false,
    setIsCreateUser: (isCreateUser: boolean) => {
    },
    isEditUser: false,
    setIsEditUser: (isEditUser: boolean) => {
    },
    isViewUser: false,
    setIsViewUser: (isViewUser: boolean) => {
    },
    isViewKyc: false,
    setIsViewKyc: (isViewUser: boolean) => {
    },
})

export const NewUserContext = ({ children }: { children: React.ReactNode }) => {

    const [isCreateUser, setIsCreateUser] = useState(false);

    const [isEditUser, setIsEditUser] = useState(false);

    const [isViewUser, setIsViewUser] = useState(false);

    const [isViewKyc, setIsViewKyc] = useState(false);

    return (
        <CreateUserContext.Provider value={{ isViewKyc, setIsViewKyc, isCreateUser, setIsCreateUser, isEditUser, setIsEditUser, isViewUser, setIsViewUser }}>
            {children}
        </CreateUserContext.Provider>
    );
}

export const useNewUserContext = () => useContext(CreateUserContext);