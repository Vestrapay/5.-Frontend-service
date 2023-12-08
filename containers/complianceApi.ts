import { apiCall } from '@utils/URLs'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react';
import { UserDetailProps } from '@types';
import { useAuthContext } from "../context/AuthContext";
import { Storage } from 'Utils/inAppstorage'


const { details: { merchantId, uuid } } = Storage.getItem("userDetails") || { details: { merchantId: "", uuid: "" } }

//Fetching accounts list data
const fetchcomplianceData = (pageNo: any, pageSize: any, search: string) => {

    const { userType, userDetail } = useAuthContext()


    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "complianceList", //"getTransactions",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["COMPLIANCE_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const ComplianceController = (kycData: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchcomplianceData(0, 10, "");

    const [state, setState] = useState<any>({
        merchantId: "",
        status: "",
        reason: "",
        isSubmitting: false,
        submittingError: false,
        errorMssg: ""
    });


    useEffect(() => {
        refetch()
    }, [kycData])

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "downloadComplianceDocs",
                urlExtra: `/${kycData?.merchantId || ""}`,
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "Download Successful!",
                    text: "Congratulations, Your download was successful.",
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
                        ...state,
                        merchantId: "",
                        status: "",
                        reason: "",
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

    const handleValidate = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "validateComplianceDocs",
                data: {
                    merchantId: kycData?.merchantId || "",
                    status: state?.status || "",
                    reason: state?.reason || ""
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
                    title: "Download Successful!",
                    text: "Congratulations, Your download was successful.",
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
                        ...state,
                        merchantId: "",
                        status: "",
                        reason: "",
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

    return { isLoading, isError, error, isSuccess, stateValues: state, data, refetch, handleValidate, handleDownload, handleChange }

}



export { fetchcomplianceData, ComplianceController }
