
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';
import { PayWithCardProps } from '@types';
import { useNewTransContext } from 'context/transactionContext';

const paymentGatewayController = () => {

    const details = useNewTransContext()

    const { secretKey } = Storage.getItem("apiKeys") || { secretKey: "" }
    const { details: { merchantId: merchantsID } } = Storage.getItem("userDetails") || { details: { merchantId: "" } }

    const [state, setState] = useState<any>({
        transactionReference: "",
        amount: 0,
        countKey: 101,
        currency: "NGN",
        name: "",
        number: "",
        cvv: "",
        pin: "",
        date: "",
        secret: "",
        expiryMonth: "",
        expiryYear: "",
        customerName: "",
        customerEmail: "",
        merchantId: "",

        cardStatus: "pay",
        cardPin: "",
        cardPhoneOTP: "",
        cardAuthOTP: "",
        cardAvsState: "",
        cardAvsCity: "",
        cardAvsCountry: "",
        cardAvsAddress: "",
        cardAvsZipCode: "",

        payCustomerName: "",
        payCustomerEmail: "",
        payDescription: "",
        payCustomizedLink: "",
        linktransactionId: "",
        linkId: "",

        linkGenerated: false,

        isDisabled: false,
        submittingError: false,
        initiationError: false,
        initiated: false,
        transferSent: false,
        transferSentError: false,
        isSubmitting: false,
        isFetchingLinkData: false,
        isSubmittingTrans: true,
        errorMssg: ""
    })

    const [timeVal, setTimeVal] = useState({
        otp: '',
        clear: false,
        minutes: 0,
        seconds: 150,
        key: 0,
    })

    const {
        otp,
        clear,
        minutes,
        seconds,
        key,
    } = timeVal || {}

    const onChangeOTP = (value: string) => {
        setTimeVal({ ...timeVal, otp: value });
        setState({ ...state, submittingError: false })
    }


    const [transferDetails, setTransferDetails] = useState<any>({
        reference: "",
        data: {},
        account_name: "",
        account_number: "",
        bank_code: "",
        bank_name: "",
    });


    const {
        amount,
        currency,
        name,
        number,
        cvv,
        pin,
        expiryMonth,
        expiryYear,
        customerName,
        customerEmail,
        merchantId,
        isDisabled,
        secret,
        transactionReference,
        submittingError, errorMssg, isSubmitting } = state

    useEffect(() => {
        if (name && number && cvv && expiryMonth && expiryYear) {
            setState({
                ...state,
                isDisabled: !isDisabled,
            })
        }
    }, [name, number, cvv, expiryMonth, expiryYear])


    useEffect(() => {
        if (state?.paymentPath && window && window.location.href) {

            let baseUrl = window.location.href.split("/payment-gateway/payment-link")[0];
            let paymentLinkUrl = baseUrl + "/paylink/" + state?.paymentPath;
            setState({
                ...state,
                paymentLinkUrl: paymentLinkUrl,
            })
        }
    }, [state?.paymentPath])

    useEffect(() => {
        setState({
            ...state,
            amount: state?.amount || details?.amount || "",
            secret: secretKey || details?.payLinkDetails?.secret || state?.secret || "",//|| details?.secret 
            currency: "NGN",
            name: "",
            number: "",
            cvv: "",
            pin: "",
            expiryMonth: "",
            expiryYear: "",
            payCustomerName: "",
            payCustomerEmail: "",
            payDescription: "",
            payCustomizedLink: "",

            linkGenerated: false,
            isFetchingLinkError: false,

            customerName: state?.customerName || details?.business || "",
            merchantId: details?.payLinkDetails?.merchantId || merchantsID || state?.merchantId || details?.merchant || "",
            customerEmail: state?.customerEmail || details?.email || "",
        })
    }, [details])


    const handleClearError = () => setState({ ...state, submittingError: false })

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name == "date") {
            if (value?.length >= 2) {
                let first = value.slice(0, 2)?.replace("/", "");
                let second = value.slice(2)?.replace("/", "");

                let oneDate = `${first?.replace("/", "")}/${second?.replace("/", "")}`

                setState({
                    ...state,
                    date: oneDate,
                    expiryMonth: first,
                    expiryYear: second,
                    submittingError: false
                });
            } else {
                setState({
                    ...state,
                    date: e?.target?.value?.replace("/", ""),
                })
            }
        } else if (name == "number") {
            let newValue = value?.replace(/ /g, "")?.match(/.{1,4}/g)?.join(' ') || value;
            let pureValue = value?.replace(/ /g, "") || value;
            setState({
                ...state,
                pureNumber: pureValue,
                [e.target.name]: newValue,
                submittingError: false
            });
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value,
                submittingError: false
            });
        }
    }

    const handleExtraChange = (name: any, value: any) => {
        setState({
            ...state,
            [name]: value,
            submittingError: false
        });
    }

    //Submit Card payments

    const handleSubmitCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "payWithCard",
                customHeaders: {
                    merchantId: merchantId || details?.payLinkDetails?.merchantId || "",
                    secret: secret || details?.payLinkDetails?.secret || ""
                },
                data: {
                    transactionReference,
                    amount: Number(amount || 0) || 0,
                    currency,
                    card: {
                        name,
                        number: state?.pureNumber || number,
                        cvv,
                        pin,
                        expiryMonth,
                        expiryYear,
                    },
                    customerDetails: {
                        name: customerName,
                        email: customerEmail,
                    }
                },
                action: (res: any): any => {
                    console.log(res);

                    //auth_model: "NO_AUTH"
                    if ((res?.data?.data?.status === "success")) {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: "success",
                            isSubmitting: false,
                            submittingError: false,
                        })
                        setTimeout(() => {
                            window.history.back();
                        }, 2000);
                    } else if (res?.data?.data?.status !== "success") {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: res?.data?.data?.auth_model || res?.data?.data?.status || "pay",
                            isSubmitting: false,
                            submittingError: false,
                        })
                    } else {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: res?.data?.data?.auth_model || res?.data?.data?.status || "pay",
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Your payment failed, please try again."

                        })
                    }
                    return ["skip"]
                },
                // successDetails: { title: "Payment Successful!", text: "Congratulations, Your payment was successful.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Payment failed, please try again"
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
                    console.log(res)
                    // showModal();
                    res?.data?.status === "success" ?
                        setState({
                            ...state,
                            transactionReference: res?.data?.transaction_reference || res?.data?.transaction_reference || state?.transactionReference,
                            cardStatus: (res?.data?.status === "success") ? "success" : res?.data?.auth_model || "pay",
                            currency: "NGN",
                            name: "",
                            number: "",
                            cvv: "",
                            pin: "",
                            expiryMonth: "",
                            expiryYear: "",
                            customerName: "",
                            customerEmail: "",
                            submittingError: false,
                            isSubmitting: false,
                            errorMssg: ""
                        }) :
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: res?.data?.response_message || "Action failed, please try again" || ""
                        })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    //Authorize card payments

    const handleCardPayAuth = async (url: string) => {

        let data;

        switch (url) {
            case "authPin":
                data = {
                    authorization: {
                        pin: state?.cardPin,
                    },
                    transaction_reference: state?.transactionReference
                }
                break;
            case "authOtp":
                data = {
                    authorization: {
                        otp: state?.cardPhoneOTP,
                    },
                    transaction_reference: state?.transactionReference
                }
                break;
            case "authPhone":
                data = {
                    authorization: {
                        phone: state?.cardPhoneOTP,
                    },
                    transaction_reference: state?.transactionReference
                }
                break;
            case "authAvs":
                data = {
                    authorization: {
                        avs: {
                            state: state?.cardAvsState,
                            city: state?.cardAvsCity,
                            country: state?.cardAvsCountry,
                            address: state?.cardAvsAddress,
                            zip_code: state?.cardAvsZipCode
                        }
                    },
                    transaction_reference: state?.transactionReference
                }
                break;
            default:
                break;
        }

        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: url,
                customHeaders: {
                    merchantId: merchantId || details?.payLinkDetails?.merchantId || "",
                    secret: secret || details?.payLinkDetails?.secret || ""
                },
                data: data,
                action: (res: any): any => {
                    if ((res?.data?.data?.status === "success")) {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: "success",
                            isSubmitting: false,
                            submittingError: false,
                        })
                        setTimeout(() => {
                            window.history.back();
                        }, 2000);
                    } else if (res?.data?.data?.status !== "processing") {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: res?.data?.data?.auth_model || "pay",
                            isSubmitting: false,
                            submittingError: false,
                        })
                    } else if (res?.data?.data?.status !== "success") {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: res?.data?.data?.auth_model || "pay",
                            isSubmitting: false,
                            submittingError: false,
                        })
                    } else {

                        setState({
                            ...state,
                            transactionReference: res?.data?.data?.transaction_reference || res?.data?.transaction_reference || "",
                            cardStatus: res?.data?.data?.auth_model || "pay",
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Your payment failed, please try again."

                        })
                    }
                    return ["skip"]
                },
                // successDetails: { title: "Payment Successful!", text: "Congratulations, Your payment was successful.", icon: "" },
                errorAction: (err?: any) => {

                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || err?.response?.data?.data?.message || "Payment Failed, please try again"
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
                        transactionReference: res?.data?.transaction_reference || res?.data?.transaction_reference || state?.transactionReference,
                        cardStatus: (res?.data?.status === "success") ? "success" : res?.data?.auth_model || "pay",
                        amount: 0,
                        currency: "NGN",
                        name: "",
                        number: "",
                        cvv: "",
                        pin: "",
                        expiryMonth: "",
                        expiryYear: "",
                        customerName: "",
                        customerEmail: "",
                        merchantId: "",
                        cardPin: "",
                        cardPhoneOTP: "",
                        cardAuthOTP: "",
                        cardAvsState: "",
                        cardAvsCity: "",
                        cardAvsCountry: "",
                        cardAvsAddress: "",
                        cardAvsZipCode: "",
                        submittingError: (res?.data?.status !== "success") ? true : false,
                        isSubmitting: false,
                        errorMssg: (res?.data?.status == "processing")
                            ? "Your transaction is in progress." :
                            (res?.data?.status == "failed") ?
                                res?.data?.response_message || "Your transaction is in progress."
                                : ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }


    //Initiate Transfer payments
    const handleInitiateTransfer = async (e: React.FormEvent | null) => {
        e?.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: false,
            initiated: false,
            initiationError: false,
            submittingError: false,
            isSubmittingTrans: true,
            transferSent: false,
            transferSentError: false,
        }))
        try {
            const response = await apiCall({
                name: "payWithTransfer",
                customHeaders: {
                    merchantId: merchantId || details?.payLinkDetails?.merchantId || "",
                    secret: secret || details?.payLinkDetails?.secret || ""
                },
                data: {
                    transactionReference,
                    amount: Number(amount || 0) || 0,
                    currency,
                    customer: {
                        name: customerName,
                        email: customerEmail,
                    }
                },
                action: (res): any => {
                    let { data: { data } } = res
                    setTransferDetails({
                        ...transferDetails,
                        account_name: data?.bank_account?.account_name || "",
                        account_number: data?.bank_account?.account_number || "",
                        bank_code: data?.bank_account?.bank_code || "",
                        bank_name: data?.bank_account?.bank_name || "",
                        reference: data?.reference || "",
                        data: data
                    })
                    setState({
                        ...state,
                        initiated: true,
                        initiationError: false,
                        amount: state?.amount || details?.amount || "100",
                        customerName: state?.business || details?.business || "Davids co",
                        merchantId: state?.merchantId || details?.merchant || "a8c1bc11-11af-4bf4-aefc-a6d57c0b9ce8",
                        customerEmail: state?.customerEmail || details?.email || "davoone@mailinator.com",
                        isSubmittingTrans: false,
                        submittingError: false,
                    })
                    return ["skip"]
                },
                successDetails: { title: "Payment initiated", text: "Bank transfer initiated successfully", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: false,
                            initiationError: false,
                            isSubmittingTrans: false,
                            initiated: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Payment Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: false,
                            initiationError: false,
                            isSubmittingTrans: false,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();
                    // setState({
                    //     ...state,
                    //     submittingError: false,
                    //     isSubmitting: false,
                    //     errorMssg: ""
                    // })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
            setState({
                ...state,
                submittingError: false,
                initiationError: false,
                isSubmittingTrans: false,
                errorMssg: "Action failed, please try again"
            })
        };
    }

    //Initiate Transfer payments
    const handleTSQ = async () => {

        setState({
            ...state,
            submittingError: false,
            isSubmitting: true,
        })

        try {
            const response = await apiCall({
                name: "transferStatusQuery",
                urlExtra: `/${transferDetails?.reference || ""}`,
                customHeaders: {
                    merchantId: details?.payLinkDetails?.merchantId || merchantId || "",
                    secret: secret || details?.payLinkDetails?.secret || ""
                },
                data: {
                    transactionReference,
                    amount: Number(amount || 0) || 0,
                    currency,
                    customer: {
                        name: customerName,
                        email: customerEmail,
                    }
                },
                action: (res): any => {
                    // let { data: { data } } = res
                    // setTransferDetails({
                    //     account_name: data?.bank_account?.account_name || "",
                    //     account_number: data?.bank_account?.account_number || "",
                    //     bank_code: data?.bank_account?.bank_code || "",
                    //     bank_name: data?.bank_account?.bank_name || ""
                    // })
                    // setState({
                    //     ...state,
                    //     initiated: true,
                    //     amount: state?.amount || details?.amount || "100",
                    //     customerName: state?.business || details?.business || "Davids co",
                    //     merchantId: state?.merchantId || details?.merchant || "a8c1bc11-11af-4bf4-aefc-a6d57c0b9ce8",
                    //     customerEmail: state?.customerEmail || details?.email || "davoone@mailinator.com",
                    //     isSubmitting: false,
                    //     submittingError: false,
                    // })
                    setState({
                        ...state,
                        submittingError: false,
                        isSubmitting: false,
                        transferSent: true,
                    })
                    setTimeout(() => {
                        window.history.back();
                    }, 2000);
                    return ["skip"]
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: false,
                            isSubmitting: false,
                            initiated: false,
                            transferSentError: true,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Payment Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: false,
                            isSubmitting: false,
                            transferSentError: true,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    //Initiate Transfer payments
    const handleInitiatePaymentLink = async (e: React.FormEvent | null) => {
        e?.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: false,
            isFetchingLinkData: true,
            isFetchingLinkError: false,
            initiated: false,
            initiationError: false,
            submittingError: false,
            Error: false,
            isSubmittingTrans: true,
            transferSent: false,
            transferSentError: false,
        }))
        try {
            const response = await apiCall({
                name: "paymentLinkDetail",
                urlExtra: `/${details?.payPath || ""}`,
                action: (res, returned): any => {
                    let { data } = res;
                    details?.setPayLinkDetails({
                        ...details?.payLinkDetails,
                        merchantId: returned?.headers?.merchant_id || data[0]?.merchantId || state?.merchantId || "",
                        secret: returned?.headers?.merchant_secret || secretKey || data[0]?.secret || state?.secret || "",
                    })

                    setState({
                        ...state,
                        initiationError: false,
                        isFetchingLinkData: false,
                        isFetchingLinkError: false,
                        amount: data[0]?.amount || state?.amount || "",
                        customerName: data[0]?.customerName || state?.business || "",
                        merchantId: returned?.headers?.merchant_id || data[0]?.merchantId || state?.merchantId || "",
                        secret: returned?.headers?.merchant_secret || secretKey || data[0]?.secret || state?.secret || "",
                        customerEmail: data[0]?.customerEmail || state?.customerEmail || "",
                        linktransactionId: data[0]?.transactionId || state?.linktransactionId || "",
                        linkId: data[0]?.uuid || state?.linkId || "",
                        isSubmittingTrans: false,
                        submittingError: false,
                    })
                    return ["skip"]
                },
                successDetails: { title: "Payment initiated", text: "Payment initiated successfully", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: false,
                            initiationError: false,
                            isSubmittingTrans: false,
                            isFetchingLinkData: false,
                            isFetchingLinkError: true,
                            initiated: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Initiation Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            submittingError: false,
                            initiationError: false,
                            isSubmittingTrans: false,
                            isFetchingLinkData: false,
                            isFetchingLinkError: true,
                            errorMssg: "Action failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // showModal();

                    setState({
                        ...state,
                        // secret: secretKey || state?.secret || "VESTRA_TESTPrvK25CCB24A30F44E69BD00DA0010F5BDEF",//|| details?.secret 
                        amount: res[0]?.amount || state?.amount || "",
                        customerName: res[0]?.customerName || state?.customerName || "",
                        // merchantId: res[0]?.merchantId || state?.merchantId || "",
                        customerEmail: res[0]?.customerEmail || state?.customerEmail || "",
                        linktransactionId: res[0]?.transactionId || state?.linktransactionId || "",
                        linkId: res[0]?.uuid || state?.linkId || "",
                        isFetchingLinkData: false,
                        isFetchingLinkError: false,
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })

        } catch (e) {
            console.log(e + " 'Caught Error.'");
            setState({
                ...state,
                submittingError: false,
                initiationError: false,
                isSubmittingTrans: false,
                isFetchingLinkError: true,
                errorMssg: "Action failed, please try again"
            })
        };
    }

    //Authorise payments
    useEffect(() => {
        if (details?.payPath) {
            handleInitiatePaymentLink(null);
        }

    }, [details?.payPath])

    useEffect(() => {
        (router?.asPath?.includes("transfer") || details?.payment == "transfer") && customerName && customerEmail && !transferDetails?.account_name && handleInitiateTransfer(null);
    }, [details])


    //Submit USSD payments
    const handleSubmitUSSD = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "payWithCard",
                customHeaders: {
                    merchantId: merchantId || details?.payLinkDetails?.merchantId || "",
                    secret: secret || details?.payLinkDetails?.secret || ""
                },
                data: {
                    transactionReference,
                    amount: Number(amount || 0) || 0,
                    currency,
                    card: {
                        name,
                        number,
                        cvv,
                        pin,
                        expiryMonth,
                        expiryYear,
                    },
                    customerDetails: {
                        name: customerName,
                        email: customerEmail,
                    }
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "Payment Successful!", text: "Congratulations, Your payment was successful.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Payment Failed, please try again"
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
                        transactionReference: "",
                        amount: 0,
                        currency: "NGN",
                        name: "",
                        number: "",
                        cvv: "",
                        pin: "",
                        expiryMonth: "",
                        expiryYear: "",
                        customerName: "",
                        customerEmail: "",
                        merchantId: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    //Submit Link payments
    const handleSubmitLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "paymentLink",
                customHeaders: {
                    merchantId: merchantId || details?.payLinkDetails?.merchantId || "",
                    secret: secret || details?.payLinkDetails?.secret || ""
                },
                data: {
                    amount: Number(amount || 0) || 0,
                    currency,
                    customer: {
                        name: state?.payCustomerName,
                        email: state?.payCustomerEmail,
                    },
                    invoiceId: String(10000000 * Math.random()).split(".")[1].replaceAll("0", "10") || "",
                    description: state?.payDescription,
                    customizedLink: state?.payCustomizedLink,
                    daysActive: "",
                    additionalData: {
                        Duis_2_: "",
                    }
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                        linkGenerated: true
                    })
                    return []
                },
                successDetails: { title: "Payment Link Generated!", text: "Congratulations, Your payment link generation was successful.", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Generation Failed, please try again"
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
                    console.log(res);
                    let baseUrl = window.location.href.split("/payment-gateway/payment-link")[0];
                    let paymentLinkUrl = baseUrl + "/paylink/" + res?.path;

                    setState({
                        payCustomerName: "",
                        payCustomerEmail: "",
                        payDescription: "",
                        payCustomizedLink: "",
                        transactionReference: "",
                        paymentPath: res?.path || "",
                        paymentLinkUrl,
                        amount: 0,
                        currency: "NGN",
                        name: "",
                        number: "",
                        cvv: "",
                        pin: "",
                        linkGenerated: true,
                        expiryMonth: "",
                        expiryYear: "",
                        customerName: "",
                        customerEmail: "",
                        merchantId: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }


    const fetchUsersData = (search: string) => {

        const func = async (): Promise<any> => {
            const response = await apiCall({
                name: "paymentLinkList", //"getTransactions",
                customHeaders: {
                    merchantId: merchantsID || details?.payLinkDetails?.merchantId || "",
                    secret: secretKey || details?.payLinkDetails?.secret || ""
                },
                action: (): any => (["skip"])
            })
            return response;
        }

        const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
            ["PAYMENT_LIST_DATA", "LIST", search], () => func(),
            {
                refetchOnWindowFocus: false,
                // staleTime: 60000
            }
        );
        return { isLoading, isError, error, isSuccess, data, refetch }
    }

    const PaymentLinkList = (search: string = "") => {

        //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

        const { isLoading, isError, error, isSuccess, data, refetch } = fetchUsersData(search);

        useEffect(() => {
            refetch()
        }, [search])

        return { isLoading, isError, error, isSuccess, data, refetch }

    }

    return {
        handleSubmitCard, handleInitiatePaymentLink, PaymentLinkList, handleCardPayAuth, timeVal, onChangeOTP, handleTSQ, handleInitiateTransfer,
        handleSubmitUSSD, handleSubmitLink, handleClearError, handleChange, handleExtraChange, transferDetails, stateValues: state
    }
}

export { paymentGatewayController };
