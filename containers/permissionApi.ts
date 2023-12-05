import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';


const { firstName: fName, details } = Storage.getItem("userDetails") || { firstName: "" }



const PermissionController = () => {

    const [state, setState] = useState<any>({
        selectedFile: null,
        permissionList: [],
        roleList: [],
        viewRolesList: [],
        userId: "",
        country: "",
        bank: "",
        currency: "",
        accountNumber: "",
        paymentMethod: "",
        primary: false,
        businessName: "",
        currentPermission: {},
        username: "",
        password: "",
        enabled: "",
        id: "",
        submittingError: false,
        isSubmitting: false,
        isFetching: false,
        addPermissionCheck: false,
        setDeleting: false,
        viewCheck: "list",
        addSteps: "one",
        AddAllPerm: false,
        errorMssg: ""
    })

    const fetchRolesData = async (): Promise<any> => {
        const response = await apiCall({
            name: "listRoles",
            urlExtra: `/${details?.uuid || ""}`,
            params: { merchantUserUUID: details?.uuid },
            action: (): any => (["skip"])
        })
        return response;
    }

    const fetchUsersRolesData = (merchantUserUUID: any) => {

        const fetchRolesData = async (): Promise<any> => {
            const response = await apiCall({
                name: "listRoles",
                urlExtra: `/${merchantUserUUID || details?.uuid || ""}`,
                params: { merchantUserUUID: merchantUserUUID || details?.uuid },
                action: (res): any => {

                    let newPerm = state?.permissionList?.map((each: any, i: any) => {
                        let value = res?.data?.find((one: any) => each?.name == one?.permissionId);
                        return (value ?
                            ({ name: each?.name, status: true, value: each?.value })
                            : ({ name: each?.name, status: false, value: each?.value }))
                    });

                    setState({
                        ...state,
                        viewRolesList: newPerm || []
                    })
                    return ["skip"];
                },
                errorAction: (): any => (["skip"])
            })
            return response;
        }

        const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
            ["USER_ROLE_LIST_DATA", "values", merchantUserUUID], () => fetchRolesData(),
            {
                refetchOnWindowFocus: false,
                // staleTime: 60000
            }
        );

        return { isLoading, isError, error, isSuccess, data, refetch }
    }


    const fetchPermissionData = async (): Promise<any> => {
        setState({
            ...state,
            isFetching: true
        })
        const response = await apiCall({
            name: "listPermission",
            action: (): any => {
                setState({
                    ...state,
                    isFetching: false
                });
                return ["skip"];
            },
            errorAction: (): any => {
                setState({
                    ...state,
                    isFetching: false
                });
                return ["skip"];
            }
        })
        setState({
            ...state,
            isFetching: false
        });
        return response;
    }


    const { isLoading: roleisLoading, isError: roleisError, error: roleerror, isSuccess: roleisSuccess, data: roledata, refetch: rolerefetch } = useQuery(
        ["ROLE_LIST_DATA", "values", fName], () => fetchRolesData(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["PERMISSION_LIST_DATA", "values", fName], () => fetchPermissionData(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );

    useEffect(() => {
        refetch()
    }, [state?.viewCheck, state?.isSubmitting])


    useEffect(() => {
        setState({
            ...state,
            roleList: roledata || []
        })

    }, [roledata])


    useEffect(() => {

        let newPerm = data?.map((each: any, i: any) => ({ name: each?.permissionName, status: false, value: each }));

        setState({
            ...state,
            permissionList: newPerm || []
        })

    }, [data])

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

    const handleSelectAllPermission = (index: any, status: any) => {

        // let newListValue = state?.permissionList[index]; 

        let newList = state?.permissionList?.map((each: any, i: any) => ({
            ...each,
            status: !state?.AddAllPerm
        }))

        setState({
            ...state,
            permissionList: newList,
            AddAllPerm: !state?.AddAllPerm,
            submittingError: false
        });
    }

    const handleSelectPermission = (index: any, status: any) => {

        // let newListValue = state?.permissionList[index];
        let newList = state?.permissionList;

        newList[index].status = !state?.permissionList[index]?.status;

        setState({
            ...state,
            permissionList: newList,
            submittingError: false
        });
    }

    const setAddSteps = (val: string) => {
        console.log(val);
        setState({
            ...state,
            addStep: val,
            addSteps: "val"
        })
    }

    const setAddPermission = (val: string) => {
        setState({
            ...state,
            addPermissionCheck: true,
            viewCheck: val || "list"
        })
    }

    const setViewRole = (val: string, roleDetails: any) => {
        setState({
            ...state,
            selectedUser: roleDetails,
            addPermissionCheck: true,
            viewCheck: val || "list"
        })
    }


    const {
        country,
        bank,
        currency,
        accountNumber, submittingError, errorMssg, isSubmitting } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleCreateRole = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        let finalPermissionsList = state?.permissionList?.map((each: any) => each?.status ? each?.value : null)

        try {
            const response = await apiCall({
                name: "createRole",
                data: {
                    userId: state?.userId,
                    permissions: finalPermissionsList
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Role Created Successfully!", text: "Congratulations, Your have created a new role.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Creation Failed, please try again"
                        })
                        return [""]
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
                    rolerefetch();
                    refetch();
                    setAddPermission("list")
                    setState({
                        userId: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }


    const handleEditRole = async (status: any, value: any, userId: any, index: any) => {


        let newList = state?.viewRolesList;

        newList[index].status = !state?.viewRolesList[index]?.status;

        setState((state: any) => ({
            ...state,
            permissionList: newList,
            submittingError: false,
            isSubmitting: true
        }))

        try {
            const response = await apiCall({
                name: !status ? "addPermission" : "removePermission",
                data: {
                    userId: userId,
                    permissions: value
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    location.reload();
                    // refetch();
                    // fetchUsersRolesData(userId);
                    return [""]
                },
                successDetails: { title: "Role Updated Successfully!", text: "Congratulations, Your have updated this permission.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Creation Failed, please try again"
                        })
                        return [""]
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
                    // refetch();
                    // fetchUsersRolesData(userId);
                    setState({
                        userId: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updatePermission",
                data: {
                    id: state?.id || "",
                    uuid: state?.uuid || "",
                    country: state?.country || "",
                    merchantId: state?.merchantId || "",
                    currency: state?.currency || "",
                    bankName: state?.bankName || "",
                    accountNumber: state?.accountNumber || "",
                    primaryAccount: state?.primaryAccount || ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Account updated Successfully!", text: "Congratulations, Your have updated this permission account.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Update Failed, please try again"
                        })
                        return [""]
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
                        id: "",
                        uuid: "",
                        country: "",
                        merchantId: "",
                        currency: "",
                        bankName: "",
                        accountNumber: "",
                        primaryAccount: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    return {
        setAddSteps, handleSelectPermission, setViewRole, fetchUsersRolesData, handleSelectAllPermission, setAddPermission, handleEditRole, handleEdit, handleCreateRole, handleClearError, handleChange, handleExtraChange, stateValues: state
    }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}

export { PermissionController };