import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Modal from '../modal/Modal'
import { DefaultButton, DefaultInput } from '../reusables'
import { LoginErrorCard } from 'Utils/actions/error'
import { updateAccount } from 'containers/accountsApi'
import Switch from "react-switch";
import { fetchAllBanksData, fetchAllRolesData } from 'containers/settingsApi'
import { updateController } from 'containers/institutionApi'

export default function UpdateInstitution({ show, showModal, data }: any) {

    const [state, setState] = useState<any>({
        address: "",
        allowedIps: "",
        email: "",
        feePercentage: "",
        fixedFee: "",
        isFixedFee: "",
        maxFee: "",
        minFee: "",
        name: "",
        settleCycle: "",
        settlementAccountNo: "",
        settlementBank: "",
        isSnS: "",
        isEnabled: "",
        notificationUrl: "",
        status: false,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [allowSubmit, setSubmit] = useState(true)
    const [select, setSelect] = useState<any>(null)

    const { address,
        allowedIps,
        email,
        feePercentage,
        fixedFee,
        isFixedFee,
        maxFee,
        minFee,
        name,
        settleCycle,
        settlementAccountNo,
        settlementBank,
        isSnS, isEnabled,
        notificationUrl, submittingError, errorMssg, isSubmitting } = state

    const { banksData } = fetchAllBanksData()
    const { handleSubmit, handleChange, handleExtraChange } = updateController(state, setState, showModal, data)


    return (

        <Modal show={show} clicked={() => { showModal(); setSelect(null) }}>
            <div className='m-3 flex flex-row gap-3 -ml-3 sm:ml-3'>
                <div className="flex gap-5">
                    <button onClick={() => { showModal(); setSelect(null) }} className=" h-[50px] rounded-[200px] bg-white-ghost p-4">
                        <FaArrowLeft className='text-primary-blue font-600' />
                    </button>
                    <div>
                        <p className=' w-fit text-2xl font-700 text-gray-200'>Institution Details</p>
                        <p className='text-gray-400 w-fit text-base font-300 leading-7 mt-3'>Below are the details of the Institution, <br />you can update the institution settlement bank here</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-8 justify-around items-start md:max-w-[50vw] mb-10'>
                <div className=' w-3/4 relative'>
                    <DefaultInput
                        type="text"
                        name="name"
                        value={name}
                        label={"Enter Name"}
                        topLabel={"Name"}
                        handleChange={handleChange}
                        placeholder="Enter Name"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="email"
                        name="email"
                        value={email}
                        label={"Enter Email"}
                        topLabel={"Email"}
                        handleChange={handleChange}
                        placeholder="Enter Email"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="address"
                        value={address}
                        label={"Enter Address"}
                        topLabel={"Address"}
                        handleChange={handleChange}
                        placeholder="Enter Address"
                        containerVariant="my-5"
                    />
                    <DefaultInput
                        type="text"
                        name="settlementAccountNo"
                        value={settlementAccountNo}
                        label={"Enter Account No"}
                        topLabel={"Account No"}
                        checkNum={true}
                        handleChange={handleChange}
                        placeholder="Enter Account No"
                        containerVariant="my-5"
                    />

                    <div className="flex flex-col gap-2 mt-5" >
                        <label className='text-gray-200'>Settlement Bank</label>
                        <select name="settlementBank"
                            onChange={handleChange}
                            value={settlementBank}
                            className='text-gray-200 bg-blue-darker  border-none placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max leading-6 text-base font-400 border px-6 py-5 rounded-lg'>
                            <>
                                <option className='text-gray-500 text-xs'>Select Bank</option>
                                {banksData?.map((each: any, i: any) => {
                                    return <option value={each?.cbn_Code || ""} key={i}>{each?.name || ""}</option>
                                })}
                            </>
                        </select>
                    </div>
                    <DefaultInput
                        type="text"
                        name="allowedIps"
                        value={allowedIps}
                        label={"Enter Allowed-Ips"}
                        topLabel={"Allowed-Ips"}
                        handleChange={handleChange}
                        placeholder="Enter Allowed-Ips"
                        containerVariant="mt-5"
                    />

                    <div className="flex flex-col gap-2 mt-5" >
                        <label className='text-gray-200'>{"Settle-Cycle (in hours)"}</label>
                        <select name="settleCycle"
                            onChange={handleChange}
                            value={settleCycle}
                            className='text-gray-200 bg-blue-darker  border-none placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max leading-6 text-base font-400 border px-6 py-5 rounded-lg'>
                            <>
                                <option className='text-gray-500 text-xs'>Enter Settle-Cycle</option>
                                {["TWELVE_HOURS", "SIX_HOURS", "ONE_DAY", "ONE_HOUR", "THREE_HOURS"]?.map((each: any, i: any) => {
                                    return <option value={each || ""} key={i}>{each || ""}</option>
                                })}
                            </>
                        </select>
                    </div>
                    <DefaultInput
                        type="text"
                        name="settleCycle"
                        value={settleCycle}
                        label={"Enter Settle-Cycle"}
                        topLabel={"Settle-Cycle (in hours)"}
                        // isDisabled={true}
                        handleChange={handleChange}
                        placeholder="Enter Settle-Cycle"
                        containerVariant="mt-5"
                    />

                    <div className="flex flex-col sm:flex-row gap-2 mt-5" >
                        <DefaultInput
                            type="text"
                            name="maxFee"
                            value={maxFee}
                            label={"Enter Max-Fee"}
                            topLabel={"Max-Fee"}
                            // isDisabled={true}
                            checkNum={true}
                            handleChange={handleChange}
                            placeholder="Enter Max-Fee"
                            containerVariant="mt-5"
                        />
                        <DefaultInput
                            type="text"
                            name="minFee"
                            value={minFee}
                            label={"Enter Min-Fee"}
                            topLabel={"Min-Fee"}
                            // isDisabled={true}
                            checkNum={true}
                            handleChange={handleChange}
                            placeholder="Enter Min-Fee"
                            containerVariant="mt-5"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-2" >
                        <div className="flex items-center w-full gap-5 space-x-4 my-5">
                            <p className='text-gray-200'>Fixed Fee</p>
                            <Switch
                                onChange={(checked: any) => { setState({ ...state, isFixedFee: checked }) }}
                                checked={isFixedFee}
                                checkedIcon={true}
                                offColor="#3b4762"
                                onColor="#2362D7"
                                disabled={false}
                                className="border border-gray-600"
                            />
                        </div>
                        <div className="flex items-center w-full gap-5 space-x-4 my-5">
                            <p className='text-gray-200'>Status</p>
                            <Switch
                                onChange={(checked: any) => { setState({ ...state, isEnabled: checked }) }}
                                checked={isEnabled}
                                checkedIcon={true}
                                offColor="#3b4762"
                                onColor="#2362D7"
                                disabled={false}
                                className="border border-gray-600"
                            />
                        </div>
                    </div>
                    <DefaultInput
                        type="text"
                        name="fixedFee"
                        value={fixedFee}
                        label={"Enter Fixed Fee Amount"}
                        topLabel={"Fixed Fee Amount"}
                        handleChange={handleChange}
                        placeholder="Enter Fixed Fee Amount"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="feePercentage"
                        checkNum={true}
                        value={feePercentage}
                        label={"Enter Fee Percentage"}
                        topLabel={"Fee Percentage"}
                        handleChange={handleChange}
                        placeholder="Enter Fee Percentage"
                        containerVariant="my-5"
                    />



                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                    <div className=" flex flex-row my-5 w-full sm:flex-row justify-center items-center">
                        <DefaultButton
                            labelText="Update Institution"
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