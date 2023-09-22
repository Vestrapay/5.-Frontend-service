"use client"

import React, {createContext, useState, useContext} from 'react';

export const CreateUserContext = createContext({
    isCreateUser: false,
    setIsCreateUser: (isCreateUser: boolean) => {}
})

export const NewUserContext = ({ children }: { children: React.ReactNode }) => {

        const [isCreateUser, setIsCreateUser] = useState(false);

        return (
            <CreateUserContext.Provider value={{isCreateUser, setIsCreateUser}}>
                {children}
            </CreateUserContext.Provider>
        );
}

export const useNewUserContext = () => useContext(CreateUserContext);