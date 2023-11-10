
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect } from 'react';


//Fetching Bank list data
const fetchlistData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "banksList",
            params: {
                pageNo,
                pageSize,
                name: search
            },
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["BANK_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const listController = (pageNo: any, pageSize: any, search: string, show: any, state: any, setState: any, setShowDrop: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchlistData(pageNo, pageSize, search);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, show])

    const handleExtraChange = (status: string, value: string) => {
        setState({ ...state, [status]: value })
    }

    const handleShowDrop = (id: number, off?: boolean) => {
        setShowDrop((prev: number) => off ? null : !prev ? id : (prev === id) ? null : id)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }
    return { isLoading, isError, error, isSuccess, data, refetch, handleExtraChange, handleShowDrop, handleChange }

}

const createController = (state: any, setState: any, showModal: any) => {

    const { name,
        cbnCode,
        nipCode,
        enabled, submittingError, errorMssg, isSubmitting } = state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createBank",
                data: {
                    name,
                    cbnCode,
                    nipCode,
                    enabled: `${enabled}`
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "New Bank Created", text: "Congratulations, Your have created a new bank.", icon: "" },
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
                        cbnCode: "",
                        name: "",
                        nipCode: "",
                        enabled: "",
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


    return { handleSubmit, handleChange, handleExtraChange }
}

const updateController = (state: any, setState: any, showModal: any, data: any) => {

    const func = async (userId: any): Promise<any> => {
        const response = await apiCall({
            name: "getBank",
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
            name: data?.name || "",
            cbnCode: data?.cbnCode || "",
            nipCode: data?.nipCode || "",
            enabled: data?.enabled || ""
        })
    }, [data])

    const { status, errorMssg, isSubmitting } = state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateBank",
                data: {
                    name: state?.name || data?.name || "",
                    cbnCode: state?.cbnCode || data?.cbnCode || "",
                    nipCode: state?.nipCode || data?.nipCode || "",
                    enabled: `${state?.enabled}` || data?.enabled || ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "Bank updated", text: "Congratulations, Your have updated the bank.", icon: "" },
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
                        address: "",
                        allowedIps: "",
                        email: "",
                        feePercentage: "",
                        fixedFee: "",
                        isFixedFee: "",
                        maxFee: "",
                        minFee: "",
                        name: "",
                        settleCycle: "",
                        settlementAccountNo: "",
                        settlementBank: "",
                        isSnS: "",
                        isEnabled: "",
                        notificationUrl: "",
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


export { fetchlistData, listController, createController, updateController }