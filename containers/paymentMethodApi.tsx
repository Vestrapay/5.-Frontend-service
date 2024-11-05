import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';
import { PayMethodProps } from '@types';
import { useAuthContext } from 'context/AuthContext';

const fetchPayMethodData = (search: string) => {

    // name: userType === "ADMIN" ? "adminMerchantUserList" : "usersList";

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "getAllPaymentMethods", //"getTransactions",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["PAYMETHOD_LIST_DATA", "stats", search], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const PayMethodController = (search: string = "") => {

    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchPayMethodData(search);

    useEffect(() => {
        refetch()
    }, [search])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createPayMethodController = (data: any) => {

    const { userType, userDetail } = useAuthContext()

    const { refetch } = PayMethodController("");

    const [state, setState] = useState<any>({
        payMethod: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const {
        payMethod,
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
                name: "createPaymentMethod",
                // customHeaders: userType === "USER" && { merchantId: userDetail?.id || "" },
                data: payMethod,
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
                    title: "New Payment Method Created",
                    text: "Congratulations, Your have created a new payment method.",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state }
}

const updatePayMethodController = (data: PayMethodProps, id: number | string) => {

    const { userType, userDetail } = useAuthContext()

    const [state, setState] = useState<any>({
        payMethod: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const { refetch } = fetchPayMethodData("");

    useEffect(() => {
        setState({
            ...state,
            payMethod: state?.payMethod || data?.payMethod || true,
            id: state?.id || id || ""
        })

    }, [data])


    const {
        payMethod,
        submittingError,
        errorMssg,
        isSubmitting
    } = state;

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createPaymentMethod",
                // customHeaders: userType === "USER" && { merchantId: userDetail?.id || "" },
                data: payMethod,
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
                    title: "Payment Method Updated",
                    text: "Congratulations, Your have updated this payment method.",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state }
}

export { PayMethodController, createPayMethodController, updatePayMethodController };
