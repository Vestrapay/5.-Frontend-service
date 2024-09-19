import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';
import { RoutingRulesProps } from '@types';
import { useAuthContext } from 'context/AuthContext';

const fetchRoutingRulesData = (search: string) => {

    // name: userType === "ADMIN" ? "adminMerchantUserList" : "usersList";

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "getAllRoutingRules", //"getTransactions",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["RoutingRule_LIST_DATA", "list", search], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const fetchProvidersByMethodData = (search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "viewProvidersByMethod",
            urlExtra: `/${search}`, //"getTransactions",
            action: (): any => (["skip"]),
            errorAction: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["ProvidersByMethod_LIST_DATA", "list", search], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const RoutingRulesController = (search: string = "") => {

    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchRoutingRulesData(search);

    useEffect(() => {
        refetch()
    }, [search])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const ProvidersByMethodController = (search: string = "") => {

    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchProvidersByMethodData(search);

    useEffect(() => {
        refetch()
    }, [search])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createRoutingRulesController = (data: any) => {

    const { userType, userDetail } = useAuthContext()

    const { refetch } = RoutingRulesController("");

    const { refetch: refetchMethods } = ProvidersByMethodController()

    const [state, setState] = useState<any>({
        RoutingRule: "",
        payMethod: "",
        provider: "",
        providerList: [],
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    useEffect(() => {
        refetchMethods();
    }, [state?.payMethod])


    const [payMethods, setPayMethods] = useState<any>([]);

    const selectMethod = (value: string) => {

        if (payMethods?.includes(value)) {
            let values = payMethods.filter((each: any) => each !== value)
            console.log("1", values)
            setPayMethods(values);
        } else {
            let values = [...payMethods, value];
            console.log("2", values)
            setPayMethods(values);
        }
    }

    const {
        payMethod,
        provider,
        submittingError,
        errorMssg,
        isSubmitting
    } = state;

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent, setShow: any) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createRoutingRules",
                data: {
                    paymentMethod: payMethod,
                    provider: provider
                },
                action: (): any => {
                    refetch();
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    setShow(false);
                    return []
                },
                successDetails: {
                    title: "New Routing Rule Created",
                    text: "Congratulations, Your have created a new routing rule.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    console.log(err?.response?.data?.errors);
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
                    setShow(false);
                    setState({
                        payMethod: "",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, selectMethod, payMethods }
}

const updateRoutingRulesController = (data: RoutingRulesProps, setShow: any) => {

    const [state, setState] = useState<any>({
        payMethod: "",
        RoutingRule: "",
        provider: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [payMethods, setPayMethods] = useState<any>([]);

    const { refetch } = fetchRoutingRulesData("");

    useEffect(() => {

        setState({
            ...state,
            paymentMethod: data?.paymentMethod || state?.paymentMethod || "",
            provider: data?.provider || state?.provider || "",
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
        })
    }, [data])


    const selectMethod = (value: string) => {
        if (payMethods?.includes(value)) {
            let values = payMethods.filter((each: any) => each !== value);
            setPayMethods(values);
        } else {
            let values = [...payMethods, value];
            setPayMethods(values);
        }
    }

    const {
        RoutingRule,
        payMethod,
        provider,
        submittingError,
        errorMssg,
        isSubmitting
    } = state;

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent, setShow: any) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateRoutingRules",
                data: {
                    provider: provider || data?.provider || state?.provider || "",
                    paymentMethod: payMethod || data?.paymentMethod || state?.paymentMethod || ""
                },
                action: (): any => {
                    refetch();
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    setShow(false);
                    return []
                },
                successDetails: {
                    title: "Routing Rule Updated",
                    text: "Congratulations, Your have updated this routing rule.",
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
                    setShow(false);
                    setState({
                        payMethod: "",
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

    const handleCloseModal = (name: any, value: any) => {
        setShow(false);

    }


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, payMethods, selectMethod }
}

export { RoutingRulesController, createRoutingRulesController, updateRoutingRulesController, fetchProvidersByMethodData, ProvidersByMethodController };
