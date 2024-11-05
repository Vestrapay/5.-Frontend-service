import { apiCall } from '@utils/URLs'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react';
import { UserDetailProps } from '@types';
import { useAuthContext } from "../context/AuthContext";
import { Storage } from 'Utils/inAppstorage'


const { details: { merchantId, uuid } } = Storage.getItem("userDetails") || { details: { merchantId: "", uuid: "" } }

//Fetching accounts list data
const fetchUsersData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "usersList",
            action: (): any => (["skip"]),
            errorAction: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["USER_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const fetchAdminsData = (pageNo: any, pageSize: any, search: string) => {

    const { userType, userDetail } = useAuthContext()


    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "adminUserList", //"getTransactions",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["ADMIN_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const UsersController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchUsersData(pageNo, pageSize, search);
    console.log("fetchUsersData: inner") 
    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])

    return { isLoading, isError, error, isSuccess, data, refetch }

}


const AdminController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchAdminsData(pageNo, pageSize, search);
    console.log("fetchAdminsData: inner") 
    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createUserController = () => {

    const { userType, userDetail } = useAuthContext()

    const { refetch } = AdminController(false, false, false);

    const [state, setState] = useState<any>({
        country: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        password: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const {
        country,
        firstName,
        lastName,
        email,
        gender,
        phoneNumber,
        password,
        submittingError,
        errorMssg,
        isSubmitting
    } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: userType === "ADMIN" ? "adminCreateUser" : "merchantCreateUser",
                customHeaders: userType === "USER" && { merchantId: userDetail?.id || "" },
                data: userType === "USER" ? {
                    country, firstName, lastName, email, gender, phoneNumber, password
                } : {
                    firstName, lastName, email, country, phoneNumber, password
                },
                action: (): any => {
                    refetch();
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: userType === "USER" ? "New User Created" : "New Admin Created",
                    text: userType === "USER"
                        ? "Congratulations, Your have created a new user."
                        : "Congratulations, Your have created a new admin.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    refetch();
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Action Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    setState({
                        country: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        gender: "",
                        phoneNumber: "",
                        password: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleExtraChange = (name: any, value: any) => {
        setState({
            ...state,
            [name]: value,
            submittingError: false
        });
    }


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state }
}

const updateUserController = (data: UserDetailProps, id: number | string) => {

    const { userType, userDetail } = useAuthContext()

    const [state, setState] = useState<any>({
        country: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        businessName: "",
        id: "",
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })


    useEffect(() => {
        setState({
            ...state,
            country: state?.country || data?.country || "",
            firstName: state?.firstName || data?.firstName || "",
            lastName: state?.lastName || data?.lastName || "",
            email: state?.email || data?.email || "",
            gender: state?.gender || "",
            phoneNumber: state?.phoneNumber || data?.phoneNumber || "",
            businessName: state?.businessName || data?.businessName || "",
            username: state?.username || data?.username || "",
            password: state?.password || "",
            enabled: state?.enabled || data?.enabled || true,
            id: state?.id || id || ""
        })

    }, [data])


    const {
        country,
        firstName,
        lastName,
        email,
        gender,
        phoneNumber,
        businessName,
        enabled,
        username,
        submittingError,
        errorMssg,
        isSubmitting
    } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateUser",
                customHeaders: { merchantId: state?.id || id || "" },
                data: {
                    id, country, firstName, lastName, email, phoneNumber, businessName, enabled, username
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "User Updated Successfully!",
                    text: "Congratulations, Your have updated this user.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Update Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    setState({
                        country: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        gender: "",
                        phoneNumber: "",
                        password: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleExtraChange = (name: any, value: any) => {
        setState({
            ...state,
            [name]: value,
            submittingError: false
        });
    }


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state }
}

const deleteUsersController = (data: UserDetailProps) => {

    const [state, setState] = useState<any>({
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "deleteMerchantUser",
                data: data?.uuid,
                customHeaders: { merchantId: data?.uuid || "" },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "User deleted Successfully!",
                    text: "Congratulations, Your have deleted this user.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Delete Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    setState({
                        country: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        gender: "",
                        phoneNumber: "",
                        password: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    return { stateValues: state, handleSubmit, handleClearError }
}

const enableUsersController = (data: UserDetailProps) => {

    const { isLoading, isError, error, isSuccess, refetch } = fetchUsersData(0, 10, "");

    const [state, setState] = useState<any>({
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    useEffect(() => {
        if (!state?.isSubmitting) {
            refetch()
        }
    }, [!state?.isSubmitting])

    const handleClearError = () => setState({ ...state, submittingError: false })
    // disableUser
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: data?.enabled ? "disableUser" : "enableUser",
                urlExtra: `/${data?.merchantId}`,//data?.uuid || 
                // data: data?.uuid,
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "User updated Successfully!",
                    text: "Congratulations, Your have updated this user.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Updated Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    setState({
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    return { stateValues: state, handleSubmit, handleClearError }
}

const enableAdminController = (data: UserDetailProps) => {

    const { isLoading, isError, error, isSuccess, refetch } = fetchAdminsData(0, 10, "");

    const [state, setState] = useState<any>({
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    useEffect(() => {
        if (!state?.isSubmitting) {
            refetch()
        }
    }, [!state?.isSubmitting])

    const handleClearError = () => setState({ ...state, submittingError: false })
    // disableUser
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "enableAdmin",
                // urlExtra: `/${data?.merchantId}`,//data?.uuid || 
                data: {
                    adminUUID: uuid,
                    value: !data?.enabled
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "Admin User Updated Successfully!",
                    text: "Congratulations, You have updated this admin user.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Updated Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    setState({
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    return { stateValues: state, handleSubmit, handleClearError }
}

const migrateToProductionController = () => {

    const [state, setState] = useState<any>({
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "migrateToProd",
                urlExtra: `/${uuid}`,
                // data: {
                //     // merchantId: merchantId,
                //     userId: uuid
                // },
                customHeaders: {
                    merchantId: merchantId,
                    userId: uuid
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "Migration Successful!",
                    text: "Migration in progress. migration would be completed in 24 hours. contact admin for support related issues",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Migration Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    setState({
                        country: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        gender: "",
                        phoneNumber: "",
                        password: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    return { stateValues: state, handleSubmit, handleClearError }
}

export { fetchUsersData, UsersController, AdminController, enableAdminController, createUserController, updateUserController, deleteUsersController, enableUsersController, migrateToProductionController }
