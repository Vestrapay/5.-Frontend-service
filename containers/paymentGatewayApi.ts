
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';
import { PayWithCardProps } from '@types';
import { useNewTransContext } from 'context/transactionContext';

const payWithCardController = () => {

    const details = useNewTransContext()

    const [state, setState] = useState<any>({
        transactionReference: "",
        amount: 0,
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
        isDisabled: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })


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
        setState({
            ...state,
            amount: state?.amount || details?.amount || "100",
            secret: state?.secret || "VESTRA_LIVEPrvK6C2E2090C1094A28AE146F2E6F0B3D77",//|| details?.secret 
            currency: "NGN",
            name: "",
            number: "",
            cvv: "",
            pin: "",
            expiryMonth: "",
            expiryYear: "",
            customerName: state?.business || details?.business || "Davids co",
            merchantId: state?.merchantId || details?.merchant || "a8c1bc11-11af-4bf4-aefc-a6d57c0b9ce8",
            customerEmail: state?.customerEmail || details?.email || "davoone@mailinator.com",
        })

    }, [details])

    const handleClearError = () => setState({ ...state, submittingError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "payWithCard",
                customHeaders: {
                    merchantId: merchantId || "",
                    secret: secret || ""
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


    return { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues: state }
}

export { payWithCardController }