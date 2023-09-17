import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Modal from '../modal/Modal'
import { DefaultButton, DefaultInput } from '../reusables'
import { LoginErrorCard } from 'Utils/actions/error'
import { updateAccount } from 'containers/accountsApi'
import Switch from "react-switch";
import { fetchAllRolesData } from 'containers/settingsApi'
import { updateUserController } from 'containers/usersApi'

export default function UpdateUsers({ show, showModal, data }: any) {

    const [state, setState] = useState<any>({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        roleId: "",
        level: "",
        status: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [allowSubmit, setSubmit] = useState(true)
    const [select, setSelect] = useState<any>(null)

    const { institutionId, firstName, lastName, email, userName, roleId, level, status, submittingError, errorMssg, isSubmitting } = state

    const { rolesData } = fetchAllRolesData()
    const { handleSubmit, handleChange, handleStatusChange, handleExtraChange } = updateUserController(state, setState, showModal, data)

    useEffect(() => {
        let levelObj: any = rolesData?.find((each: any) => each?.id == roleId)
        setState({
            ...state,
            level: levelObj?.level || ""
        })
        console.log(roleId, levelObj, rolesData)
    }, [roleId])


    return (

        <Modal show={show} clicked={() => { showModal(); setSelect(null) }}>
            <div className='m-3 flex flex-row gap-3 -ml-3 sm:ml-3'>
                <div className="flex gap-5">
                    <button onClick={() => { showModal(); setSelect(null) }} className=" h-[50px] rounded-[200px] bg-white-ghost p-4">
                        <FaArrowLeft className='text-primary-blue font-600' />
                    </button>
                    <div>
                        <p className=' w-fit text-2xl font-700 text-gray-200'>User Details</p>
                        <p className='text-gray-400 w-fit text-base font-300 leading-7 mt-3'>Below are the details of the account, <br />you can update the account status here</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-8 justify-around items-start md:max-w-[50vw] mb-10'>
                <div className=' w-3/4 relative'>

                    <DefaultInput
                        type="text"
                        name="firstName"
                        value={firstName}
                        label={"Enter First Name"}
                        topLabel={"First Name"}
                        handleChange={handleChange}
                        isDisabled={true}
                        placeholder="Enter First Name"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="lastName"
                        value={lastName}
                        label={"Enter Last Name"}
                        topLabel={"Last Name"}
                        handleChange={handleChange}
                        isDisabled={true}
                        placeholder="Enter Last Name"
                        containerVariant="my-5"
                    />
                    <DefaultInput
                        type="text"
                        name="email"
                        value={email}
                        label={"Enter Email"}
                        topLabel={"Email"}
                        handleChange={handleChange}
                        // isDisabled={true}
                        placeholder="Enter Email"
                        containerVariant="mt-5"
                    />

                    <div className="flex flex-col gap-2 mt-5" >
                        <label className='text-gray-200'>Select User Role</label>
                        <select name="roleId"
                            onChange={handleChange}
                            value={roleId}
                            className='text-gray-200 bg-blue-darker  border-none placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max leading-6 text-base font-400 border px-6 py-5 rounded-lg'>
                            <>
                                <option className='text-gray-500 text-xs'>Select Role</option>
                                {rolesData?.map((each: any, i: any) => {
                                    return <option value={each?.id || ""} key={i}>{each?.name || ""}</option>
                                })}
                            </>
                        </select>
                    </div>
                    <DefaultInput
                        type="text"
                        name="level"
                        value={level}
                        label={"Enter Level"}
                        topLabel={"Level"}
                        isDisabled={true}
                        handleChange={handleChange}
                        placeholder="Enter Level"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="institutionId"
                        value={institutionId}
                        label={"Enter Institution Id"}
                        isDisabled={true}
                        topLabel={"Institution Id"}
                        handleChange={handleChange}
                        placeholder="Enter Institution Id"
                        containerVariant="my-5"
                    />
                    
                    <div className="flex items-center w-full gap-5 space-x-4 my-5">
                        <p className='text-gray-200'>Status</p>
                        <Switch
                            onChange={(checked) => handleStatusChange()}
                            checked={status}
                            uncheckedIcon={true}
                            checkedIcon={true}
                            offColor="#3b4762"
                            onColor="#2362D7"
                            disabled={false}
                            className="border border-gray-600"
                        />
                    </div>

                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                    <div className=" flex flex-row my-5 w-full sm:flex-row justify-center items-center">
                        <DefaultButton
                            labelText="Update User"
                            isLoading={isSubmitting}
                            handleClick={handleSubmit}
                        />
                    </div>

                </div>
            </div>
            {/* </div> */}
        </Modal >
    )
}