import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Modal from '../modal/Modal'
import { DefaultButton, DefaultInput } from '../reusables'
import { LoginErrorCard } from 'Utils/actions/error'
import { accountTypes, timeUnits } from 'Utils/mocks'
import { createAccount } from 'containers/accountsApi'



export default function CreateAccounts({ show, showModal, roles }: any) {

    const [state, setState] = useState<any>({
        accountName: "",
        apiReference: "",
        bvn: "",
        time: "",
        accountType: "",
        timeUnit: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [allowSubmit, setSubmit] = useState(true)
    const [select, setSelect] = useState<any>(null)

    const { accountName, apiReference, bvn, time, submittingError, accountType, timeUnit, errorMssg, isSubmitting } = state

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleExtraChange = (name: any, value: any) => {
        setState({
            ...state,
            [name]: value,
            submittingError: false
        });
    }

    const { handelSubmit } = createAccount(state, setState, showModal)

    return (

        <Modal show={show} clicked={() => { showModal(); setSelect(null) }}>
            <div className='m-3 flex flex-row gap-3 -ml-3 sm:ml-3'>
                <div className="flex gap-5">
                    <button onClick={() => { showModal(); setSelect(null) }} className=" h-[50px] rounded-[200px] bg-white-ghost p-4">
                        <FaArrowLeft className='text-primary-blue font-600' />
                    </button>
                    <div>
                        <p className=' w-fit text-2xl font-700 text-gray-200'>Create New Account</p>
                        <p className='text-gray-400 w-fit text-base font-300 leading-7 mt-3'>Enter details below to create an account</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-8 justify-around items-start md:max-w-[50vw] mb-10'>
                <div className=' w-3/4 relative'>
                    <DefaultInput
                        type="text"
                        name="accountName"
                        value={accountName}
                        label={"Enter Account Name"}
                        topLabel={"Account Name"}
                        handleChange={handleChange}
                        placeholder="Enter Account Name"
                        containerVariant="mt-5"
                    />
                    <div className="flex flex-col gap-2 mt-5" >
                        <label className='text-gray-200'>Select Account Type</label>
                        <select name="accountType"
                            onChange={handleChange}
                            value={accountType}
                            className='text-gray-200 bg-blue-darker  border-none placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max leading-6 text-base font-400 border px-6 py-5 rounded-lg'>
                            <>
                                <option className='text-gray-500 text-xs'>Select Type</option>
                                {accountTypes?.map((each: any, i: any) => {
                                    return <option value={each?.id || ""} key={i}>{each?.name || ""}</option>
                                })}
                            </>
                        </select>
                    </div>

                    <DefaultInput
                        type="text"
                        name="apiReference"
                        value={apiReference}
                        label={"Enter API Reference"}
                        topLabel={"API Reference"}
                        handleChange={handleChange}
                        placeholder="Enter API Reference"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="password"
                        name="bvn"
                        validate={false}
                        value={bvn}
                        maxLength={11}
                        minLength={11}
                        label={"Bank Verification Number"}
                        topLabel={"Bank Verification Number"}
                        handleChange={handleChange}
                        placeholder="Enter your BVN here"
                        containerVariant="mt-5"
                    />

                    <div className="flex flex-col gap-2 mt-5" >
                        <label className='text-gray-200'>Select Time Units</label>
                        <select name="timeUnit"
                            onChange={handleChange}
                            value={timeUnit}
                            className='text-gray-200 bg-blue-darker  border-none placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max leading-6 text-base font-400 border px-6 py-5 rounded-lg'>
                            <>
                                <option className='text-gray-500 text-xs'>Select Time Units</option>
                                {timeUnits?.map((each: any, i: any) => {
                                    return <option value={each?.id || ""} key={i}>{each?.name || ""}</option>
                                })}
                            </>
                        </select>
                    </div>
                    <DefaultInput
                        type="text"
                        name="time"
                        value={time}
                        label={"Enter Time"}
                        topLabel={"Time"}
                        handleChange={handleChange}
                        checkNum={true}
                        placeholder="Enter Time"
                        containerVariant="my-5"
                    />

                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                    <div className=" flex flex-row my-5 w-full sm:flex-row justify-center items-center">
                        <DefaultButton
                            labelText="Create Account"
                            isLoading={isSubmitting}
                            handleClick={handelSubmit}
                        />
                    </div>

                </div>
            </div>
            {/* </div> */}
        </Modal >
    )
}