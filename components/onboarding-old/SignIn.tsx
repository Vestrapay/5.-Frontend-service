import React, { useEffect, useState } from 'react'
import router from 'next/router';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { apiCall } from '../../Utils/URLs'
import { LoginErrorCard } from '../../Utils/actions/error';

function SignIn({ setPage }: any) {

    // state values
    const [data, setData] = useState("")

    const [passStatus, setPassStatus] = useState(false)

    const [state, setState] = useState<any>({
        email: "",
        password: "",
        loginError: false,
        isLoggingIn: false,
        loginErrorMssg: ""
    })

    const { email, password, loginError, loginErrorMssg, isLoggingIn } = state

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            loginError: false
        });
    }

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isLoggingIn: true
        }))
        try {
            const response = await apiCall({
                name: "loginUser",
                data: {
                    username: state.email,
                    password: state.password
                },
                action: (): any => {
                    setState({
                        ...state,
                        isLoggingIn: false,
                        loginError: false,
                    })
                    return ["skip"]
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            loginError: true,
                            isLoggingIn: false,
                            loginErrorMssg: err?.response?.data?.respDescription || "Login Failed, please try again"
                        })
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
                    const { token, role } = res;
                    const { id,
                        delFlag,
                        institutionId,
                        firstName,
                        lastName,
                        email,
                        userName,
                        isEnabled,
                        roleId,
                        isPasswordChange,
                        level,
                        createdBy } = res?.user;

                    await localStorage.setItem('userDetails', JSON.stringify({
                        role: role,
                        token,
                        userId: id,
                        firstName,
                        lastName,
                        userName,
                        password,
                        delFlag,
                        email,
                        isEnabled,
                        institutionId,
                        roleId,
                        requirePasswordChange: isPasswordChange,
                        level,
                        createdBy
                    }))
                    router.push('/dashboard')
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    return (
        <div className=' flex justify-center'>
            <div className="max-w-[1000px] w-full md:w-2/3 h-2/3 flex flex-col items-center justify-center mt-16 sm:mt-0">

                <div className="relative w-[98%] xs:w-5/6 h-full min-h-[75vh] bg-[#181d3275] px-[5%] sm:px-[12%] py-12 sm:py-24 flex flex-col justify-between items-center rounded-xl my-5 sm:my-10 backdrop-blur-sm">

                    {/* <div className=" z-1 absolute w-full left-0 top-0 h-full bg-primary-white rounded-xl backdrop-blur-sm"></div> */}
                    <div className=" w-11/12">
                        <p className=' w-fit text-2xl font-700 text-primary-white'>Sign In</p>
                        <p className='text-gray-400  w-fit text-base font-400 text-primary-white leading-7'>Welcome back, please input your sign in details below</p>
                    </div>
                    <div className="flex flex-col gap-5 w-11/12">
                        <div className='flex flex-col gap-8'>
                            <DefaultInput
                                type="email"
                                name="email"
                                value={email}
                                handleChange={handleChange}
                                isDisabled={isLoggingIn}
                                placeholder="Enter user name"
                            />
                            <DefaultInput
                                type="password"
                                name="password"
                                validate={false}
                                value={password}
                                isDisabled={isLoggingIn}
                                handleChange={handleChange}
                            />
                        </div>

                        <div className=" flex flex-col-reverse gap-5 sm sm:flex-row justify-between items-center">
                            <button onClick={() => setPage("forgotpass")} className=' w-fit text-primary-blue text-sm font-600 '>Forgot Password?</button>
                            <DefaultButton
                                labelText="Log In"
                                isLoading={isLoggingIn}
                                handleClick={handelSubmit}
                            />
                        </div>
                        <LoginErrorCard handleClear={() => setState({ ...state, loginError: false })} error={loginErrorMssg} containerVariant={!loginError ? "hidden" : ""} />
                    </div>

                    <div className="mt-5 xs:mt-0">
                        {/* <button onClick={() => router.push("/create-account")} className='w-fit text-base font-500 '>No account yet? <span className='text-primary-blue'>Create New Account</span></button> */}
                    </div>
                </div>
                <div className="text-gray-400  w-fit text-sm font-400 ">
                    <p>&#169; {`Medusa Virtual ${new Date().getFullYear()}`}</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;