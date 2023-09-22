"use client"

import React, {createContext, useState, useContext} from 'react';

export const CreateUserContext = createContext({
    isCreateUser: false,
    setIsCreateUser: (isCreateUser: boolean) => {},
    isEditUser: false,
    setIsEditUser: (isEditUser: boolean) => {},
})

export const NewUserContext = ({ children }: { children: React.ReactNode }) => {

        const [isCreateUser, setIsCreateUser] = useState(false);

        const [isEditUser, setIsEditUser] = useState(false);

        return (
            <CreateUserContext.Provider value={{isCreateUser, setIsCreateUser, isEditUser, setIsEditUser}}>
                {children}
            </CreateUserContext.Provider>
        );
}

export const useNewUserContext = () => useContext(CreateUserContext);