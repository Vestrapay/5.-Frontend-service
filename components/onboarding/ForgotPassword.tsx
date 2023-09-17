import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import router from 'next/router';
import { DefaultButton, DefaultInput } from '../reusables';
import { apiCall } from 'Utils/URLs';
import { LoginErrorCard } from 'Utils/actions/error';

function ForgotPassword(props: any) {

    const { setPage, setPassData } = props
    const [state, setState] = useState<any>({
        pin: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })
    
    const { submittingError, isDisabled, isSubmitting, errorMssg, pin } = state

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
            isSubmitting: true
        }))
        try {
            await apiCall({
                name: "forgotPassword",
                data: {
                    username: pin,
                },
                successDetails: {
                    title: "Successful",
                    text: `Please check your email, a link has been sent to you.`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    return [""]
                },
                errorAction: (err?: any) => {
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
                    })
                    return ["skip"];
                }
            })
                .then(async (res: any) => {
                    if (res) {
                        setPage("signin");
                        // setPassData({
                        //     email: res?.phone,
                        //     pin: res?.code
                        // });
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
        };
    }


    return (
        <div className=' flex justify-center'>
            <div className="max-w-[1000px] w-full md:w-2/3 h-2/3 flex flex-col items-center justify-center mt-16 md:mt-0 ">
                <div className="relative w-[98%] xs:w-5/6 h-full min-h-[65vh] bg-[#181d32] px-[2.5%] sm:px-[12%] py-12 sm:py-24 flex flex-col justify-between items-center border-sm border-primary-white rounded-xl my-10 backdrop-blur-lg bg-opacity-70 ">
                    <div className=" w-11/12 flex -ml-4 sm:-ml-10 lg:-ml-20 gap-2 sm:gap-5 lg:gap-10">
                        <button onClick={() => setPage("signin")} className=" h-full -ml-4 sm:-ml-6 lg:-ml-12 rounded-[50%] bg-whites-ghost p-4">
                            <FaArrowLeft className='text-primary-blue font-600' />
                        </button>
                        <div>
                            <p className=' w-fit text-2xl font-700 text-primary-white '>Forgot Password?</p>
                            <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Please enter the username linked with your account</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-11/12">
                        <div className='flex flex-col gap-8'>
                            <DefaultInput
                                type="email"
                                name="pin"
                                label="Username"
                                value={pin}
                                handleChange={handleChange}
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>
                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                    <div className="flex flex-col items-center gap-8">
                        <DefaultButton
                            labelText="Continue"
                            isLoading={isSubmitting}
                            handleClick={handelSubmit}
                        />

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

export default ForgotPassword;