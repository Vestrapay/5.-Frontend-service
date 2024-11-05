import { apiCall } from '@utils/URLs'
import { useQuery } from 'react-query'
import { useEffect, useRef, useState } from 'react';
import { UserDetailProps } from '@types';
import { useAuthContext } from "../context/AuthContext";
import { useNewDisputeContext } from 'context/disputeLogContext';



//Fetching accounts list data
const fetchDisputesData = (pageNo: any, pageSize: any, search: string) => {

    const { userType, userDetail } = useAuthContext()


    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "listDisputes",
            // params: {
            //     pageNo,
            //     pageSize,
            // },
            action: (): any => (["skip"])
        }) as any[]

        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["DISPUTE_LIST_DATA", "DISPUTE", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const DisputesController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchDisputesData(pageNo, pageSize, search);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const createDisputesController = () => {

    const { setIsCreateDispute } = useNewDisputeContext()

    const { userType, userDetail } = useAuthContext()


    const [state, setState] = useState<any>({
        selectedFile: null,
        reference: "",
        comment: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const {
        selectedFile,
        reference,
        comment,
        submittingError,
        errorMssg,
        isSubmitting
    } = state

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

    const { refetch } = fetchDisputesData(0, 100, "");

    const fileInputRef: any = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement> | any) => {

        const file = e?.target?.files[0] || null;
        let fileBase64 = await convertBase64(file);

        let fileLabel: Element | null = document.querySelector("p.name");
        console.log(e, file, fileLabel);

        fileLabel ? fileLabel.innerHTML = file?.name : null;
        file && file?.size < 10000001 && setFilesString([...filesString, fileBase64]);
        file && file?.size < 10000001 && setFiles([...files, file]);
    }

    const handleClearFiles = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        setFiles([])
    }

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formData = new FormData();
        files && files?.length > 0 ?
            files?.map((each: any, i: any) => formData.append('files', each))
            : null
        formData.append('reference', state?.reference);
        formData.append('comment', state?.comment);

        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        try {
            // certificate_of_incorporation
            // register_of_shareholder
            // register_of_directors 
            // memorandum_and_articles_of_association
            // valid_id_of_directors
            // valid_id_of_ultimate_beneficial_owners
            // operating_license
            // due_diligence_questionaire
            const response = await apiCall({
                name: "logADispute",
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
                    setIsCreateDispute(false);
                    refetch();
                    setFilesString([]);
                    setFiles([]);
                    setState({
                        selectedFile: null,
                        reference: "",
                        comment: "",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, files, fileInputRef, handleFileInputClick, handleChangeFile, handleClearFiles }

}

const updateDisputesController = (data: any, id: number | string) => {

    const { setIsCreateDispute } = useNewDisputeContext()

    const { userType, userDetail } = useAuthContext()


    const [state, setState] = useState<any>({
        selectedFile: null,
        reference: "",
        comment: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    useEffect(() => {
        setState({
            ...state,
            selectedFile: state?.selectedFile || data?.fileUrl || null,
            reference: state?.reference || data?.transactionReference || "",
            comment: state?.comment || data?.comment || ""
        })

    }, [data])

    const {
        selectedFile,
        reference,
        comment,
        submittingError,
        errorMssg,
        isSubmitting
    } = state

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

    const { refetch } = fetchDisputesData(0, 100, "");

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

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formData = new FormData();
        files && files?.length > 0 ?
            files?.map((each: any, i: any) => formData.append('files', each))
            : null
        formData.append('reference', state?.reference);
        formData.append('comment', state?.comment);

        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        try {
            // certificate_of_incorporation
            // register_of_shareholder
            // register_of_directors 
            // memorandum_and_articles_of_association
            // valid_id_of_directors
            // valid_id_of_ultimate_beneficial_owners
            // operating_license
            // due_diligence_questionaire
            const response = await apiCall({
                name: "logADispute",
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
                    setIsCreateDispute(false);
                    refetch();
                    setFilesString([]);
                    setFiles([]);
                    setState({
                        selectedFile: null,
                        reference: "",
                        comment: "",
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state, files, fileInputRef, handleFileInputClick, handleChangeFile, handleClearFiles }

}

const deleteUsersController = (data: UserDetailProps) => {

    const [state, setState] = useState<any>({
        enabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "deleteMerchantUser",
                data: data?.uuid,
                customHeaders: { merchantId: data?.uuid || "" },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: {
                    title: "User deleted Successfully!",
                    text: "Congratulations, Your have deleted this user.",
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Delete Failed, please try again"
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
                        country: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        gender: "",
                        phoneNumber: "",
                        password: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }

    }

    return { stateValues: state, handleSubmit, handleClearError }
}

export { fetchDisputesData, DisputesController, createDisputesController, updateDisputesController, deleteUsersController }