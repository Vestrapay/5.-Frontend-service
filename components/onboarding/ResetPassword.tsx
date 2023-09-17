import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { apiCall } from 'Utils/URLs'
import { DefaultButton, DefaultInput } from '../reusables'

function ResetPassword({ setPage, passData }: any) {

    const [state, setState] = useState<any>({
        password: "",
        confirmPassword: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    const { submittingError, isDisabled, isSubmitting, errorMssg, password, confirmPassword } = state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
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
                name: "updatePassword",
                data: {
                    password: password,
                    confirmPassword: confirmPassword,
                    otp: passData?.pin || "",
                    username: passData?.email || ""
                },
                successDetails: {
                    title: "Successful",
                    text: `Your password has changed, please continue to login`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    setPage("signin");
                    return [""]
                },
                errorAction: (err?: any) => {
                    console.log(err)
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
                    })
                    return [];
                }
            })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    return (
        <div className=' flex justify-center'>
            <div className="max-w-[1000px] w-full md:w-2/3 h-2/3 flex flex-col items-center justify-center mt-16 md:mt-0 ">
                <div className="relative w-[98%] xs:w-5/6 h-full min-h-[75vh] bg-primary-white px-[5%] sm:px-[12%] py-12 sm:py-24 flex flex-col justify-between items-center border-sm border-primary-white rounded-xl my-10 backdrop-blur-lg bg-opacity-70 ">

                    <div className=" w-11/12 flex -ml-4 sm:-ml-10 lg:-ml-20 gap-2 sm:gap-5 lg:gap-10">
                        <button onClick={() => setPage("signin")} className=" h-full -ml-4 sm:-ml-6 lg:-ml-12 rounded-[50%] bg-whites-ghost p-4">
                            <FaArrowLeft className='text-primary-blue font-600' />
                        </button>
                        <div>
                            <p className=' w-fit text-2xl font-700 '>Change Password</p>
                            <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Please set a new password and confirm.
                                Password must be a minimmum of 8 characters, contain a capital letter, alphanumeric , and must contain a symbol.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-11/12">
                        <div className='flex flex-col gap-8'>
                            {/* fake fields are a workaround for chrome autofill getting the wrong fields */}
                            <input style={{ display: "none" }} type="text" name="fakeusernameremembered" />
                            <input style={{ display: "none" }} type="password" name="fakepasswordremembered" />
                            <DefaultInput
                                type="password"
                                validate={true}
                                name="password"
                                value={password}
                                handleChange={handleChange}
                                label="Password"
                                placeholder="Password"
                            />
                            <DefaultInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                handleChange={handleChange}
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                confirmPassword={true}
                                compare={password}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-8">

                        <DefaultButton
                            labelText="Reset my password"
                            isLoading={isSubmitting}
                            handleClick={handelSubmit}
                        />
                    </div>
                </div>
                <div className="text-gray-400  w-fit text-sm font-400 ">
                    <p>&#169; {`Medusa Virtual ${new Date().getFullYear()}`}</p>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword