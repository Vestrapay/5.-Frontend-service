import { apiCall } from '@utils/URLs'
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useAuthContext } from "../context/AuthContext";

const SignUpController = (setPage: (val: string) => any, setPassData: (val: any) => any = (val) => null) => {
    const { passDataCTX, setPassDataCTX } = useAuthContext() || { passData: {}, setPassData: () => null }

    const [state, setState] = useState<any>({
        country: "",
        firstName: "",
        lastName: "",
        email: "",
        businessName: "",
        referralCode: "",
        phoneNumber: "",
        password: "",
        acceptTerms: false,
        loginError: false,
        isLoggingIn: false,
        loginErrorMssg: ""
    })

    const {
        country,
        firstName,
        lastName,
        email,
        businessName,
        referralCode,
        phoneNumber,
        password, loginError, loginErrorMssg, isLoggingIn
    } = state

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.name == "email") {
            setPassDataCTX({
                ...passDataCTX,
                email: e?.target?.value
            });
            setPassData({
                ...passDataCTX,
                email: e?.target?.value
            });
            setState({
                ...state,
                [e.target.name]: e.target.value,
                loginError: false
            });
        } else if (e?.target?.name == "phoneNumber") {
            setPassDataCTX({
                ...passDataCTX,
                phoneNumber: e?.target?.value
            })
            setPassData({
                ...passDataCTX,
                phoneNumber: e?.target?.value
            });
            setState({
                ...state,
                [e.target.name]: e.target.value,
                loginError: false
            });
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value,
                loginError: false
            });
        }
    }

    const handleExtraChange = (status: string, value: any) => {
        setState({ ...state, [status]: value })
    }

    const handleClearError = () => setState({ ...state, loginError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isLoggingIn: true
        }))
        try {
            const response = await apiCall({
                name: "createUser",
                data: {
                    country,
                    firstName,
                    lastName,
                    email,
                    businessName,
                    referralCode,
                    phoneNumber,
                    password,
                },
                action: (): any => {
                    setState({
                        ...state,
                        isLoggingIn: false,
                        loginError: false,
                    })
                    setPassData({
                        email: email,
                        phoneNumber: phoneNumber
                    });
                    setPage("verifySignUp");

                    return [""]
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Sign Up Failed, please try again"
                        })
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: "Registration Failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    setPassData({
                        email: email,
                        phoneNumber: phoneNumber
                    });

                    // router.push('/dashboard')
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }

    return { stateValues: state, handleSubmit, handleChange, handleClearError, handleExtraChange }

}

const SignInController = (
    setPage: (val: string) => any, resetingPass: boolean = false, setResetingPass: (val: boolean) => any,
    signInStatus: boolean = false, passData: any = {}, setPassData: (val: any) => any) => {

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

    const [state, setState] = useState<any>({
        pin: "",
        confirmPin: "",
        email: "",
        password: "",
        loginError: false,
        isLoggingIn: false,
        loginErrorMssg: ""
    })

    const { setUserType, setUserDetail } = useAuthContext()

    const { email, password, loginError, loginErrorMssg, isLoggingIn } = state

    const setKey = (val: number) => setTimeVal({ ...timeVal, key: val })

    const onChangeOTP = (value: string) => {
        setTimeVal({ ...timeVal, otp: value });
        setState({ ...state, submittingError: false })
    }

    const generateOtp = async () => {
        console.log("login generator initiated...");

        setState((state: any) => ({
            ...state,
            isLoggingIn: true
        }))
        try {
            const response = await apiCall({
                name: "preLoginUser",
                data: {
                    email: passData?.email,
                    password: passData?.password,
                },
                action: (res: any): any => {
                    if (!res?.data?.enabled) {
                        localStorage.setItem('userDetails', JSON.stringify({
                            token: res?.message || "",
                            details: res?.data?.user || "",
                            isSuperAdmin: res?.data?.user?.userType == "MERCHANT" || res?.data?.user?.userType == "MERCHANTUSER" ? false : true
                        }))

                        setState({
                            ...state,
                            isLoggingIn: false,
                            loginError: false,
                        })
                        res?.data?.user?.userType == "MERCHANT" || res?.data?.user?.userType == "MERCHANTUSER" ? setUserType("USER") : setUserType("ADMIN")
                        setUserDetail(res?.data?.user)
                    }
                    return [""]
                },
                successDetails: {
                    title: "Successful",
                    text: `Your OTP has been sent.`,
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Generation Failed, please try again"
                        })
                        return [""]
                    } else {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: "Generation Failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    if (res?.data?.enabled) {
                        setPage("validatelogin")
                    } else {
                        if (resetingPass) {
                            setPage("createpass")
                        } else if (signInStatus) {
                            setResetingPass(false);
                            router.push('/create-business');
                        } else {
                            setResetingPass(false);
                            router.push('/dashboard');
                        }
                    }
                    // setPage("verifySignIn"); 
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }

    const generateSignUpOtp = async (resent: any = false, data: any = "") => {
        await apiCall({
            name: "generateOtp",
            data: passData?.email || data || "",
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    setState({
                        ...state,
                        submittingError: true,
                        errorMssg: "Action failed, please try again"
                    })
                }
                return [""];
            },
            successDetails: {
                title: "Successful",
                text: `Your OTP has been sent.`,
                icon: ""
            },
            action: (): any => resent ? [] : ["skip"]
        })
    }

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            loginError: false
        });
    }

    const handleExtraChange = (status: string, value: string) => {
        setState({ ...state, [status]: value })
    }

    const handleClearError = () => setState({ ...state, loginError: false })

    const handleSubmit = async (e: React.FormEvent) => {
        // console.log("login final initiated...");
        console.log("data: ", passData, "email: " + email, "password: " + password, passData);

        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isLoggingIn: true
        }))
        try {
            const response = await apiCall({
                name: "loginUser",
                data: {
                    email: passData?.email || email,
                    password: passData?.password || password,
                    otp
                },
                action: (res: any): any => {
                    localStorage.setItem('userDetails', JSON.stringify({
                        token: res?.message || "",
                        details: res?.data || "",
                        isSuperAdmin: res?.data?.userType == "MERCHANT" || res?.data?.userType == "MERCHANTUSER" ? false : true
                    }))
                    console.log(res);
                    setState({
                        ...state,
                        isLoggingIn: false,
                        loginError: false,
                    })
                    res?.data?.userType == "MERCHANT" || res?.data?.userType == "MERCHANTUSER" ? setUserType("USER") : setUserType("ADMIN")
                    setUserDetail(res?.data)
                    return ["skip"]
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Login Failed, please try again"
                        })

                        if (err?.response?.data?.errors[0]?.includes("verify OTP")) {
                            setPage("verifySignUp");
                            generateSignUpOtp(false,passData?.email || email);
                        }
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: "Login Failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    if (resetingPass) {
                        setPage("createpass")
                    } else if (signInStatus) {
                        setResetingPass(false);
                        router.push('/create-business');
                    } else {
                        setResetingPass(false);
                        router.push('/dashboard');
                    }
                    // setPage("verifySignIn");
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }

    const handlePreLogin = async (e: React.FormEvent) => {
        console.log("login validation initiated...");

        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isLoggingIn: true
        }))
        try {
            const response = await apiCall({
                name: "preLoginUser",
                data: {
                    email,
                    password,
                },
                action: (res: any): any => {
                    setPassData({ ...passData, email: email, password: password });

                    if (!res?.data?.enabled) {
                        localStorage.setItem('userDetails', JSON.stringify({
                            token: res?.message || "",
                            details: res?.data?.user || "",
                            isSuperAdmin: res?.data?.user?.userType == "MERCHANT" || res?.data?.user?.userType == "MERCHANTUSER" ? false : true
                        }))

                        res?.data?.user?.userType == "MERCHANT" || res?.data?.user?.userType == "MERCHANTUSER" ? setUserType("USER") : setUserType("ADMIN")
                        setUserDetail(res?.data?.user)
                    } else {
                        setPage("validatelogin");
                        setState({
                            ...state,
                            isLoggingIn: false,
                            loginError: false,
                        })
                    }
                    return ["skip"]
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Login Failed, please try again"
                        })

                        if (err?.response?.data?.errors[0]?.includes("verify OTP")) {
                            setPage("verifySignUp");
                            setPassData({ ...passData, email: email, password: password });
                            generateSignUpOtp(false, passData?.email || email);
                        }
                        return ["skip"]
                    } else {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: "Login Failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    setPassData({ ...passData, email: email, password: password });
                    if (res?.enabled) {
                        console.log("enabled: ", res?.data);
                        setPage("validatelogin");
                    } else {
                        if (resetingPass) {
                            setPage("createpass")
                        } else if (signInStatus) {
                            setResetingPass(false);
                            router.push('/create-business');
                        } else {
                            setResetingPass(false);
                            router.push('/dashboard');
                        }
                    }
                    // setPage("verifySignIn");
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }


    return { stateValues: state, handleSubmit, handleChange, handleClearError, onChangeOTP, timeVal, setKey, handlePreLogin, generateOtp, generateSignUpOtp }

}

