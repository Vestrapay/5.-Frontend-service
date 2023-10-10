
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';


const { firstName: fName } = Storage.getItem("userDetails") || { firstName: "" }


const UsersProfileController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const [state, setState] = useState<any>({
        selectedFile: null,
        country: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        businessName: "",
        username: "",
        password: "",
        enabled: "",
        id: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const fetchUserData = async (): Promise<any> => {
        const response = await apiCall({
            name: "getAUser",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["USER_VALUE_DATA", "values", fName], () => fetchUserData(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])


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
            id: state?.id || data?.id || ""
        })

    }, [data])


    const [file, setFile] = useState<any | null>(null);
    const [msg, setMsg] = useState("");

    const fileInputRef: any = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }


    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const file = e?.target?.files[0] || null;
        console.log(file)
        let fileLabel: Element | null = document.querySelector("p.name");
        fileLabel ? fileLabel.innerHTML = file?.name : null
        setFile(file)
    }

    const { country, firstName, lastName, email, gender, phoneNumber, businessName, password, enabled, username, submittingError, errorMssg, isSubmitting } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateAUser",
                data: { referralCode: data?.referralCode, country, firstName, lastName, email, phoneNumber, businessName, password: password },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "User Updated Successfully!", text: "Congratulations, Your have updated this user.", icon: "" },
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
                        country: res?.country || "",
                        firstName: res?.firstName || "",
                        lastName: res?.lastName || "",
                        email: res?.email || "",
                        phoneNumber: res?.phoneNumber || "",
                        businessName: res?.businessName || "",
                        enabled: res?.enabled || "",
                        username: res?.username || "",
                        id: res?.id || "",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, file, fileInputRef, handleFileInputClick, handleChangeFile }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}

const UpdateKYCController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const [state, setState] = useState<any>({
        selectedFile: null,
        country: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        businessName: "",
        username: "",
        password: "",
        enabled: "",
        id: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [filesString, setFilesString] = useState<any>([]);
    const [files, setFiles] = useState<any>([]);
    const [msg, setMsg] = useState("");

    const convertBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const fileInputRef: any = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement> | any) => {

        const file = e?.target?.files[0] || null;
        let fileBase64 = await convertBase64(file);
        console.log("each file: ", fileBase64)

        let fileLabel: Element | null = document.querySelector("p.name");
        fileLabel ? fileLabel.innerHTML = file?.name : null;
        file && file?.size < 10000001 && setFilesString([...filesString, fileBase64]);
        file && file?.size < 10000001 && setFiles([...files, file]);
    }

    const handleClearFiles = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        setFiles([])
    }

    const { country, firstName, lastName, email, gender, phoneNumber, businessName, enabled, username, submittingError, errorMssg, isSubmitting } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "uploadUtility",
                data: filesString,// { id: state?.id, country, firstName, lastName, email, phoneNumber, businessName, enabled, username, ...data },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Successful", text: "Documents have been uploaded successfully, check your registered email for confirmation.", icon: "" },
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
                    setFilesString([]);
                    setFiles([]);
                    setState({
                        country: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        phoneNumber: "",
                        businessName: "",
                        enabled: "",
                        username: "",
                        id: "",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, files, fileInputRef, handleFileInputClick, handleChangeFile, handleClearFiles }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}

