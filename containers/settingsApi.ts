
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
        requiredDocuments: "",
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
            id: state?.id || data?.id || "",
            requiredDocuments: state?.requiredDocuments || data?.requiredDocuments || "",
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

const UpdateKYCController = () => {

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
    const [category, setCategory] = useState("");

    useEffect(() => {
        setFilesString([]);
        setFiles([]);
        setState({
            ...state,
            selectedFile: null,
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
        })
    }, [category])


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


        let formData = new FormData();
        files && files?.length > 0 ?
            files?.map((each: any, i: any) => formData.append(category || 'files', each))
            : null

        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {

            const response = await apiCall({
                name: "uploadUtility",
                data: formData,//params: { files: filesString },// { id: state?.id, country, firstName, lastName, email, phoneNumber, businessName, enabled, username, ...data },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Successful", text: "Documents have been uploaded successfully, and will be reviewed.", icon: "" },
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

    return { handleSubmit, handleClearError, setCategory, handleChange, handleExtraChange, stateValues: state, files, fileInputRef, handleFileInputClick, handleChangeFile, handleClearFiles }

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

    const handleUpdatePM = (each: any) => {
        let newValues = state?.paymentMethod?.includes(each?.value) ?
            state?.paymentMethod?.replace(`${each?.value || ""}`, ``) : state?.paymentMethod?.concat(`,${each?.value || ""}`);
        setState({
            ...state,
            paymentMethod: newValues
        })
        console.log(state?.paymentMethod);
    }


    return { handleSubmit, handleClearError, handleChange, handleUpdatePM, handleExtraChange, stateValues: state, file, fileInputRef, handleFileInputClick, handleChangeFile }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}

const CreateBusinessController = () => {

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


    const [file, setFile] = useState<any>(null);
    const [msg, setMsg] = useState("");

    const fileInputRef: any = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }


    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const file = e?.target?.files[0] || null;
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
                name: "createBusiness",
                data: {
                    businessName,
                    businessAddress,
                    businessPhoneNumber,
                    businessEmail,
                    businessSupportPhoneNumber,
                    businessSupportEmailAddress,
                    country,
                    chargeBackEmail,
                    paymentMethod,
                    sendToSpecificUsers: "false",

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
                successDetails: { title: "Business Created Successfully!", text: "Congratulations, Your have created your business.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Creation failed, please try again"
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
                    });
                    router.push('/dashboard');
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

const SettlmentController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const [state, setState] = useState<any>({
        selectedFile: null,
        settementList: [],
        country: "",
        bank: "",
        currency: "",
        accountNumber: "",
        paymentMethod: "",
        primary: false,
        businessName: "",
        currentSettlement: {},
        username: "",
        password: "",
        enabled: "",
        id: "",
        submittingError: false,
        isSubmitting: false,
        addSettlementCheck: false,
        setDeleting: false,
        viewCheck: "list",
        errorMssg: ""
    })

    const fetchSettlementData = async (): Promise<any> => {
        const response = await apiCall({
            name: "listSettlement",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["SETTLEMENT_LIST_DATA", "values", fName], () => fetchSettlementData(),
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
            settementList: data
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


    const setAddSettlement = (val: string) => {
        setState({
            ...state,
            addSettlementCheck: true,
            viewCheck: val || "list"
        })
    }

    const selectEdit = (values: any) => {
        setState({
            ...state,
            id: values?.id || 0,
            uuid: values?.uuid || "",
            country: values?.country || "",
            merchantId: values?.merchantId || "",
            currency: values?.currency || "",
            bankName: values?.bankName || "",
            accountNumber: values?.accountNumber || "",
            primaryAccount: values?.primaryAccount || false,
            addSettlementCheck: true,
            viewCheck: "edit"
        })
    }

    const selectDelete = (values: any) => {
        setState({
            ...state,
            id: values?.id || 0,
            uuid: values?.uuid || "",
            country: values?.country || "",
            merchantId: values?.merchantId || "",
            currency: values?.currency || "",
            bankName: values?.bankName || "",
            accountNumber: values?.accountNumber || "",
            currentSettlement: values || {},
            primaryAccount: values?.primaryAccount || false,
            addSettlementCheck: true,
            setDeleting: true,
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
        })
    }

    const setDeletingFunc = () => {
        setState({
            ...state,
            setDeleting: !state?.setDeleting
        })
    }

    const {
        country,
        bank,
        currency,
        accountNumber, submittingError, errorMssg, isSubmitting } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createSettlement",
                data: {
                    country,
                    bankName: bank,
                    currency,
                    accountNumber,
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Account created Successfully!", text: "Congratulations, Your have created a new settlement account.", icon: "" },
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
                    // showModal();
                    setState({
                        country: res?.country || "",
                        bankName: res?.bankName || "",
                        currency: res?.currency || "",
                        accountNumber: res?.accountNumber || "",
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
                name: "updateSettlement",
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
                successDetails: { title: "Account updated Successfully!", text: "Congratulations, Your have updated this settlement account.", icon: "" },
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

    const handleMakePrimary = async (values: any) => {

        setState((state: any) => ({
            ...state,
            isSubmitting: true,
            id: values?.id || 0
        }))
        try {
            const response = await apiCall({
                name: "makePrimarySettlement",
                data: values?.uuid || 1,
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Account updated Successfully!", text: "Congratulations, Your have updated this settlement account.", icon: "" },
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
                        ...state,
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    const handleDeleteAccount = async (values: any) => {
        console.log(values);
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "removeSettlement",
                data: {
                    id: values?.id || "",
                    uuid: values?.uuid || "",
                    country: values?.country || "",
                    merchantId: values?.merchantId || "",
                    currency: values?.currency || "",
                    bankName: values?.bankName || "",
                    accountNumber: values?.accountNumber || "",
                    primaryAccount: values?.primaryAccount || false
                } || {},
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Account removed Successfully!", text: "Congratulations, Your have removed this settlement account.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Removal Failed, please try again"
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
        setAddSettlement, selectEdit, setDeletingFunc, selectDelete, handleDeleteAccount, handleMakePrimary, handleEdit, handleCreate, handleClearError, handleChange, handleExtraChange, stateValues: state
    }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}

const APIKEYSController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const [state, setState] = useState<any>({
        selectedFile: null,
        apiKeys: {},
        id: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })


    const fetchKeysData = async (): Promise<any> => {
        const response = await apiCall({
            name: "getKeys",
            urlExtra: `/${"TEST"}`,
            action: (): any => (["skip"]),
            errorAction: (err?: any) => {
                setState({
                    ...state,
                    submittingError: true,
                    isSubmitting: false,
                    errorMssg: "Please generate your API keys."
                })
                return ["skip"]
            }
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["API_KEYS_DATA", "values", "TEST"], () => fetchKeysData(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );

    useEffect(() => {
        refetch()
    }, [state?.isSubmitting])


    useEffect(() => {
        setState({
            ...state,
            apiKeys: data
        })
        data?.id && Storage.setItem("apiKeys", data || {});
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
                name: "generateKeys",
                urlExtra: `/${"TEST"}`,
                // params: {environment: "TEST"},
                action: (res): any => {

                    setState({
                        ...state,
                        apiKeys: res?.data || {},
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Generation Successful!", text: "Congratulations, Your have generated your API Keys.", icon: "" },
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
                    refetch();
                    setState({
                        ...state,
                        apiKeys: res || {},
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                    Storage.setItem("apiKeys", res || {});
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


const WebHooksController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const [state, setState] = useState<any>({
        selectedFile: null,
        url: "",
        secretHash: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })


    const fetchHookData = async (): Promise<any> => {
        const response = await apiCall({
            name: "getWebHook",
            action: (): any => (["skip"]),
            errorAction: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["API_KEYS_DATA", "values", "TEST"], () => fetchHookData(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );

    useEffect(() => {
        refetch()
    }, [state?.isSubmitting])


    useEffect(() => {
        setState({
            ...state,
            url: data?.url || "",
            secretHash: data?.secretHash || "",
        })
    }, [data])

    const { submittingError, errorMssg, isSubmitting } = state

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "createHooks",
                data: {
                    url: state?.url || "",
                    secretHash: state?.secretHash || ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return [""]
                },
                successDetails: { title: "Created Successfully!", text: "Congratulations, Your have created your merchant webhooks.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Action Failed, please try again"
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state }

    // return { isLoading, isError, error, isSuccess, data, refetch }

}

export {
    UsersProfileController, APIKEYSController, WebHooksController,
    UpdateKYCController, AboutBusinessController, CreateBusinessController, SettlmentController
};