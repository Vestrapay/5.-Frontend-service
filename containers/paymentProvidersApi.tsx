import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';
import { PayProvidersProps } from '@types';
import { useAuthContext } from 'context/AuthContext';

const fetchPayProvidersData = (search: string) => {

    // name: userType === "ADMIN" ? "adminMerchantUserList" : "usersList";

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "getAllPaymentProviders", //"getTransactions",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["PAYPROVIDER_LIST_DATA", "list", search], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const PayProvidersController = (search: string = "") => {

    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchPayProvidersData(search);

    useEffect(() => {
        refetch()
    }, [search])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createPayProvidersController = (data: any, setShow: any = () => null) => {

    const { userType, userDetail } = useAuthContext()

    const { refetch } = PayProvidersController("");

    const [state, setState] = useState<any>({
        payMethod: [],
        payProvider: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

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
        payProvider,
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
                name: "createPaymentProvider",
                // customHeaders: userType === "USER" && { merchantId: userDetail?.id || "" },
                data: {
                    name: payProvider,
                    supportedPaymentMethods: payMethods
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
                    title: "New Payment Provider Created",
                    text: "Congratulations, Your have created a new payment provider.",
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

const updatePayProvidersController = (data: PayProvidersProps) => {

    const [state, setState] = useState<any>({
        payMethod: "",
        payProvider: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [payMethods, setPayMethods] = useState<any>([]);

    const { refetch } = fetchPayProvidersData("");

    useEffect(() => {

        setState({
            ...state,
            payProvider: data?.name || state?.payProvider || "",
        })

        let listMethods = data?.supportedPaymentMethods?.map((each: any) => (each?.replaceAll("{", "")?.replaceAll("}", "")))

        console.log(data?.supportedPaymentMethods, listMethods);

        setPayMethods(listMethods);

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
        payProvider,
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
                name: "updatePaymentProvider",
                // customHeaders: userType === "USER" && { merchantId: userDetail?.id || "" },
                data: {
                    name: payProvider,
                    supportedPaymentMethods: payMethods
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
                    title: "Payment Provider Updated",
                    text: "Congratulations, Your have updated this payment provider.",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, payMethods, selectMethod }
}

export { PayProvidersController, createPayProvidersController, updatePayProvidersController };