const AboutBusinessController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const [state, setState] = useState<any>({
        businessName: "",
        businessAddress: "",
        businessPhoneNumber: "",
        businessEmail: "",
        businessSupportPhoneNumber: "",
        businessSupportEmailAddress: "",
        country: "",
        chargeBackEmail: "",
        sendToSpecificUsers: "",
        paymentMethod: "",

        customerPayTransactionFee: false,
        emailNotification: false,
        customerNotification: false,
        creditNotifications: false,
        notifyOnlyBusinessEmail: false,
        notifyDashboardUsers: false,
        twoFAlogin: false,
        twoFAForTransfer: false,
        transfersViaAPI: false,
        transfersViaDashboard: false,
        disableAllTransfers: false,

        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const fetchBusinessData = async (): Promise<any> => {
        const response = await apiCall({
            name: "viewBusiness",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["BUSINESS_VALUE_DATA", "values", fName], () => fetchBusinessData(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])


    useEffect(() => {
        setState({
            ...state,
            businessName: data?.businessName || state?.businessName || "",
            businessAddress: data?.businessAddress || state?.businessAddress || "",
            businessPhoneNumber: data?.businessPhoneNumber || state?.businessPhoneNumber || "",
            businessEmail: data?.businessEmail || state?.businessEmail || "",
            businessSupportPhoneNumber: data?.businessSupportPhoneNumber || state?.businessSupportPhoneNumber || "",
            businessSupportEmailAddress: data?.businessSupportEmailAddress || state?.businessSupportEmailAddress || "",
            country: data?.country || state?.country || "",
            chargeBackEmail: data?.chargeBackEmail || state?.chargeBackEmail || "",
            sendToSpecificUsers: data?.sendToSpecificUsers || state?.sendToSpecificUsers || "",
            paymentMethod: data?.paymentMethod || state?.paymentMethod || "",

            customerPayTransactionFee: data?.customerPayTransactionFee || state?.customerPayTransactionFee || false,
            emailNotification: data?.emailNotification || state?.emailNotification || false,
            customerNotification: data?.customerNotification || state?.customerNotification || false,
            creditNotifications: data?.creditNotifications || state?.creditNotifications || false,
            notifyOnlyBusinessEmail: data?.notifyOnlyBusinessEmail || state?.notifyOnlyBusinessEmail || false,
            notifyDashboardUsers: data?.notifyDashboardUsers || state?.notifyDashboardUsers || false,
            twoFAlogin: data?.twoFAlogin || state?.twoFAlogin || false,
            twoFAForTransfer: data?.twoFAForTransfer || state?.twoFAForTransfer || false,
            transfersViaAPI: data?.transfersViaAPI || state?.transfersViaAPI || false,
            transfersViaDashboard: data?.transfersViaDashboard || state?.transfersViaDashboard || false,
            disableAllTransfers: data?.disableAllTransfers || state?.disableAllTransfers || false
        })

    }, [data])


    const [file, setFile] = useState<any | null>(null);
    const [msg, setMsg] = useState("");

    const fileInputRef: any = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }


    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const file = e?.target?.files[0] || null;
        console.log(file)
        let fileLabel: Element | null = document.querySelector("p.name");
        fileLabel ? fileLabel.innerHTML = file?.name : null
        setFile(file)
    }

    const { businessName,
        businessAddress,
        businessPhoneNumber,
        businessEmail,
        businessSupportPhoneNumber,
        businessSupportEmailAddress,
        country,
        chargeBackEmail,
        sendToSpecificUsers,
        paymentMethod,
        customerPayTransactionFee,
        emailNotification,
        customerNotification,
        creditNotifications,
        notifyOnlyBusinessEmail,
        notifyDashboardUsers,
        twoFAlogin,
        twoFAForTransfer,
        transfersViaAPI,
        transfersViaDashboard,
        disableAllTransfers, } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "updateBusiness",
                data: {
                    businessName,
                    businessAddress,
                    businessPhoneNumber,
                    businessEmail,
                    businessSupportPhoneNumber,
                    businessSupportEmailAddress,
                    country,
                    chargeBackEmail,
                    sendToSpecificUsers,
                    paymentMethod,
                    customerPayTransactionFee,
                    emailNotification,
                    customerNotification,
                    creditNotifications,
                    notifyOnlyBusinessEmail,
                    notifyDashboardUsers,
                    twoFAlogin,
                    twoFAForTransfer,
                    transfersViaAPI,
                    transfersViaDashboard,
                    disableAllTransfers,
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Business Updated Successfully!", text: "Congratulations, Your have updated your business.", icon: "" },
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
                        country: res?.country || "",
                        firstName: res?.firstName || "",
                        lastName: res?.lastName || "",
                        email: res?.email || "",
                        phoneNumber: res?.phoneNumber || "",
                        businessName: res?.businessName || "",
                        enabled: res?.enabled || "",
                        username: res?.username || "",
                        id: res?.id || "",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, file, fileInputRef, handleFileInputClick, handleChangeFile }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}


export { UsersProfileController, UpdateKYCController, AboutBusinessController };