import {createContext} from "react";
import {AdminContextProps, RoleProps, UserDetailProps} from "@types";
import React, {useState, useContext} from "react";
import {Storage} from "@utils/inAppstorage";

export const AuthContext = createContext<AdminContextProps>({
    userType: "USER",
    setUserType: (): RoleProps["role"] => "USER",
    userDetail: {},
    setUserDetail: (): UserDetailProps => ({}),
})

export const AuthenticationContext = ({ children }: { children: React.ReactNode }) => {

    const {isSuperAdmin, details} = Storage.getItem("userDetails") || {}
    const role = isSuperAdmin ? "ADMIN" : "USER"

    const [userType, setUserType] = useState<RoleProps["role"]>(role || "USER");

    const [userDetail, setUserDetail] = useState<UserDetailProps>(details || {});

    return (
        <AuthContext.Provider value={{userType, setUserType, userDetail, setUserDetail}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);