
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from '@Utils/inAppstorage';
import { useEffect } from 'react';

//Fetching accounts list data 
const fetchUsersData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "usersList",
            params: {
                pageNo,
                pageSize,
            },
            action: (): any => (["skip"])
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

const UsersController = (pageNo: any, pageSize: any, search: string, show: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchUsersData(pageNo, pageSize, search);
    
    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, show])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createUserController = (state: any, setState: any, showModal: any) => {

    const { email, firstName, lastName, level, roleId, institutionId, submittingError, errorMssg, isSubmitting } = state

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createUser",
                data: {
                    email, firstName, lastName, level, roleId, institutionId
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "New User Created", text: "Congratulations, Your have created a new user.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.respDescription || "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    showModal();
                    setState({
                        firstName: "",
                        lastName: "",
                        email: "",
                        level: "",
                        roleId: "",
                        institutionId: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
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


    return { handelSubmit, handleChange, handleExtraChange }
}

const updateUserController = (state: any, setState: any, showModal: any, data: any) => {

    const func = async (userId: any): Promise<any> => {
        const response = await apiCall({
            name: "getUser",
            urlExtra: `/${userId}`,
            action: (res: any): any => {
                setState({
                    ...state,
                    accountName: res?.accountName || "",
                    apiReference: res?.apiReference || "",
                    bvn: res?.bvn || "",
                    time: res?.time || "",
                    accountType: res?.accountType || "",
                    timeUnit: res?.timeUnit || "",
                    status: data?.isEnabled ? true : false
                })
                return ["skip"];
            }
        })
        return response;
    }

    useEffect(() => {
        setState({
            ...state,
            institutionId: data?.institutionId || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            email: data?.email || "",
            userName: data?.userName || "",
            roleId: data?.roleId || "",
            level: data?.level || "",
            userId: data?.id || "",
            status: data?.isEnabled ? true : false
        })
    }, [data])

    const {  status, errorMssg, isSubmitting } = state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateUser",
                data: {
                    userId: state?.userId || data?.id,
                    email: state?.email || data?.email,
                    roleId: state?.roleId || data?.roleId,
                    isEnabled: state?.isEnabled || data?.isEnabled,
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "Account updated", text: "Congratulations, Your have updated your account.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.respDescription || "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    showModal();
                    setState({
                        accountName: "",
                        apiReference: "",
                        bvn: "",
                        time: "",
                        accountType: "",
                        timeUnit: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
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

    const handleStatusChange = () => {
        setState({
            ...state,
            status: !status,
            submittingError: false
        });
    }

    return { handleSubmit, handleChange, handleExtraChange, handleStatusChange }
}


export { fetchUsersData, UsersController, createUserController, updateUserController }