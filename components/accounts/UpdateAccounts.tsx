import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Modal from '../modal/Modal'
import { DefaultButton, DefaultInput } from '../reusables'
import { LoginErrorCard } from 'Utils/actions/error'
import { updateAccount } from 'containers/accountsApi'
import Switch from "react-switch";

export default function UpdateAccounts({ show, showModal, data }: any) {

    const [state, setState] = useState<any>({
        accountName: "",
        apiReference: "",
        bvn: "",
        time: "",
        accountType: "",
        timeUnit: "",
        status: false,
        accountNo: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [allowSubmit, setSubmit] = useState(true)
    const [select, setSelect] = useState<any>(null)

    const { accountName, apiReference, bvn, time, submittingError, accountType, timeUnit, accountNo, status, errorMssg, isSubmitting } = state

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleStatusChange = () => {
        setState({
            ...state,
            status: !status,
            submittingError: false
        });
    }

    const { handleSubmit } = updateAccount(state, setState, showModal, data)

    function setShowMultiCurrency(checked: any) {
        throw new Error('Function not implemented.')
    }

    return (

        <Modal show={show} clicked={() => { showModal(); setSelect(null) }}>
            <div className='m-3 flex flex-row gap-3 -ml-3 sm:ml-3'>
                <div className="flex gap-5">
                    <button onClick={() => { showModal(); setSelect(null) }} className=" h-[50px] rounded-[200px] bg-white-ghost p-4">
                        <FaArrowLeft className='text-primary-blue font-600' />
                    </button>
                    <div>
                        <p className=' w-fit text-2xl font-700 text-gray-200'>Account Details</p>
                        <p className='text-gray-400 w-fit text-base font-300 leading-7 mt-3'>Below are the details of the account, <br />you can update the account status here</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-8 justify-around items-start md:max-w-[50vw] mb-10'>
                <div className=' w-3/4 relative'>
                    <DefaultInput
                        type="text"
                        name="accountName"
                        value={accountName}
                        isDisabled={true}
                        label={"Account Name"}
                        topLabel={"Account Name"}
                        handleChange={handleChange}
                        placeholder="Account Name"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="accountType"
                        value={accountType}
                        isDisabled={true}
                        label={"Account Type"}
                        topLabel={"Account Type"}
                        handleChange={handleChange}
                        placeholder="Account Type"
                        containerVariant="mt-5"
                    />

                    <DefaultInput
                        type="text"
                        name="apiReference"
                        value={apiReference}
                        isDisabled={true}
                        label={"API Reference"}
                        topLabel={"API Reference"}
                        handleChange={handleChange}
                        placeholder="API Reference"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="password"
                        name="bvn"
                        validate={false}
                        isDisabled={true}
                        value={bvn}
                        maxLength={11}
                        minLength={11}
                        label={"Bank Verification Number"}
                        topLabel={"Bank Verification Number"}
                        handleChange={handleChange}
                        placeholder="your BVN here"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="Validity Time"
                        value={timeUnit}
                        label={"Validity Time"}
                        topLabel={"Validity Time"}
                        isDisabled={true}
                        handleChange={handleChange}
                        checkNum={true}
                        placeholder="Validity Time"
                        containerVariant="my-5"
                    />
                    <hr />

                    <DefaultInput
                        type="text"
                        name="accountNo"
                        value={accountNo}
                        label={"Account No"}
                        topLabel={"Account No"}
                        isDisabled={true}
                        handleChange={handleChange}
                        checkNum={true}
                        placeholder="Account No"
                        containerVariant="mt-5"
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
                            labelText="Update Account Status"
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