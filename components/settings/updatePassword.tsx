import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { FaArrowLeft } from 'react-icons/fa'
import { DefaultButton, DefaultInput } from '../reusables'
import { apiCall } from 'Utils/URLs'
import { LoginErrorCard } from 'Utils/actions/error'


function UpdatePassword({ show, showModal }: any) {

    const [page, setPage] = useState("signin");
    const [passData, setPassData] = useState({})

    const [state, setState] = useState<any>({
        currentPassword: "",
        username: "",
        newPassword: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    const { submittingError, isDisabled, isSubmitting, errorMssg, currentPassword, username, confirmPassword } = state

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
                data: {
                    username
                },
                successDetails: {
                    title: "Password Change Requested",
                    text: `New credentials has been sent to your email.`,
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
                        errorMssg: "Action failed, please try again"
                    })
                    return [];
                }
            })
                .then(async (res: any) => {
                    if (res) {
                        showModal();
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
        }
    }
    
    return (
        <div>
            <Modal show={show} clicked={()=>{showModal();setPage("signin");}} >
                
        <div className=' flex justify-center'>
            <div className="w-full py-8 px-12 max-w-[500px] h-2/3 flex flex-col items-center justify-center ">

                <div className="flex flex-row justify-start gap-8 w-full h-full bg-blue-dark rounded-xl backdrop-blur-sm ">
                    <div className='w-fit h-fit'>
                        <button onClick={showModal} className=" h-full -ml-12 rounded-[50%] bg-whites-ghost p-4">
                            <FaArrowLeft className='text-primary-blue font-600' />
                        </button>
                    </div>
                    <div className=" w-full h-full flex flex-col justify-between gap-8">
                        <div className="flex flex-col items-center gap-8">
                            <div>
                                <p className=' w-fit text-2xl font-700 text-gray-200'>Change Password</p>
                                <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Enter your user name to reset your password.</p>
                            </div>

                            <div className="flex flex-col gap-5 w-full">
                                <div className='flex flex-col gap-4'>
                                    <DefaultInput
                                        type="text"
                                        name="username"
                                        value={username}
                                        validate={true}
                                        label={"Enter Username"}
                                        topLabel={"Username"}
                                        handleChange={handleChange}
                                        placeholder="Enter Username"
                                        containerVariant="mt-5"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <DefaultButton
                                labelText="Change my password"
                                variant={"bg-primary-blue mb-4"}
                                isLoading={isSubmitting}
                                handleClick={handleSubmit}
                            />
                            <LoginErrorCard handleClear={() => setState({ submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
            </Modal>
        </div>
    )
}

export default UpdatePassword;