const VerifySignUpController = (setPage: (val: string) => any, passData: any, passDataCtx: any, setSignInStatus: (val: any) => any) => {

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

    const [state, setState] = useState<any>({
        pin: "",
        confirmPin: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    const { submittingError, isDisabled, isSubmitting, errorMssg, pin } = state

    const setKey = (val: number) => setTimeVal({ ...timeVal, key: val })

    const onChangeOTP = (value: string) => {
        setTimeVal({ ...timeVal, otp: value });
        setState({ ...state, submittingError: false })
    }

    const generateOtp = async (resent: any = false, data: any = "") => {
        await apiCall({
            name: "generateOtp",
            data: passData?.email || data || passDataCtx.email||"",
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    setState({
                        ...state,
                        submittingError: true,
                        errorMssg: "Action failed, please try again"
                    })
                }
                return [""];
            },
            successDetails: {
                title: "Successful",
                text: `Your OTP has been resent.`,
                icon: ""
            },
            action: (): any => resent ? [] : ["skip"]
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        console.log("Submitting validate otp with data",passData)
        try {
            const response = await apiCall({
                name: "validateOtp",
                data: {
                    email: passData?.email || passDataCtx.email||"",
                    otp
                },
                successDetails: {
                    title: "Successful",
                    text: `Please proceed to login with your details.`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    // router.push("/dashboard");
                    setSignInStatus(true);
                    setPage("login");
                    router.push("/login?section=signin");
                    return [""]

                },
                errorAction: (err?: any) => {
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
                            errorMssg: "Action Failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // router.push('/dashboard')
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }

    const handleClearError = () => setState({ ...state, submittingError: false })

    return { stateValues: state, handleSubmit, onChangeOTP, timeVal, setKey, handleClearError, generateOtp }

}

const VerifySignInController = (setPage: (val: string) => any, passData: any) => {

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

    const [state, setState] = useState<any>({
        pin: "",
        confirmPin: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    // console.log(passData);

    const { submittingError, isDisabled, isSubmitting, errorMssg, pin } = state


    // useEffect(() => {
    //     let myPhoneInterval = setInterval(() => {
    //         if (seconds > 0) {
    //             setTimeVal({ ...timeVal, seconds: seconds - 1 });
    //         }
    //         if (seconds === 0) {
    //             if (minutes === 0) {
    //                 clearInterval(myPhoneInterval)
    //             } else {
    //                 setTimeVal({ ...timeVal, minutes: minutes - 1 });
    //                 setTimeVal({ ...timeVal, seconds: 59 });
    //             }
    //         }
    //         if (clear) { clearInterval(myPhoneInterval); setTimeVal({ ...timeVal, clear: false }) }
    //         myPhoneInterval = setInterval(() => {
    //             if (seconds > 0) {
    //                 setTimeVal({ ...timeVal, seconds: seconds - 1 });
    //             }
    //             if (seconds === 0) {
    //                 if (minutes === 0) {
    //                     clearInterval(myPhoneInterval)
    //                 } else {
    //                     setTimeVal({ ...timeVal, minutes: minutes - 1 });
    //                     setTimeVal({ ...timeVal, seconds: 59 });
    //                 }
    //             }
    //         }, 1000)
    //     }, 1000)
    //     return () => {
    //         clearInterval(myPhoneInterval);
    //     };
    // }, [clear]);

    const setKey = (val: number) => setTimeVal({ ...timeVal, key: val })

    const onChangeOTP = (value: string) => {
        setTimeVal({ ...timeVal, otp: value });
        setState({ ...state, submittingError: false })
    }

    const generateOtp = async (resent: any = false) => {
        await apiCall({
            name: "generateOtp",
            data: passData?.email || "",
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    setState({
                        ...state,
                        submittingError: true,
                        errorMssg: "Action failed, please try again"
                    })
                }
                return ["skip"];
            },
            successDetails: {
                title: "Successful",
                text: `Your OTP has been resent.`,
                icon: ""
            },
            action: (): any => resent ? [] : ["skip"]
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response: any = await apiCall({
                name: "validateOtp",
                data: {
                    email: passData?.email || "",
                    otp
                },
                successDetails: {
                    title: "Successful",
                    text: `Please proceed to login with your details.`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    router.push("/dashboard");
                    // setPage("login")
                    return [""]

                },
                errorAction: (err?: any) => {
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
                            errorMssg: "Login Failed, please try again"
                        })
                    }
                }
            })
                .then(async (res: any) => {
                    // router.push('/dashboard')
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }

    const handleClearError = () => setState({ ...state, submittingError: false })

    return { stateValues: state, handleSubmit, onChangeOTP, timeVal, setKey, handleClearError, generateOtp }

}

const ResetPasswordController = (setPage: (val: string) => any, setResetingPass: (val: boolean) => any) => {
    const [state, setState] = useState<any>({
        pin: "",
        email: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    const { submittingError, isDisabled, isSubmitting, errorMssg, pin, email } = state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            loginError: false
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            await apiCall({
                name: "resetPassword",
                data: email,
                successDetails: {
                    title: "Successful",
                    text: `Please check your email for a temporary password. and login to change the password.`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    setResetingPass(true)
                    return [""]
                },
                errorAction: (err?: any) => {
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Action Failed, please try again"
                    })
                    return ["skip"];
                }
            })
                .then(async (res: any) => {
                    if (res) {
                        setResetingPass(true)
                        setPage("signin");
                        setState({
                            ...state,
                            isSubmitting: false,
                            submittingError: false,
                            check: true,
                            errorMssg: ""
                        });
                    }
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
            // setPage("createpass");
        }
    }

    const handleClearError = () => setState({ ...state, loginError: false })

    return { stateValues: state, handleChange, handleSubmit, handleClearError }
}

const ResetedPasswordController = (setPage: (val: string) => any, setResetingPass: (val: boolean) => any) => {

    const [state, setState] = useState<any>({
        oldPassword: "",
        password: "",
        confirmPassword: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    const { submittingError, isDisabled, isSubmitting, errorMssg, oldPassword, password, confirmPassword } = state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    useEffect(() => {
        if (confirmPassword !== password && confirmPassword !== "") {
            setState({
                ...state,
                isDisabled: true,
                submittingError: true,
                errorMssg: "Your passwords do not match."
            })
        } else {
            setState({
                ...state,
                isDisabled: false,
                submittingError: false,
                errorMssg: ""
            })
        }
    }, [confirmPassword])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            await apiCall({
                name: "changePassword",
                data: {
                    oldPassword: oldPassword,
                    newPassword: confirmPassword
                },
                successDetails: {
                    title: "Successful",
                    text: `Your password has changed, please login with new password.`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        oldPassword: "",
                        password: "",
                        confirmPassword: "",
                        isSubmitting: false,
                        submittingError: false,
                    });
                    setResetingPass(false);
                    setPage("signin");
                    return [""]
                },
                errorAction: (err?: any) => {
                    console.log(err)
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: err?.response?.data?.errors && err?.response?.data?.errors[0] || "Action Failed, please try again"
                    })
                    return [];
                }
            })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        }
    }

    const handleClearError = () => setState({ ...state, loginError: false })

    return { stateValues: state, handleChange, handleSubmit, handleClearError }
}

export {
    SignUpController,
    SignInController,
    VerifySignUpController,
    VerifySignInController,
    ResetPasswordController,
    ResetedPasswordController
};
