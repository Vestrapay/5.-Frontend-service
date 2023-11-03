import {apiCall} from '@utils/URLs'
import {useQuery} from 'react-query'
import {Storage} from '@utils/inAppstorage';
import {useEffect, useState} from 'react';
import {UserDetailProps} from '@types';

const {details, isSuperAdmin} = Storage.getItem("userDetails") || {}

//Fetching accounts list data 
const fetchUsersData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: isSuperAdmin ? "adminMerchantUserList" : "usersList",
            // params: {
            //     pageNo,
            //     pageSize,
            // },
            action: (): any => (["skip"])
        }) as any[]
        const response2 = isSuperAdmin && (await apiCall({
            name: "adminUserList",
            action: (): any => (["skip"])
        }) as any[])

        return [...response, ...response2];
    }

    const {isLoading, isError, error, isSuccess, data, refetch} = useQuery(
        ["USER_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return {isLoading, isError, error, isSuccess, data, refetch}
}

const UsersController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const {isLoading, isError, error, isSuccess, data, refetch} = fetchUsersData(pageNo, pageSize, search);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])

    return {isLoading, isError, error, isSuccess, data, refetch}

}

const createUserController = () => {


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

    const handleClearError = () => setState({...state, submittingError: false})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: isSuperAdmin ? "adminCreateUser" : "createMerchantUser",
                customHeaders: !isSuperAdmin && {merchantId: details?.id || ""},
                data: !isSuperAdmin ? {
                    country, firstName, lastName, email, gender, phoneNumber, password
                } : {
                    firstName, lastName, email, country, phoneNumber, password
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
                    title: !isSuperAdmin ? "New User Created" : "New Admin Created",
                    text: !isSuperAdmin
                        ? "Congratulations, Your have created a new user."
                        : "Congratulations, Your have created a new admin.",
                    icon: ""
                },
                errorAction: (err?: any) => {
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
        ;
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


    return {handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state}
}

const updateUserController = (data: UserDetailProps, id: number | string) => {


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

    const handleClearError = () => setState({...state, submittingError: false})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateUser",
                customHeaders: {merchantId: state?.id || id || ""},
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
        ;
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


    return {handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state}
}

const deleteUsersController = (data: UserDetailProps) => {

    const [state, setState] = useState<any>({
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const handleClearError = () => setState({...state, submittingError: false})

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
                customHeaders: {merchantId: data?.uuid || ""},
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
        ;
    }

    return {stateValues: state, handleSubmit, handleClearError}
}

export {fetchUsersData, UsersController, createUserController, updateUserController, deleteUsersController}