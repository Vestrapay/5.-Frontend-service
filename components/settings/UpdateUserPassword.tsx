import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { FaArrowLeft } from 'react-icons/fa'
import { DefaultButton, DefaultInput } from '../reusables'
import { apiCall } from 'Utils/URLs'
import { LoginErrorCard } from 'Utils/actions/error'
import router from 'next/router'

function UpdateUserPassword({ show, showModal, usernm }: any) {

    const [state, setState] = useState<any>({
        currentPassword: "",
        username: "",
        confirmPassword: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    React.useEffect(() => {
        setState({
            ...state,
            username: usernm
        })
    }, [usernm])


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
                name: "updateUserPassword",
                data: {
                    username,
                },
                successDetails: {
                    title: "Password Reset Successful",
                    text: `An email has been sent to the users email address.`,
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
                    console.log(res)
                    if (res) {
                        showModal();
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

    //setState={(val: any) => setState({ ...state, ...val })} />;

    return (
        <div>
            <Modal show={show} clicked={showModal}>

                <div className=' flex justify-center'>
                    <div className="w-full py-5 px-5 max-w-[500px] h-2/3 flex flex-col items-center justify-center ">

                        <div className="flex flex-row justify-start gap-5 w-full h-full bg-primary-white rounded-xl backdrop-blur-sm ">

                            <div className=" w-full h-full flex flex-col justify-between gap-10">
                                <div className="flex flex-col items-center gap-5">
                                    <div>
                                        <p className=' w-fit text-2xl font-700 '>Change User Password</p>
                                        <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Please confirm the username for this user.</p>
                                    </div>
                                    <div className="flex flex-col gap-5 w-full">
                                        <div className='flex flex-col gap-8'>
                                            <DefaultInput
                                                type="email"
                                                name="username"
                                                value={username}
                                                label={"Confirm Username"}
                                                topLabel={"Confirm Username"}
                                                handleChange={handleChange}
                                                placeholder="Confirm Username"
                                                containerVariant="mt-5"
                                            />
                                        </div>
                                    </div>
                                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                                </div>
                                <div className="flex flex-col items-center">
                                    <DefaultButton
                                        labelText="Continue"
                                        variant={"bg-primary-blue mb-4"}
                                        isLoading={isSubmitting}
                                        handleClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateUserPassword