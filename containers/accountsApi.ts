
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect } from 'react';

//Fetching accounts list data
const fetchAccountsData = (pageNo: any, pageSize: any, accountNo: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "accountList",
            params: {
                pageNo,
                pageSize,
                accountNo,
            },
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["ACCOUNT_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const AccountsController = (pageNo: any, pageSize: any, accountNo: string, show: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchAccountsData(pageNo, pageSize, accountNo);
    
    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, accountNo, show])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createAccount = (state: any, setState: any, showModal: any) => {

    const { accountName, apiReference, bvn, time, submittingError, accountType, timeUnit, errorMssg, isSubmitting } = state

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createAccount",
                data: {
                    accountName, apiReference, bvn, time, accountType, timeUnit
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "New Account Created", text: "Congratulations, Your have created a new account.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respBody?.error || "Action failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.respBody?.error || "Action failed, please try again"
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

    return { handelSubmit }
}

const updateAccount = (state: any, setState: any, showModal: any, data: any) => {

    const func = async (number: any): Promise<any> => {
        const response = await apiCall({
            name: "getAccount",
            params: {
                accountNo: number
            },
            action: (res: any): any => {
                setState({
                    ...state,
                    accountName: res?.accountName || "",
                    apiReference: res?.apiReference || "",
                    bvn: res?.bvn || "",
                    time: res?.time || "",
                    accountType: res?.accountType || "",
                    timeUnit: res?.timeUnit || "",
                    status: data?.isEnabled ? true : false,
                    accountNo: data?.accountNo ? accountNo : ""
                })
                return ["skip"];
            }
        })
        return response;
    }

    useEffect(() => {
        setState({
            ...state,
            accountName: data?.accountName || "",
            apiReference: data?.apiReference || "",
            bvn: data?.bvn || "",
            time: data?.time || "",
            accountType: data?.accountType || "",
            timeUnit: data?.validityTime || "",
            status: data?.isEnabled ? true : false,
            accountNo: data?.accountNo || ""
        })
    }, [data])


    const { accountName, apiReference, bvn, time, submittingError, accountType, timeUnit, accountNo, status, errorMssg, isSubmitting } = state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateAccount",
                data: {
                    status, accountNo: data?.accountNo
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

    return { handleSubmit }
}


export { fetchAccountsData, AccountsController, createAccount, updateAccount };