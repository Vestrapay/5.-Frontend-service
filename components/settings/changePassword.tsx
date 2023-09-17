import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { FaArrowLeft } from 'react-icons/fa'
import { DefaultButton, DefaultInput } from '../reusables'
import { apiCall } from 'Utils/URLs'
import { LoginErrorCard } from 'Utils/actions/error'
import router from 'next/router'
import { resetPasswordController } from 'containers/settingsApi'


function ChangePassword({ show, showModal }: any) {

    const [page, setPage] = useState("signin");
    const [passData, setPassData] = useState({})

    const [state, setState] = useState<any>({
        currentPassword: "",
        password: "",
        confirmPassword: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    const { submittingError, isDisabled, isSubmitting, errorMssg, currentPassword, password, confirmPassword } = state

    const {handleChange, handleSubmit} = resetPasswordController(state, setState, showModal)

    return (
            <div>
                <Modal show={show} clicked={()=>{showModal();setPage("signin");}} >
                    
            <div className=' flex justify-center'>
                <div className="w-full py-8 px-12 max-w-[500px] h-2/3 flex flex-col items-center justify-center ">
    
                    <div className="flex flex-row justify-start gap-8 w-full h-full bg-blue-dark rounded-xl backdrop-blur-sm ">
                        {/* <div className='w-fit h-fit'>
                            <button onClick={showModal} className=" h-full -ml-12 rounded-[50%] bg-whites-ghost p-4">
                                <FaArrowLeft className='text-primary-blue font-600' />
                            </button>
                        </div> */}
                        <div className=" w-full h-full flex flex-col justify-between gap-8">
                            <div className="flex flex-col items-center gap-8">
                                <div>
                                    <p className=' w-fit text-2xl font-700 text-gray-200'>Change Password</p>
                                    <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Please set a new password and confirm.
                                        Password should be a minimmum of 8 characters, contain a capital letter, alphanumeric , and must contain a symbol.</p>
                                </div>
    
                                <div className="flex flex-col gap-5 w-full">
                                    <div className='flex flex-col gap-4'>
                                        <DefaultInput
                                            type="password"
                                            name="currentPassword"
                                            value={currentPassword}
                                            label={"Enter Old Password"}
                                            topLabel={"Old Password"}
                                            handleChange={handleChange}
                                            placeholder="Enter Old Password"
                                            containerVariant="mt-5"
                                        />
                                        <DefaultInput
                                            type="password"
                                            name="password"
                                            value={password}
                                            validate={true}
                                            label={"Enter New Password"}
                                            topLabel={"New Password"}
                                            handleChange={handleChange}
                                            placeholder="Enter New Password"
                                            containerVariant="mt-5"
                                        />
                                        <DefaultInput
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            validate={true}
                                            label={"Confirm New Password"}
                                            topLabel={"Confirm New Password"}
                                            handleChange={handleChange}
                                            placeholder="Confirm New Password"
                                            containerVariant="mt-5"
                                            confirmPassword={true}
                                            compare={password}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                            <LoginErrorCard handleClear={() => setState({ submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                                <DefaultButton
                                    labelText="Change my password"
                                    variant={"bg-primary-blue my-4"}
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

export default ChangePassword;

