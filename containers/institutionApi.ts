
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect } from 'react';

//Fetching instuttion list data
const fetchlistData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "institutionsList",
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
        ["INSTITUTTION_LIST_DATA", "stats", pageNo], () => func(),
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

    const { address,
        allowedIps,
        email,
        feePercentage,
        fixedFee,
        isFixedFee,
        maxFee,
        minFee,
        name,
        settleCycle,
        settlementAccountNo,
        settlementBank,
        isSnS,
        notificationUrl, institutionId, submittingError, errorMssg, isSubmitting } = state

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createInstitution",
                data: {
                    address,
                    allowedIps,
                    email,
                    feePercentage,
                    fixedFee,
                    isFixedFee,
                    maxFee,
                    minFee,
                    name,
                    settleCycle,
                    settlementAccountNo,
                    settlementBank,
                    isSnS,
                    notificationUrl,
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

const updateController = (state: any, setState: any, showModal: any, data: any) => {

    const func = async (userId: any): Promise<any> => {
        const response = await apiCall({
            name: "getInstitution",
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
            address: data?.address || "",
            allowedIps: data?.allowedIps || "",
            email: data?.email || "",
            feePercentage: data?.feePercentage || "",
            fixedFee: data?.fixedFee || "",
            isFixedFee: data?.isFixedFee || "",
            maxFee: data?.maxFee || "",
            minFee: data?.minFee || "",
            name: data?.name || "",
            settleCycle: data?.settleCycle || "",
            settlementAccountNo: data?.settlementAccountNo || "",
            settlementBank: data?.settlementBank || "",
            isSnS: data?.isSnS || "",
            notificationUrl: data?.notificationUrl || "",
            isEnabled: data?.isEnabled || ""
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
                name: "updateInstitution",
                data: {
                    id: state?.id || data?.id || "",
                    name: state?.name || data?.name || "",
                    email: state?.email || data?.email || "",
                    address: state?.address || data?.address || "",
                    settlementBank: state?.settlementBank || data?.settlementBank || "",
                    settlementAccountNo: state?.settlementAccountNo || data?.settlementAccountNo || "",
                    allowedIps: state?.allowedIps || data?.allowedIps || "",
                    isEnabled: state?.isEnabled || data?.isEnabled || "",
                    isFixedFee: state?.isFixedFee || data?.isFixedFee || "",
                    fixedFee: state?.fixedFee || data?.fixedFee || "",
                    minFee: state?.minFee || data?.minFee || "",
                    maxFee: state?.maxFee || data?.maxFee || "",
                    feePercentage: state?.feePercentage || data?.feePercentage || "",
                    settleCycle: state?.settleCycle || data?.settleCycle || "",
                    mode: "DEV"
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "Institution updated", text: "Congratulations, Your have updated the institution.", icon: "" },
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